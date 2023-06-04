using MQTT.Publisher.Messages;

namespace BusinessLogic.Models.Wind;

public sealed record WindModel
{
    public DateTime? Timestamp { get; set; } = DateTime.UtcNow;
    
    public double? WindSpeed { get; set; }

    public double? WindGlobalAngle { get; set; }

    public double? Temperature { get; set; }
    
    public double? Humidity { get; set; }
    
    public static implicit  operator WindModel(WindTurbineDataMessage message) =>
        message is null 
            ? new()
            : new()
            {
                Humidity = message.Humidity,
                Temperature = message.Temperature,
                WindGlobalAngle = message.WindGlobalAngle,
                WindSpeed = message.WindSpeed,
                Timestamp = message.Timestamp
            };
}
