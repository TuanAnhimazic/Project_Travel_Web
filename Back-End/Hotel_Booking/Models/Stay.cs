using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{

    public class Stay
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? FeaturedImage { get; set; }
        public string? Address { get; set; }
        public int? MaxGuest { get; set; }
        public bool? Like { get; set; }
        public int? Bed { get; set; }
        public int? MaxBedroom { get; set; }
        public int? MaxBathroom { get; set; }
        public string? SaleOff { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public StayStatus Status { get; set; } = StayStatus.Pending;
        public int? ViewCount { get; set; } // Kiểu int là đủ nếu bạn không mong đợi số lượng rất lớn
        public double? ReviewStart { get; set; } // Kiểu double cho giá trị thập phân
        public int? ReviewCount { get; set; } // Kiểu int cho số lượng đánh giá

        public int? UserId { get; set; }
        [ForeignKey("UserId ")]
        public User? User { get; set; }
        //
        public int? PriceId { get; set; }
        [ForeignKey("PriceId")]
        public Price? Price { get; set; }

        //
        public int? categoryId { get; set; }
        [ForeignKey("categoryId ")]
        public StayCategory? Category { get; set; }
        //
        public int? LocationId { get; set; }
        [ForeignKey("LocationId ")]
        public Location? Location { get; set; }
        //
        public ICollection<GalleryImage>? GalleryImgs { get; set; }
        //
        public StayBookingPolicy? BookingPolicy { get; set; }


    }

    public enum StayStatus
    {
        Pending,  // 0 chờ duyệt
        Approved, //1 duyệt
        Rejected  //2 từ chối 
    }

    public class Price
    {

        [Key]
        public int Id { get; set; }
        public string? BasePrice { get; set; }
        public string? Currency { get; set; }

    }
   





}
