using BusinessLogic.Models.WindFarm;
using FluentResults;

namespace BusinessLogic.Abstractions;

public interface IWindFarmService
{
    Task<Result<WindFarmViewModel>> Create(WindFarmCreateModel createModel, string userId);
    
    Task<Result<WindFarmViewModel>> GetWindFarmById(int id, string userId);
    Task<Result<IEnumerable<WindFarmViewModel>>> GetUserWindFarms(string userId);
    Task<Result<int>> DeleteWindFarm(int id, string userId);
}