using BusinessLogic.Abstractions;
using BusinessLogic.Models.WindFarm;
using BusinessLogic.Models.WindTurbine;
using GenericWebApi.Extensions;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GenericWebApi.Controllers;

[Route("api/[controller]")]
[Authorize]
public sealed class WindFarmController : ControllerBase
{
    private readonly IWindFarmService _windFarmService;
    private readonly ITurbineService _turbineService;

    public WindFarmController(IWindFarmService windFarmService, ITurbineService turbineService)
    {
        _windFarmService = windFarmService;
        _turbineService = turbineService;
    }

    #region WindFarm

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetWindFarmById(int id)
    {
        var result = await _windFarmService.GetWindFarmById(id, User.Identity.GetUserId());

        return result.ToObjectResponse();
    }
    
    [HttpGet("personal")]
    public async Task<IActionResult> GetUserWindFarms()
    {
        var result = await _windFarmService.GetUserWindFarms(User.Identity.GetUserId());

        return result.ToObjectResponse();
    }

    [HttpPost]
    public async Task<IActionResult> CreateWindFarm([FromBody] WindFarmCreateModel windFarm)
    {
        var result = await _windFarmService.Create(windFarm, User.Identity.GetUserId());

        if (result.IsFailed)
        {
            return BadRequest(result.ToErrors());
        }

        return CreatedAtAction(nameof(GetWindFarmById), new { id = result.Value.Id }, result.Value);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteWindFarm(int id)
    {
        var result = await _windFarmService.DeleteWindFarm(id, User.Identity.GetUserId());

        return result.ToObjectResponse();
    }

    #endregion

    #region Turbine

    [HttpGet("{farmId:int}/turbine/{turbineId:int}")]
    public async Task<IActionResult> GetTurbineById(int farmId, int turbineId)
    {
        var result = await _turbineService.GetTurbineById(User.Identity.GetUserId(), farmId, turbineId);

        return result.ToObjectResponse();
    }
    
    [HttpGet("{farmId:int}/turbine")]
    public async Task<IActionResult> GetTurbineById(int farmId)
    {
        var result = await _turbineService.GetAllWindFarmTurbines(User.Identity.GetUserId(), farmId);

        return result.ToObjectResponse();
    }
    
    [HttpPost("{farmId:int}/turbine")]
    public async Task<IActionResult> CreateTurbine(int farmId, [FromBody] WindTurbineCreateModel turbineCreateModel)
    {
        var result = await _turbineService.CreateTurbine(User.Identity.GetUserId(), farmId, turbineCreateModel);

        if (result.IsFailed)
        {
            return BadRequest(result.ToErrors());
        }

        return CreatedAtAction(
            nameof(GetTurbineById), 
            new { farmId = farmId, turbineId = result.Value.Id },
            result.Value);
    }
    
    [HttpPatch("{farmId:int}/turbine/{turbineId:int}/run-normalized")]
    public async Task<IActionResult> RunNormalized(int farmId, int turbineId)
    {
        var result = await _turbineService.RunNormalized(User.Identity.GetUserId(), farmId, turbineId);

        if (result.IsFailed)
        {
            return BadRequest(result.ToErrors());
        }

        if (result.Value)
        {
            return Ok($"The turbine with id {turbineId} was turned on successfully");
        }

        return Ok($"The turbine with id {turbineId} was already working");
    }
    
    [HttpPatch("{farmId:int}/turbine/{turbineId:int}/run-optimized")]
    public async Task<IActionResult> RunOptimized(int farmId, int turbineId)
    {
        var result = await _turbineService.RunOptimized(User.Identity.GetUserId(), farmId, turbineId);

        if (result.IsFailed)
        {
            return BadRequest(result.ToErrors());
        }

        if (result.Value)
        {
            return Ok($"The turbine with id {turbineId} mode was set to 'Optimized'");
        }

        return Ok($"The turbine with id {turbineId} is already optimized");
    }
    
    [HttpPatch("{farmId:int}/turbine/{turbineId:int}/turn-off")]
    public async Task<IActionResult> TurnOff(int farmId, int turbineId)
    {
        var result = await _turbineService.TurnOff(User.Identity.GetUserId(), farmId, turbineId);

        if (result.IsFailed)
        {
            return BadRequest(result.ToErrors());
        }

        if (result.Value)
        {
            return Ok($"The turbine with id {turbineId} was turned off");
        }

        return Ok($"The turbine with id {turbineId} is already turned off");
    }
    
    [HttpDelete("{farmId:int}/turbine/{turbineId:int}")]
    public async Task<IActionResult> DeleteTurbineById(int farmId, int turbineId)
    {
        var result = await _turbineService.DeleteTurbine(User.Identity.GetUserId(), farmId, turbineId);

        return result.ToObjectResponse();
    }

    #endregion
}