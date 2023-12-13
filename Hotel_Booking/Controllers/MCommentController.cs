using Hotel_Booking.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MCommentController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public MCommentController(DBContext_Bokking db)
        {
            _db = db;

        }

        [HttpGet("getReview")]
        public async Task<IActionResult> GetReviews()
        {
            try
            {
                var reviews = await _db.Review
                    .Include(r => r.User)
                    .OrderBy(r => r.StayId) // Sắp xếp theo StayId tăng dần
                    .Select(r => new {
                        r.Id,
                        r.UserId,
                        r.StayId,
                        r.Comment,
                        r.Rating,
                        DateCreated = r.DateCreated.ToString("o"), // ISO 8601 format
                        User = new
                        {
                            r.User.Id,
                            r.User.FullName,
                            r.User.Avatar
                        },
                        Stay = new
                        {
                           
                            r.Stay.Title,
                            
                        }
                    })
                    .ToListAsync();

                if (reviews == null || reviews.Count == 0)
                {
                    return NotFound(new { success = false, message = "Reviews not found." });
                }

                return Ok(new { success = true, data = reviews });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
        [HttpDelete("deleteReview/{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            try
            {
                var review = await _db.Review.FindAsync(reviewId);
                if (review == null)
                {
                    return NotFound(new { success = false, message = "Review not found." });
                }

                _db.Review.Remove(review);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, message = "Review deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }



    }
}
