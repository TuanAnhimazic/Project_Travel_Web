using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string? FullName { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Gender { get; set; }
        public string? Avatar { get; set; }
        public string? Description { get; set; }
        public string? JobName { get; set; }
        public string? bgImage { get; set; }
        public DateTime? Created { get; set; } = DateTime.UtcNow;
       



    }

    public class UserStayReviewModel
    {
        public UserData? User { get; set; }
        public ICollection<Stay>? Stays { get; set; }
        public int? TotalReviewCount { get; set; }
        public double? AverageReviewStart { get; set; }
    }

    public class UserData
    {
        public int Id { get; set; }

        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Gender { get; set; }
        public string? Avatar { get; set; }
        public string? Description { get; set; }
        public string? JobName { get; set; }
        public string? bgImage { get; set; }
        public DateTime? Created { get; set; }

    }

    public class changePasswordModel
    {
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
