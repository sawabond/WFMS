using DataAccess.Abstractions;
using DataAccess.Enums;

namespace DataAccess.Entities;

/// <summary>
/// Data about a single turbine at the given timestamp.
/// </summary>
public class TurbineSnapshot : IEntity<int>
{
    public int Id { get; set; }
    
    public DateTime Timestamp { get; set; }

    public Turbine Turbine { get; set; }
    
    /// <summary>
    /// Pitch angle to the wind.
    /// </summary>
    public double PitchAngle { get; set; }

    /// <summary>
    /// Value between 0 and 360 which represents a direction of the turbine.
    /// 0 means it's directed on the North, 180 - on the South, etc...
    /// </summary>
    public double GlobalAngle { get; set; }

    /// <summary>
    /// Kilometers per hour
    /// </summary>
    public double WindSpeed { get; set; }
    
    /// <summary>
    /// RPM - Rotations Per Minute.
    /// </summary>
    public double RotorSpeed { get; set; }
    
    /// <summary>
    /// Amount of electricity in kilowatts (the unit of power)
    /// </summary>
    public double PowerOutput { get; set; }
    
    public double Voltage { get; set; }

    public double Humidity { get; set; }

    public int BladeAngle { get; set; }

    public bool MaintenanceRequired { get; set; }

    /// <summary>
    /// The current flowing through the wind turbine's electrical output in amperes (A)
    /// </summary>
    public double Current { get; set; }
    
    public DateTimeOffset? LastMaintenanceDate { get; set; }
    public double TemperatureCelsius { get; set; }
    
    /// <summary>
    /// Condition of the wind turbine at this moment.
    /// Any of <see cref="WindTurbineStatus"/>
    /// </summary>
    public WindTurbineStatus Status { get; set; }

    /// <summary>
    /// Reason why the turbine has such a status.
    /// </summary>
    public WindTurbineStatusReason? StatusReason { get; set; }

    /// <summary>
    /// Human-friendly comment about status.
    /// </summary>
    public string? StatusComment { get; set; }
}