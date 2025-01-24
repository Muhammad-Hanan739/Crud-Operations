using Microsoft.EntityFrameworkCore;
using School_Management_System.Data;
using School_Management_System.Models;

namespace School_Management_System.Repository
{
    public class StudentRepository
    {
        private readonly AppDbContext db;
        public StudentRepository(AppDbContext dbContext)
        {
            this.db = dbContext;
        }
        public async Task<List<Student>> GetAllStudents()
        {
            return await db.Students.ToListAsync();
        }
        public async Task SaveStudent(Student stu)
        {
            stu.Id = 0;
            await db.Students.AddAsync(stu);
            await db.SaveChangesAsync();
        }
        public async Task updateStudent(int id, Student obj)
        {
            var student = await db.Students.FindAsync(id);
            if (student == null)
            {
                throw new Exception("Student Not Added");
            }

            student.studentName = obj.studentName;
            student.fatherName = obj.fatherName;
            student.Sex = obj.Sex;
            student.Age = obj.Age;
            student.Email = obj.Email;
            student.mobileNumber = obj.mobileNumber;

            await db.SaveChangesAsync();
        }
        public async Task DeleteStudent(int id)
        {
            var student = await db.Students.FindAsync(id);
            if (student == null)
            {
                throw new Exception("Student Not Found");
            }
            db.Students.Remove(student);
            await db.SaveChangesAsync();
        }
    }
}
