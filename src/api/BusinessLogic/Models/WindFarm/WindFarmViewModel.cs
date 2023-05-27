namespace BusinessLogic.Models.WindFarm;

public record WindFarmViewModel
{
    public int Id { get; init; }
    
    public string Name { get; init; }
    
    public string Location { get; init; }
    
    public double Capacity { get; init; }

    public DateTime CommissioningDate { get; init; }
    
    public string Status { get; init; }

    public string OwnerId { get; init; }
}