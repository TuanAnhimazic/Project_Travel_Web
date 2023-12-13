using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class StayBookingPolicy
    {
        [Key]
        public int Id { get; set; }
        public int? MinNight { get; set; }
        public int? MaxNight { get; set; }
        public DateTime? CheckInTime { get; set; }    
        public DateTime? CheckOutTime { get; set; }
        public string? PolicyDescription { get; set; }
        public ICollection<BlockedDate>? BlockedDate { get; set; }

        // Mối quan hệ với Amenities và Rules
        public ICollection<ListAmenity>? ListAmenity { get; set; }
        public ICollection<ListRule>? ListRule { get; set; }

        public int? StayId { get; set; }
        [ForeignKey("StayId")]

        [NotMapped]
        public Stay? Stay { get; set; }

    }
}
