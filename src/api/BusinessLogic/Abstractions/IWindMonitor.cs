using BusinessLogic.Models.Wind;

namespace BusinessLogic.Abstractions;

public interface IWindMonitor
{
    WindModel WindState { get; }
}