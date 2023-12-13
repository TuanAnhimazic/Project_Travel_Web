namespace Hotel_Booking.Models
{
    public class FamousLocation
    {
        public Location? Location { get; set; }
        public IEnumerable<Stay>? Stays { get; set; }
    }
}
