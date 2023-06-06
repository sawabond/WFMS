namespace BusinessLogic.Core.Messaging;

public sealed class WindTurbineDataMessage
{
    public int Id { get; init; }
    
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    public double PowerOutput { get; set; }
    
    public double RotorSpeed { get; set; }
    
    public double WindSpeed { get; set; }

    public double WindGlobalAngle { get; set; }

    public double Temperature { get; set; }
    
    public double Humidity { get; set; }
    
    public double Voltage { get; set; }
    
    /// <summary>
    /// Current flowing. Amperes
    /// </summary>
    public double Current { get; set; }
    
    public int BladeAngle { get; set; }
    
    public bool MaintenanceRequired { get; set; }
    
    public DateTime LastMaintenanceDate { get; set; }
    
    public string Manufacturer { get; set; }
    
    public string Model { get; set; }
    
    public string SerialNumber { get; set; }
    
    public string SoftwareVersion { get; set; }
}