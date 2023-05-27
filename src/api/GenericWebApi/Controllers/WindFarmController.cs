using BusinessLogic.Abstractions;
using BusinessLogic.Models.WindFarm;
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

    public WindFarmController(IWindFarmService windFarmService)
    {
        _windFarmService = windFarmService;
    }

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
}