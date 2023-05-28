using DataAccess.Enums;

namespace BusinessLogic.Models.WindTurbine;

public sealed record TurbineViewModel
    (int Id,
    string Name,
    double Latitude,
    double Longitude,
    double HeightMeters,
    double PitchAngle,
    double GlobalAngle,
    double PowerRating,
    WindTurbineStatus Status)
{
    public string StatusString => Status.ToString();
}