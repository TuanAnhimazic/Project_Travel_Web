using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class AdminAccount
    {
        [Key]
        public int AdminId { get; set; }

        public string? FullName { get; set; }

        [EmailAddress]
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
