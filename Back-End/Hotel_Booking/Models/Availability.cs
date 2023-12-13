using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class Availability
    {
        [Key]
        public int Id { get; set; }
        public int[]? Dates { get; set; }
        public int? NightMin { get; set; }
        public int? NightMax { get; set; }
    }
}
