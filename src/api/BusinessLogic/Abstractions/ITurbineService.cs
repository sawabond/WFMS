using BusinessLogic.Models.WindTurbine;
using FluentResults;

namespace BusinessLogic.Abstractions;

public interface ITurbineService
{
    Task<Result<TurbineViewModel>> CreateTurbine(string userId, int farmId,
        WindTurbineCreateModel turbineCreateModel);

    Task<Result<IEnumerable<TurbineViewModel>>> GetAllWindFarmTurbines(string userId, int farmId);
    Task<Result<TurbineViewModel>> GetTurbineById(string userId, int farmId, int turbineId);
    Task<Result<int>> DeleteTurbine(string userId, int farmId, int turbineId);
}