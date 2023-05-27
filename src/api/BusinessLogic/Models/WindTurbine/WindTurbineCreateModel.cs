namespace BusinessLogic.Models.WindTurbine;

public sealed record WindTurbineCreateModel
    (string Name,
    double Latitude,
    double Longitude,
    double HeightMeters,
    double PitchAngle,
    double GlobalAngle,
    double PowerRating);
