using TasksAPI.Models;

namespace TasksAPI.Services
{
    public interface ITaskCollectionService : ICollectionService<TaskModel>
    {
        Task<List<TaskModel>> GetTasksByStatus(string status);

    }
}
