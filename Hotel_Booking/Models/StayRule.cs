using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{
    public class StayRule
    {
        [Key]
        public int Id { get; set; }

        public string? Rule { get; set; }

        public bool IsAllowed { get; set; }

        public bool IsChargeable { get; set; }

    }

    public class ListRule
    {
        [Key]
        public int Id { get; set; }

        public string? Describe { get; set; }
        public bool IsDefaultAllowed { get; set; }
        public bool IsDefaultChargeable { get; set; }

        public int? StayBookingPolicyId { get; set; }
        [ForeignKey("StayBookingPolicyId")]
        public StayBookingPolicy? StayBookingPolicy { get; set; }

        public int? StayRuleId { get; set; }
        [ForeignKey("StayRuleId")]
        public StayRule? StayRule { get; set; }


    }
}
