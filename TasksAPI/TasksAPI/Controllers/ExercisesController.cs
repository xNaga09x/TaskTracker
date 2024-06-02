using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{
    private static List<string> hardcodedList = new List<string> { "ana", "vasile", "gheorghe", "maria", "ion" };

    [HttpGet("list")]
    public IActionResult GetHardcodedList(){return Ok(hardcodedList);}

    [HttpGet("{id}")]
    public IActionResult Get(int id){return Ok($"Route parameter: {id}");}

    [HttpGet("sum")]
    public IActionResult GetSum([FromQuery] double param1, [FromQuery] double param2)
    {
        double sum = param1 + param2;
        return Ok($"Route parameter: {sum}");
    }
    [HttpPost("sumList")]
    public IActionResult GetSumOfList([FromBody] List<double> numbers)
    {
        double sum = 0;
        foreach (var num in numbers)
        {
            sum += num;
        }
        return Ok($"Sum of the numbers in the list: {sum}");
    }

    [HttpPut("update/{index}")]
    public IActionResult UpdateListValue(int index, [FromBody] string value)
    {
        if (index < 0 || index >= hardcodedList.Count || value == null)
        {
            return BadRequest("Invalid input.");
        }

        hardcodedList[index] = value;
        return Ok(hardcodedList);
    }

    [HttpDelete("delete/{index}")]
    public IActionResult DeleteElement(int index)
    {
        if (index < 0 || index >= hardcodedList.Count)
        {
            return BadRequest("Invalid index.");
        }

        hardcodedList.RemoveAt(index);
        return Ok(hardcodedList);
    }
}