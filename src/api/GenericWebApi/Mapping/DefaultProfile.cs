using AutoMapper;
using BusinessLogic.Models.AppUser;
using BusinessLogic.Models.WindFarm;
using DataAccess.Entities;
using GenericWebApi.Requests.Auth;

namespace GenericWebApi.Mapping;

public class DefaultProfile : Profile
{
	public DefaultProfile()
	{
		CreateMap<RegisterRequest, UserRegisterModel>();
		CreateMap<LoginRequest, UserLoginModel>();

		CreateMap<WindFarmCreateModel, WindFarm>();
		CreateMap<WindFarm, WindFarmViewModel>();
	}
}
