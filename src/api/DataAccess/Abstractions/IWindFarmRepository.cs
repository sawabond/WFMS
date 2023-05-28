using DataAccess.Entities;

namespace DataAccess.Abstractions;

public interface IWindFarmRepository : IRepository<WindFarm, int>
{
    Task<IEnumerable<WindFarm>> GetAllWindFarmsIncludingAll();
}