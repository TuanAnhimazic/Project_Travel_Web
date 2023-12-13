using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamousAuthorController : ControllerBase
    {

        private readonly DBContext_Bokking _db;

        public FamousAuthorController(DBContext_Bokking db)
        {
            _db = db;

        }

        [HttpGet("getFamousAuthor")]
        public async Task<IActionResult> GetFamouAuthorssAsync()
        {
            try
            {
                double popularityThreshold = 4;
                int minimumReviews = 10;

                var famousAuthors = await _db.Users
                    .Join(_db.Stays, // Bảng cần join
                          u => u.Id, // Khóa chính của bảng Users
                          s => s.UserId, // Khóa ngoại trong bảng Stays
                          (u, s) => new { User = u, Stay = s }) // Kết quả của join
                    .Where(j => j.Stay.Status == StayStatus.Approved) // Thêm điều kiện chỉ chọn Stays đã được duyệt
                    .GroupBy(j => j.User.Id)
                    .Select(g => new
                    {
                        UserId = g.Key,
                        FullName = g.First().User.FullName,
                        Avatar = g.First().User.Avatar,
                        AverageReview = g.Average(j => j.Stay.ReviewStart),
                        ReviewCount = g.Sum(j => j.Stay.ReviewCount)
                    })
                    .Where(u => u.ReviewCount >= minimumReviews && u.AverageReview >= popularityThreshold)
                    .ToListAsync();

                return Ok(new { success = true, data = famousAuthors });
            
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về thông báo lỗi hoặc log lỗi
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }


    }
}
