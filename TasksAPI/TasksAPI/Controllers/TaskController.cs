using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasksAPI.Models;
using TasksAPI.Services;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskCollectionService _taskCollectionService;

    public TaskController(ITaskCollectionService taskCollectionService)
    {
        _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(taskCollectionService));
    }

    [HttpPost]
public async Task<IActionResult> CreateTask([FromBody] TaskModel taskModel)
{
    if (taskModel == null)
    {
        return BadRequest("Task cannot be null");
    }

    try
    {
        await _taskCollectionService.Create(taskModel);
        return Ok(taskModel);
    }
    catch (Exception ex)
    {
        // Log the error (here, just returning the exception message for debugging purposes)
        return BadRequest(ex.Message);
    }
}

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        List<TaskModel> tasks = await _taskCollectionService.GetAll();
        return Ok(tasks);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(string id, [FromBody] TaskModel taskModel)
    {
        if (taskModel == null || taskModel.Id != id)
        {
            return BadRequest("Task is null or ID mismatch");
        }

        var existingTask = await _taskCollectionService.Get(id);
        if (existingTask == null)
        {
            return NotFound("Task not found");
        }

        await _taskCollectionService.Update(id, taskModel);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        var taskToDelete = await _taskCollectionService.Get(id);
        if (taskToDelete == null)
        {
            return NotFound("Task not found");
        }

        await _taskCollectionService.Delete(id);
        return Ok("Task deleted successfully");
    }
}