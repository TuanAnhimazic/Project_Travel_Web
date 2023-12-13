using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class PaymentDetails
    {
        [Key]
        public int Id { get; set; }
        public string? PaymentMethod { get; set; }
        public string? CardNumber { get; set; } 
        public string? CardHolderName { get; set; }
        public DateTime CardExpiration { get; set; }
        public string? CVC { get; set; }
        public bool PaymentConfirmed { get; set; }
    }
}
