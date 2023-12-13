using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hotel_Booking.Models
{
    public class GalleryImage
    {
        
            [Key]
            public int Id { get; set; }
            public string? ListImage { get; set; } 
          

            public int StayId { get; set; } 
            [ForeignKey("StayId")]

            [NotMapped]
            public Stay? Stay { get; set; } 
        

    }
}
