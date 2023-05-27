using AutoMapper;
using BusinessLogic.Abstractions;
using BusinessLogic.Models.WindTurbine;
using DataAccess.Abstractions;
using DataAccess.Entities;
using FluentResults;

namespace BusinessLogic.Services;

internal sealed class TurbineService : ITurbineService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public TurbineService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<Result<int>> DeleteTurbine(string userId, int farmId, int turbineId)
    {
        var farmResult = await GetUserFarmResult(userId, farmId);

        if (farmResult.IsFailed)
        {
            return Result.Fail(farmResult.Errors);
        }
        
        var farm = farmResult.Value;

        var turbine = farm.WindTurbines.FirstOrDefault(x => x.Id == turbineId);

        if (turbine is null)
        {
            return Result.Fail($"Farm with id {farm.Id} does not contain a turbine with id {turbineId}");
        }

        farm.WindTurbines.Remove(turbine);
        await _userRepository.ConfirmAsync();
        
        return Result.Ok(turbine.Id);
    }
    public async Task<Result<IEnumerable<TurbineViewModel>>> GetAllWindFarmTurbines(string userId, int farmId)
    {
        var farmResult = await GetUserFarmResult(userId, farmId);

        if (farmResult.IsFailed)
        {
            return Result.Fail(farmResult.Errors);
        }
        
        var farm = farmResult.Value;

        return Result.Ok(_mapper.Map<IEnumerable<TurbineViewModel>>(farm.WindTurbines));
    }

    public async Task<Result<TurbineViewModel>> GetTurbineById(string userId, int farmId, int turbineId)
    {
        var farmResult = await GetUserFarmResult(userId, farmId);

        if (farmResult.IsFailed)
        {
            return Result.Fail(farmResult.Errors);
        }
        
        var farm = farmResult.Value;

        var turbine = farm.WindTurbines.FirstOrDefault(x => x.Id == turbineId);

        if (turbine is null)
        {
            return Result.Fail($"Farm with id {farm.Id} does not contain a turbine with id {turbineId}");
        }

        return Result.Ok(_mapper.Map<TurbineViewModel>(turbine));
    }
    
    public async Task<Result<TurbineViewModel>> CreateTurbine(string userId, int farmId,
        WindTurbineCreateModel turbineCreateModel)
    {
        var farmResult = await GetUserFarmResult(userId, farmId);

        if (farmResult.IsFailed)
        {
            return Result.Fail(farmResult.Errors);
        }

        var farm = farmResult.Value;
        var turbine = _mapper.Map<Turbine>(turbineCreateModel);
        
        farm.WindTurbines.Add(turbine);
        await _userRepository.ConfirmAsync();

        return _mapper.Map<TurbineViewModel>(turbine);
    }

    private async Task<Result<WindFarm>> GetUserFarmResult(string userId, int farmId)
    {
        var user = await _userRepository.GetUserIncludingAll(userId);

        if (user is null)
        {
            return Result.Fail($"User with given id {userId} does not exist");
        }

        var farm = user.Farms.FirstOrDefault(x => x.Id == farmId);

        if (farm is null)
        {
            return Result.Fail($"User with given id {userId} does not have a farm with id {farmId}");
        }

        return Result.Ok(farm);
    }
}