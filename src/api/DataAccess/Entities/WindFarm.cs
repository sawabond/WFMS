using DataAccess.Abstractions;

namespace DataAccess.Entities;

/// <summary>
/// Single wind farm.
/// </summary>
public class WindFarm : IEntity<int>
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Location { get; set; }
    
    public double Capacity { get; set; }
    
    public DateTime CommissioningDate { get; set; }
    
    public string Status { get; set; }

    public ICollection<Turbine> WindTurbines { get; set; } = new List<Turbine>();
    
    public ICollection<WindFarmSnapshot> PowerPlantStatuses { get; set; } = new List<WindFarmSnapshot>();
}