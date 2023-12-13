using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class BlockedDate
    {
        [Key]
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int StayBookingPolicyId { get; set; }
        [ForeignKey("StayBookingPolicyId")]

        [NotMapped]
        public StayBookingPolicy? StayBookingPolicy { get; set; }

        
    }
}
