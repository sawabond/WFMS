namespace BusinessLogic.Models.WindTurbine;

public sealed record WindTurbineCreateModel
    (string Name,
    double Latitude,
    double Longitude,
    double HeightMeters,
    double GlobalAngle,
    double PowerRating);
