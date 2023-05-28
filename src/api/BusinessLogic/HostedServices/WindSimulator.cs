using BusinessLogic.Abstractions;
using BusinessLogic.Models.Wind;
using DataAccess.Abstractions;
using DataAccess.Entities;
using DataAccess.Enums;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BusinessLogic.HostedServices;

public sealed class WindSimulator : IHostedService
{
    private const double ChangeWindAngleIterationConstant = 5d;
    private const double RotationPossibilityAngle = 5d;
    private const double ChangeWindSpeedIterationConstant = 5d;

    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<WindSimulator> _logger;

    private Timer _timer;
    private WindModel _windModel = new(40, 90);
    private Random _random = new();

    public WindSimulator(IServiceScopeFactory serviceScopeFactory, ILogger<WindSimulator> logger)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }
    
    public WindModel WindState => _windModel;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Wind Simulator running.");

        _timer = new Timer(SimulateWind, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));

        return Task.CompletedTask;
    }

    private int RandomNegativeOrPositiveMultiplier => _random.Next(2) == 0 ? -1 : 1;

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Wind Simulator is stopping.");

        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    private async void SimulateWind(object? state)
    {
        var windFarmRepository =
            _serviceScopeFactory.CreateScope().ServiceProvider.GetRequiredService<IWindFarmRepository>();
        
        var windFarms = await windFarmRepository.GetAllWindFarmsIncludingAll();

        var turbines = windFarms.SelectMany(x => x.WindTurbines);

        UpdateWind();

        foreach (var turbine in turbines)
        {
            var pitchAngle = turbine.GlobalAngle - _windModel.GlobalAngle;

            if (turbine.Status == WindTurbineStatus.Optimized)
            {
                AdjustToWindDirection(turbine, pitchAngle, RotationPossibilityAngle * 2);
            }
            else if (turbine.Status == WindTurbineStatus.Normal)
            {
                AdjustToWindDirection(turbine, pitchAngle, RotationPossibilityAngle);
            }

            turbine.PitchAngle = turbine.GlobalAngle - _windModel.GlobalAngle;
            _logger.LogInformation("Processing of turbine with id {@Id} has finished", turbine.Id);
        }
        
        await windFarmRepository.ConfirmAsync();

        void PerformLeftRotation(Turbine turbine, double pitchAngle, double rotationPossibilityAngle)
        {
            if (Math.Abs(pitchAngle) < rotationPossibilityAngle)
            {
                turbine.GlobalAngle = _windModel.GlobalAngle;
                
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
                turbine.GlobalAngle = _windModel.GlobalAngle;
                
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
            _logger.LogInformation("Turbine with id {@Id} with status {@Status} was adjusted to wind direction", turbine.Id, turbine.Status.ToString());

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
    }

    private void UpdateWind()
    {
        UpdateWindGlobalAngle();
        var windSpeed = Math.Max(0, 
            _random.NextDouble() 
            * ChangeWindSpeedIterationConstant 
            * RandomNegativeOrPositiveMultiplier + _windModel.Speed);

        _windModel = _windModel with { Speed = windSpeed };
    }

    private void UpdateWindGlobalAngle()
    {
        var windGlobalAngle = _random.NextDouble() 
                              * ChangeWindAngleIterationConstant 
                              * RandomNegativeOrPositiveMultiplier;

        var angleToChange = (_windModel.GlobalAngle + windGlobalAngle) % 360d;

        if (angleToChange < 0d)
        {
            angleToChange += 360d;
        }

        _windModel = _windModel with { GlobalAngle = angleToChange };
    }
}