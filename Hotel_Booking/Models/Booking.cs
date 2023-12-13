using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public int? StayId { get; set; }
        [ForeignKey("StayId")]
        public Stay? Stay { get; set; }
        public int? UserId { get; set; } 
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int? Guests { get; set; } // Number of guests for the booking
        public string? Status { get; set; } // Status of the booking e.g., Pending, Confirmed, Cancelled
        public DateTime DateCreated { get; set; } // The date when the booking was made
        public DateTime DateCancelled { get; set; } // The date when the booking was cancelled if applicable
        public string? CancellationPolicy { get; set; } // Cancellation policy details
        public decimal? TotalPrice { get; set; } // Total price calculated based on the nights and price per night
        public decimal? ServiceCharge { get; set; } // Service charge if applicable
        public PaymentDetails? PaymentInfo { get; set; }
    }
}
