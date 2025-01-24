using System.ComponentModel.DataAnnotations;

namespace School_Management_System.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public required string studentName { get; set; }
        public required string fatherName { get; set; }
        public int Age { get; set; }
        public required string Sex { get; set; }
        public required string Email { get; set; }
        public string? mobileNumber { get; set; }

    }
}
