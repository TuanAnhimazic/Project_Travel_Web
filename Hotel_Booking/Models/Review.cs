using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public int? StayId { get; set; }
        [ForeignKey("StayId")]
        public Stay? Stay { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public double? Rating { get; set; }
        public string? Comment { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
