using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{
    public class Amenity
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool IsChecked { get; set; }
        public AmenityType Type { get; set; }
    }

    public enum AmenityType
    {
        General, //id = 0
        Other,// id = 1
        Safe //id = 2
    }

    public class ListAmenity
    {
        [Key]
        public int Id { get; set; }
        public string? Describe { get; set; }
        public bool IsDefaultChecked { get; set; }
        public int Type { get; set; }

        public int? StayBookingPolicyId { get; set; }
        [ForeignKey("StayBookingPolicyId")]

        [NotMapped]
        public StayBookingPolicy? StayBookingPolicy { get; set; }

        public int? AmenityId { get; set; }
        [ForeignKey("AmenityId")]

        public Amenity? Amenity { get; set; } 

    }
}
