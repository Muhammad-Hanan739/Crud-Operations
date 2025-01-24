using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using School_Management_System.Models;
using School_Management_System.Repository;

namespace School_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentRepository stu;
        public StudentController(StudentRepository studentRepository)
        {
            this.stu = studentRepository;
        }
        [HttpGet]
        public async Task<ActionResult> StudentList()
        {
            var allStudents = await stu.GetAllStudents();
            return Ok(allStudents);
        }
        [HttpPost]
        public async Task<ActionResult> AddStudent(Student vm)
        {
            await stu.SaveStudent(vm);
            return Ok(vm);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> updateStudent(int id, [FromBody] Student vm)
        {
            await stu.updateStudent(id, vm);
            return Ok(vm);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteStudent(int id)
        {
            await stu.DeleteStudent(id);
            return Ok();
        }
    }
}
