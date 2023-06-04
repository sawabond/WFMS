using BusinessLogic.Abstractions;
using BusinessLogic.HostedServices;
using Microsoft.AspNetCore.Mvc;

namespace GenericWebApi.Controllers;

[Route("api/[controller]")]
public sealed class MonitoringController : Controller
{
    private readonly WindSimulator _windMonitor;

    public MonitoringController(WindSimulator windMonitor)
    {
        _windMonitor = windMonitor;
    }

    [HttpGet("wind-state")]
    public async Task<IActionResult> GetWindState()
    {
        return Ok(_windMonitor.WindModel);
    }
}