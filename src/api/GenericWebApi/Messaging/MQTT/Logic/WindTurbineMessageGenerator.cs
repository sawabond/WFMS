using Bogus;
using BusinessLogic.Core.Messaging;
using DataAccess.Abstractions;
using Newtonsoft.Json;

namespace GenericWebApi.Messaging.MQTT.Logic;

internal sealed class WindTurbineMessageGenerator
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly DateTimeOffset _lastMaintenance;
    
    private Faker _faker = new();
    private double _windSpeed = 20;
    private double _windGlobalAngle = 90;
    
    public WindTurbineMessageGenerator(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _lastMaintenance = _faker.Date.Recent(30);
    }
    
    public async Task<IEnumerable<string>> CreateTurbineMessages()
    {
        var windFarmRepository = _serviceScopeFactory
            .CreateScope()
            .ServiceProvider
            .GetRequiredService<IWindFarmRepository>();
        
        var turbines = (await windFarmRepository.GetAllWindFarmsIncludingAll())
            .SelectMany(x => x.WindTurbines);

        _windSpeed += _faker.Random.Double(-5, 5);
        
        _windGlobalAngle = (_windGlobalAngle + _faker.Random.Double(-20, 20)) % 360;
        if (_windGlobalAngle < 0)
        {
            _windGlobalAngle += 360;
        }

        var turbinesData = new List<WindTurbineDataMessage>();

        foreach (var turbine in turbines)
        {
            var powerOutput = _faker.Random.Double(0, turbine.PowerRating);
            
            turbinesData.Add(new WindTurbineDataMessage
            {
                Id = turbine.Id,
                Timestamp = _faker.Date.Recent(),
                PowerOutput = powerOutput,
                RotorSpeed = powerOutput / turbine.PowerRating * 20,
                WindSpeed = _windSpeed,
                WindGlobalAngle = _windGlobalAngle,
                Temperature = _faker.Random.Double(-20, 40),
                Humidity = _faker.Random.Double(0, 100),
                Voltage = _faker.Random.Double(400, 600),
                Current = _faker.Random.Double(5, 15),
                BladeAngle = _faker.Random.Int(80, 100),
                MaintenanceRequired = false,
                LastMaintenanceDate = _lastMaintenance.Date,
                Manufacturer = _faker.Company.CompanyName(),
                Model = _faker.PickRandom("WT-1000", "WT-2000", "WT-3000"),
                SerialNumber = _faker.Random.AlphaNumeric(10),
                SoftwareVersion = _faker.System.Version().ToString()
            });
        }

        return turbinesData.Select(JsonConvert.SerializeObject);
    }
}