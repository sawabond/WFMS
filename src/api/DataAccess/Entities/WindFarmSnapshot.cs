using DataAccess.Abstractions;

namespace DataAccess.Entities;

/// <summary>
/// Status of a wind farm at the given timestamp
/// </summary>
public class WindFarmSnapshot : IEntity<int>
{
    public int Id { get; set; }
    
    public WindFarm WindFarm { get; set; }
    
    public DateTime Timestamp { get; set; }
    
    /// <summary>
    /// The total power output of the wind farm at the given timestamp in kilowatts.
    /// </summary>
    public double TotalPowerOutput { get; set; }
    
    /// <summary>
    ///  The total power capacity of the wind farm, representing the maximum power that the wind farm can generate in kilowatts.
    /// </summary>
    public double TotalPowerCapacity { get; set; }
    
    /// <summary>
    ///  (Total Power Output / Total Power Capacity) * 100
    /// </summary>
    public double Efficiency { get; set; }
}