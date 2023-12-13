using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{
    public class StayView
    {
        public int Id { get; set; }
        public int? StayId { get; set; }
        [ForeignKey("StayId")]
        public Stay? Stay { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public DateTime DateViewed { get; set; }
     
    }
}
