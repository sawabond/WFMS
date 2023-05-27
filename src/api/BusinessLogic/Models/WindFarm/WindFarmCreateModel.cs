namespace BusinessLogic.Models.WindFarm;

public sealed record WindFarmCreateModel
    (string Name, 
    string Location,
    double Capacity);
