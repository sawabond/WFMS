using DataAccess.Abstractions;
using DataAccess.Enums;

namespace DataAccess.Entities;

/// <summary>
/// Single wind turbine within a wind farm.
/// </summary>
public class Turbine : IEntity<int>
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public WindFarm WindFarm { get; set; }

    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
    
    public double HeightMeters { get; set; }
    
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
    /// The maximum amount of power that the wind turbine can generate when the wind is blowing at its strongest.
    /// Full potential of this turbine to make electricity.
    /// </summary>
    public double PowerRating { get; set; }
    
    

    /// <summary>
    /// Any of <see cref="WindTurbineStatus"/>
    /// </summary>
    public WindTurbineStatus Status { get; set; } = WindTurbineStatus.Offline;

    public ICollection<TurbineSnapshot> TurbineSnapshots { get; set; } = new List<TurbineSnapshot>();
}