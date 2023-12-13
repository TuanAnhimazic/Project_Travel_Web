using System.ComponentModel.DataAnnotations;


namespace Hotel_Booking.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        public string? Country {  get; set; }
        public string? Street { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public double? Lat { get; set; }
        public double? Lng { get; set; }

      
        //

    }

}
