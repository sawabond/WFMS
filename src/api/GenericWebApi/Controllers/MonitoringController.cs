using BusinessLogic.Abstractions;
using GenericWebApi.HostedServices;
using Microsoft.AspNetCore.Mvc;

namespace GenericWebApi.Controllers;

[Route("api/[controller]")]
public sealed class MonitoringController : Controller
{
    private readonly TurbineMessageDataProcessor _windMonitor;

    public MonitoringController(TurbineMessageDataProcessor windMonitor)
    {
        _windMonitor = windMonitor;
    }

    [HttpGet("wind-state")]
    public async Task<IActionResult> GetWindState([FromQuery] int turbineId)
    {
        return Ok(_windMonitor[turbineId]);
    }
}