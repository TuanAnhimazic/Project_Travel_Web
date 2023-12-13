using System.ComponentModel.DataAnnotations.Schema;

namespace Hotel_Booking.Models
{
    public class StayLike
    {
        public int Id { get; set; }
        public int? StayId { get; set; }
        [ForeignKey("StayId")]
        public Stay? Stay { get; set; }
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public bool Islike { get; set; }
        public DateTime DateLiked { get; set; }
    }

    public class UserLikedStayModel
    {
        public StayLike? StayLikes { get; set; }
        public Stay? Stay { get; set; }

        // Thêm các trường dữ liệu khác cần thiết từ Stay
    }
}
