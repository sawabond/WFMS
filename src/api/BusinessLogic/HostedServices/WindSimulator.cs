using BusinessLogic.Models.Wind;
using DataAccess.Abstractions;
using DataAccess.Entities;
using DataAccess.Enums;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MQTT.Publisher.Logic;
using MQTT.Publisher.Messages;
using MQTT.Publisher.Options;
using MQTTnet;
using MQTTnet.Client;
using Newtonsoft.Json;

namespace BusinessLogic.HostedServices;

public sealed class WindSimulator : WindTurbineDataSubscriber, IHostedService
{
    private const double RotationPossibilityAngle = 5d;

    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<WindSimulator> _logger;

    private WindTurbineDataMessage? _turbineData;

    public WindSimulator(
        IOptions<MqttOptions> options,
        IServiceScopeFactory serviceScopeFactory,
        ILogger<WindSimulator> logger) : base(options)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }

    public WindModel WindModel => _turbineData;

    protected override async Task HandleReceivedMessage(MqttApplicationMessageReceivedEventArgs eventArgs)
    {
        var windFarmRepository =
            _serviceScopeFactory.CreateScope().ServiceProvider.GetRequiredService<IWindFarmRepository>();
        
        _turbineData = JsonConvert.DeserializeObject<WindTurbineDataMessage>(
            eventArgs.ApplicationMessage.ConvertPayloadToString());
        
        var windFarms = await windFarmRepository.GetAllWindFarmsIncludingAll();

        foreach (var windFarm in windFarms)
        {
            foreach (var turbine in windFarm.WindTurbines)
            {
                ProcessRotation(turbine);

                turbine.TurbineSnapshots.Add(new()
                {
                    Timestamp = _turbineData.Timestamp,
                    TemperatureCelsius = _turbineData.Temperature,
                    WindSpeed = _turbineData.WindSpeed,
                    RotorSpeed = _turbineData.RotorSpeed,
                    PowerOutput = Math.Max(_turbineData.PowerOutput, turbine.PowerRating),
                    Voltage = _turbineData.Voltage,
                    BladeAngle = _turbineData.BladeAngle,
                    Current = _turbineData.Current,
                    Humidity = _turbineData.Humidity,
                    Status = turbine.Status,
                    PitchAngle = turbine.PitchAngle,
                    GlobalAngle = turbine.GlobalAngle,
                    MaintenanceRequired = false,
                    LastMaintenanceDate = null,
                    StatusComment = null,
                    StatusReason = null,
                });
                _logger.LogInformation("Processing of turbine with id {@Id} has finished", turbine.Id);
            }

            var totalPowerOutput = windFarm.WindTurbines.Sum(_ => _turbineData.PowerOutput);
            var totalPowerCapacity = windFarm.WindTurbines.Sum(x => x.PowerRating);

            if (totalPowerOutput > totalPowerCapacity)
            {
                totalPowerOutput = totalPowerCapacity;
            }
            
            windFarm.PowerPlantStatuses.Add(new()
            {
                Timestamp = _turbineData.Timestamp,
                TotalPowerOutput = totalPowerOutput,
                TotalPowerCapacity = totalPowerCapacity,
                Efficiency = totalPowerOutput / totalPowerCapacity * 100
            });
        }
        
        await windFarmRepository.ConfirmAsync();
    }

    private void ProcessRotation(Turbine turbine1)
    {
        void PerformLeftRotation(Turbine turbine, double pitchAngle, double rotationPossibilityAngle)
        {
            if (Math.Abs(pitchAngle) < rotationPossibilityAngle)
            {
                turbine.GlobalAngle = _turbineData.WindGlobalAngle;

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
                turbine.GlobalAngle = _turbineData.WindGlobalAngle;

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

        {
            var pitchAngle = turbine1.GlobalAngle - _turbineData.WindGlobalAngle;

            if (turbine1.Status == WindTurbineStatus.Optimized)
            {
                AdjustToWindDirection(turbine1, pitchAngle, RotationPossibilityAngle * 2);
            }
            else if (turbine1.Status == WindTurbineStatus.Normal)
            {
                AdjustToWindDirection(turbine1, pitchAngle, RotationPossibilityAngle);
            }

            turbine1.PitchAngle = turbine1.GlobalAngle - _turbineData.WindGlobalAngle;
        }
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