using BusinessLogic.Core.Messaging;
using BusinessLogic.Models.Wind;
using DataAccess.Abstractions;
using DataAccess.Entities;
using DataAccess.Enums;
using GenericWebApi.Messaging.MQTT.Logic;
using GenericWebApi.Messaging.MQTT.Options;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;
using Newtonsoft.Json;

namespace GenericWebApi.HostedServices;

public sealed class TurbineMessageDataProcessor : WindTurbineDataSubscriber, IHostedService
{
    private const double RotationPossibilityAngle = 5d;

    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<TurbineMessageDataProcessor> _logger;

    private Dictionary<int, WindTurbineDataMessage> _turbinesData = new();

    public TurbineMessageDataProcessor(
        IOptions<MqttOptions> options,
        IServiceScopeFactory serviceScopeFactory,
        ILogger<TurbineMessageDataProcessor> logger) : base(options)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }

    public WindModel this[int turbineId]
    {
        get
        {
            if (_turbinesData.TryGetValue(turbineId, out var turbineData))
            {
                return turbineData;
            }

            return null;
        }
    }

    protected override async Task HandleReceivedMessage(MqttApplicationMessageReceivedEventArgs eventArgs)
    {
        var windFarmRepository =
            _serviceScopeFactory.CreateScope().ServiceProvider.GetRequiredService<IWindFarmRepository>();
        
        var turbineDataMessage = JsonConvert.DeserializeObject<WindTurbineDataMessage>(
            eventArgs.ApplicationMessage.ConvertPayloadToString());

        _turbinesData[turbineDataMessage.Id] = turbineDataMessage;
        
        var windFarms = await windFarmRepository.GetAllWindFarmsIncludingAll();
        var targetTurbine = windFarms
            .SelectMany(x => x.WindTurbines)
            .FirstOrDefault(x => x.Id == turbineDataMessage.Id);

        if (targetTurbine is null)
        {
            return;
        }

        ProcessRotation(targetTurbine, turbineDataMessage);

        targetTurbine.TurbineSnapshots.Add(new()
        {
            Timestamp = turbineDataMessage.Timestamp,
            TemperatureCelsius = turbineDataMessage.Temperature,
            WindSpeed = turbineDataMessage.WindSpeed,
            RotorSpeed = turbineDataMessage.RotorSpeed,
            PowerOutput = Math.Max(turbineDataMessage.PowerOutput, targetTurbine.PowerRating),
            Voltage = turbineDataMessage.Voltage,
            BladeAngle = turbineDataMessage.BladeAngle,
            Current = turbineDataMessage.Current,
            Humidity = turbineDataMessage.Humidity,
            Status = targetTurbine.Status,
            PitchAngle = targetTurbine.PitchAngle,
            GlobalAngle = targetTurbine.GlobalAngle,
            MaintenanceRequired = false,
            LastMaintenanceDate = null,
            StatusComment = null,
            StatusReason = null,
        });
        
        _logger.LogInformation("Processing of turbine with id {@Id} has finished", targetTurbine.Id);

        var windFarm = targetTurbine.WindFarm;
        
        var totalPowerOutput = windFarm.WindTurbines.Sum(_ => turbineDataMessage.PowerOutput);
        var totalPowerCapacity = windFarm.WindTurbines.Sum(x => x.PowerRating);

        if (totalPowerOutput > totalPowerCapacity)
        {
            totalPowerOutput = totalPowerCapacity;
        }
        
        windFarm.PowerPlantStatuses.Add(new()
        {
            Timestamp = turbineDataMessage.Timestamp,
            TotalPowerOutput = totalPowerOutput,
            TotalPowerCapacity = totalPowerCapacity,
            Efficiency = totalPowerOutput / totalPowerCapacity * 100
        });
        
        await windFarmRepository.ConfirmAsync();
    }

    private void ProcessRotation(Turbine turbine1, WindTurbineDataMessage turbineData)
    {
        void PerformLeftRotation(Turbine turbine, double pitchAngle, double rotationPossibilityAngle)
        {
            if (Math.Abs(pitchAngle) < rotationPossibilityAngle)
            {
                turbine.GlobalAngle = turbineData.WindGlobalAngle;

                return;
            }

            turbine.GlobalAngle -= rotationPossibilityAngle;

            if (turbine.GlobalAngle < 0)
            {
                turbine.GlobalAngle += 360;
            }
        }

        void PerformRightRotation(Turbine turbine, double pitchAngle, double rotationPossibilityAngle)
        {
            if (Math.Abs(pitchAngle) < rotationPossibilityAngle)
            {
                turbine.GlobalAngle = turbineData.WindGlobalAngle;

                return;
            }

            turbine.GlobalAngle += rotationPossibilityAngle;

            if (turbine.GlobalAngle > 360)
            {
                turbine.GlobalAngle -= 360;
            }
        }

        void AdjustToWindDirection(Turbine turbine, double pitchAngle, double rotationPossibilityAngle)
        {
            _logger.LogInformation("Turbine with id {@Id} with status {@Status} was adjusted to wind direction", turbine.Id,
                turbine.Status.ToString());

            if (pitchAngle < -180)
            {
                PerformLeftRotation(turbine, pitchAngle, rotationPossibilityAngle);
            }
            else if (pitchAngle is < 0 and >= -180)
            {
                PerformRightRotation(turbine, pitchAngle, rotationPossibilityAngle);
            }
            else if (pitchAngle is > 0 and <= 180)
            {
                PerformLeftRotation(turbine, pitchAngle, rotationPossibilityAngle);
            }
            else if (pitchAngle > 180)
            {
                PerformRightRotation(turbine, pitchAngle, rotationPossibilityAngle);
            }
        }
        
        var pitchAngle = turbine1.GlobalAngle - turbineData.WindGlobalAngle;

        if (turbine1.Status == WindTurbineStatus.Optimized)
        {
            AdjustToWindDirection(turbine1, pitchAngle, RotationPossibilityAngle * 2);
        }
        else if (turbine1.Status == WindTurbineStatus.Normal)
        {
            AdjustToWindDirection(turbine1, pitchAngle, RotationPossibilityAngle);
        }

        turbine1.PitchAngle = turbine1.GlobalAngle - turbineData.WindGlobalAngle;
        
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await SubscribeAsync();
        _logger.LogInformation("Subscribed to getting turbines data.");
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await UnsubscribeAsync();
        _logger.LogInformation("Wind Simulator is stopping.");
    }
}