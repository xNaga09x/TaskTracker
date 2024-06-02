using TasksAPI.Services;

namespace TasksAPI.Services
{
    public interface ICollectionService<T>
    {
        Task<List<T>> GetAll();
        Task<T> Get(string id);
        Task<bool> Create(T model);
        Task<bool> Update(string id, T model);
        Task<bool> Delete(string id);


    }
}