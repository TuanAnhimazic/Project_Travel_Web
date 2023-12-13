using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{
    public class StayCategory
    {
        [Key]
        public int Id { get; set; }
        public string? PropertyType { get; set; }
        public string? Rentalform { get; set; }

        [NotMapped]
        public ICollection<Stay>? Stays { get; set; }
 
        //
      
    }
}
