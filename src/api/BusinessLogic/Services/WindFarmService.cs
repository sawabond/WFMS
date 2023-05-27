using AutoMapper;
using BusinessLogic.Abstractions;
using BusinessLogic.Models.WindFarm;
using DataAccess.Abstractions;
using DataAccess.Entities;
using FluentResults;

namespace BusinessLogic.Services;

internal sealed class WindFarmService : IWindFarmService
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;

    public WindFarmService(IMapper mapper, IUserRepository userRepository)
    {
        _mapper = mapper;
        _userRepository = userRepository;
    }

    public async Task<Result<int>> DeleteWindFarm(int id, string userId)
    {
        var user = await _userRepository.GetUserIncludingAll(userId);

        if (user is null)
        {
            Result.Fail($"The user with id {userId} does not exist");
        }

        var farm = user.Farms.FirstOrDefault(x => x.Id == id);

        if (farm is null)
        {
            return Result.Fail($"The user with id {userId} does not have a wind farm with id {id}");
        }

        user.Farms.Remove(farm);
        await _userRepository.ConfirmAsync();

        return Result.Ok(farm.Id);
    }
    public async Task<Result<WindFarmViewModel>> GetWindFarmById(int id, string userId)
    {
        var user = await _userRepository.GetUserIncludingAll(userId);

        if (user is null)
        {
            Result.Fail<WindFarmViewModel>($"The user with id {userId} does not exist");
        }
        
        var farm = user.Farms.FirstOrDefault(x => x.Id == id);

        return farm is null
            ? Result.Fail<WindFarmViewModel>($"User with id {userId} does not have a windfarm with id {id}")
            : Result.Ok(_mapper.Map<WindFarmViewModel>(farm));
    }

    public async Task<Result<IEnumerable<WindFarmViewModel>>> GetUserWindFarms(string userId)
    {
        var user = await _userRepository.GetUserIncludingAll(userId);

        if (user is null)
        {
            Result.Fail<WindFarmViewModel>($"The user with id {userId} does not exist");
        }

        return Result.Ok(_mapper.Map<IEnumerable<WindFarmViewModel>>(user.Farms));
    }

    public async Task<Result<WindFarmViewModel>> Create(WindFarmCreateModel createModel, string userId)
    {
        var entity = _mapper.Map<WindFarm>(createModel);

        entity.Status = "Created";
        
        var user = await _userRepository.GetAsync(userId);
        
        user.Farms.Add(entity);
        await _userRepository.ConfirmAsync();

        return Result.Ok(_mapper.Map<WindFarmViewModel>(entity));
    }
}