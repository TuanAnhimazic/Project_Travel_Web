namespace Hotel_Booking.Models
{
    public class Response
    {
        public bool Success {  get; set; }
        public string? Message { get; set; }

        public User? Data { get; set; }
        public Stay? DataStay { get; set; }

        public string? Token { get; set; }
    }
}
