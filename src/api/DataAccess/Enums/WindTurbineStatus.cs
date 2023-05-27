namespace DataAccess.Enums;

public enum WindTurbineStatus
{
    /// <summary>
    /// This status indicates that the wind turbine is functioning normally and actively generating electricity.
    /// </summary>
    Normal = 1,

    /// <summary>
    /// This status is used when the wind turbine is undergoing scheduled maintenance or repairs.
    /// It means that the turbine is temporarily out of operation for maintenance purposes.
    /// </summary>
    Maintenance = 2,
    
    /// <summary>
    /// This status indicates that the wind turbine is currently not operational,
    /// either due to a technical issue, maintenance, or being intentionally taken offline.
    /// </summary>
    Offline = 3,
    
    /// <summary>
    /// This status is used when the wind turbine has encountered a fault or problem that requires attention or repair.
    /// It indicates that the turbine is not functioning as intended and needs troubleshooting.
    /// </summary>
    Fault = 4,
    
    /// <summary>
    /// This status is assigned when the wind turbine is in the process of starting up, initializing,
    /// or going through a sequence of checks before becoming fully operational.
    /// </summary>
    Startup = 5,
    
    /// <summary>
    /// This status is assigned when the wind turbine has been intentionally shut down and is not generating electricity.
    /// It may be due to low wind conditions, safety reasons, or other operational requirements.
    /// </summary>
    Shutdown = 6,
    
    /// <summary>
    /// In optimized mode, the wind turbine adjusts its settings and operations
    /// to maximize efficiency and electricity production.
    /// It may change the angle of its blades (pitch angle)
    /// or adjust the rotational speed to make the most of the available wind energy.
    /// </summary>
    Optimized = 7,
}
