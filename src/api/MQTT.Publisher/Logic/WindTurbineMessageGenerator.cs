using Bogus;
using MQTT.Publisher.Messages;
using Newtonsoft.Json;

namespace MQTT.Publisher.Logic;

internal sealed class WindTurbineMessageGenerator
{
    private Faker _faker = new();

    private double _windSpeed = 20;
    private double _windGlobalAngle = 90;
    
    public string CreateTurbineMessage()
    {
        _windSpeed += _faker.Random.Double(-5, 5);
        
        _windGlobalAngle = (_windGlobalAngle + _faker.Random.Double(-20, 20)) % 360;
        if (_windGlobalAngle < 0)
        {
            _windGlobalAngle += 360;
        }
        
        var turbineData = new WindTurbineDataMessage
        {
            Timestamp = _faker.Date.Recent(),
            PowerOutput = _faker.Random.Double(1000, 5000),
            RotorSpeed = _faker.Random.Double(10, 20),
            WindSpeed = _windSpeed,
            WindGlobalAngle = _windGlobalAngle,
            Temperature = _faker.Random.Double(-20, 40),
            Humidity = _faker.Random.Double(0, 100),
            Voltage = _faker.Random.Double(400, 600),
            Current = _faker.Random.Double(5, 15),
            BladeAngle = _faker.Random.Int(0, 360),
            MaintenanceRequired = _faker.Random.Bool(),
            LastMaintenanceDate = _faker.Date.Recent(30),
            Manufacturer = _faker.Company.CompanyName(),
            Model = _faker.PickRandom("WT-1000", "WT-2000", "WT-3000"),
            SerialNumber = _faker.Random.AlphaNumeric(10),
            SoftwareVersion = _faker.System.Version().ToString()
        };

        return JsonConvert.SerializeObject(turbineData);
    }
}