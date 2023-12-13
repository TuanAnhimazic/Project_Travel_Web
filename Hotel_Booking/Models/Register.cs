using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class Register
    {
       
        public string? FullName { get; set; }

       
        public string? Email { get; set; }

       
        public string? Password { get; set; }


        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }
    }
}
