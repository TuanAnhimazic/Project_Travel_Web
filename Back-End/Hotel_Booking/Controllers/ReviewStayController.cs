using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewStayController : ControllerBase
    {

        private readonly DBContext_Bokking _db;

        public ReviewStayController(DBContext_Bokking db)
        {
            _db = db;

        }

        [HttpGet("getReview/{id}")]

        public async Task<IActionResult> GetReviews(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { success = false, message = "Invalid ID." });
            }

            try
            {
                var review = await _db.Review
                    .Include(r => r.User)
                    .Where(r => r.StayId == id)
                    .Select(r => new {
                        r.Id,
                        r.UserId,
                        r.StayId,
                        r.Comment,
                        r.Rating,
                        r.DateCreated,
                        User = new
                        {
                            r.User.Id,
                            r.User.FullName,
                            r.User.Avatar,
                          
                        }
                    })
                    .ToListAsync();


                if (review == null || review.Count == 0)
                {
                    return NotFound(new { success = false, message = "Reviews not found." });
                }

                return Ok(new { success = true, data = review });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }


        [HttpPost("postReview")]
        public async Task<IActionResult> PostReviewStayAsync(Review review)
        {

            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    // Thêm đánh giá mới
                    var newReview = new Review 
                    {
                        UserId = review.UserId,
                        StayId = review.StayId,
                        Rating = review.Rating,
                        Comment = review.Comment,
                        DateCreated = DateTime.UtcNow,

                    };
                    _db.Review.Add(newReview);
                    await _db.SaveChangesAsync();

                    // Tính toán thông tin tổng hợp
                    var averageRating = _db.Review.Where(r => r.StayId == review.StayId).Average(r => r.Rating);
                    var reviewCount = _db.Review.Count(r => r.StayId == review.StayId);

                    // Cập nhật stay
                    var stay = _db.Stays.Find(review.StayId);
                    if (stay == null)
                    {
                        transaction.Rollback();
                        return NotFound(new { success = false, message = "Stay not found." });
                    }
                    stay.ReviewStart = averageRating;
                    stay.ReviewCount = reviewCount;
                    await _db.SaveChangesAsync();

                    

                    var user =  _db.Users.Find(review.UserId);
                    if (user == null)
                    {
                        transaction.Rollback();
                        return NotFound(new { success = false, message = "User not found." });
                    }
                    var reviewToReturn = new
                    {
                        Id = newReview.Id,
                        UserId = newReview.UserId,
                        StayId = newReview.StayId,
                        Rating = newReview.Rating,
                        Comment = newReview.Comment,
                        DateCreated = newReview.DateCreated,
                        User = new
                        {
                            Id = user.Id,
                            FullName = user.FullName,
                            Avatar = user.Avatar
                        }
                    };

                    // Hoàn tất giao dịch
                    transaction.Commit();
                    return Ok(new { success = true, message = "post rating and comment succesfully", data = reviewToReturn });

                }
                catch (Exception ex)
                {
                    // Xử lý lỗi, ví dụ ghi log
                    transaction.Rollback();
                    return BadRequest(new { success = false, message = "post rating and comment fails" + ex.Message });
                }
            }

        }
    }
}
