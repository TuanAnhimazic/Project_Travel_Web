using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StayLikeController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public StayLikeController(DBContext_Bokking db)
        {
            _db = db;
        }

        [HttpGet("likeSaved/{id}")]
        public async Task<ActionResult<UserLikedStayModel>> GetUserLikes(int id)
        {
            try
            {
                // Kiểm tra xem người dùng có tồn tại không
                var userExists = await _db.Users.AnyAsync(u => u.Id == id);

                if (!userExists)
                {
                    return NotFound("User not found");
                }

                // Lấy danh sách các đối tượng lưu trú mà người dùng đã thích
                var userLikes = await _db.StayLikes
                    .Where(l => l.UserId == id && l.Islike)
                    .Select(l => new UserLikedStayModel
                    {
                        StayLikes = new StayLike { StayId = l.StayId, UserId = l.UserId  },
                        Stay =  _db.Stays
                                    .Include(s => s.Category)
                                    .Include(s => s.Price)
                                    .Include(s => s.GalleryImgs)
                                    .Where(s => s.Id == l.StayId && s.Status == StayStatus.Approved).FirstOrDefault(),
                    })
                    .ToListAsync();

                return Ok(new { success = true, message = "User Likes retrieved successfully", data = userLikes });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Failed to retrieve user likes: " + ex.Message });
            }
        }


        [HttpPost("postLike")]
        public async Task<IActionResult> PostLikeStay(StayLike model)
        {

            try
            {
                // Kiểm tra dữ liệu đầu vào
                if (model == null || model.UserId <= 0 || model.StayId <= 0)
                {
                    return BadRequest("Invalid input data");
                }

                // Kiểm tra xem đã có một lượt thích từ người dùng này cho đối tượng lưu trú này chưa
                var existingLike = await _db.StayLikes
                    .FirstOrDefaultAsync(l => l.UserId == model.UserId && l.StayId == model.StayId);

                if (existingLike != null)
                {
                    // Nếu đã tồn tại, cập nhật trạng thái like mới
                    existingLike.Islike = model.Islike;
                }
                else
                {
                    // Nếu chưa tồn tại, tạo một bản ghi mới
                    var newLike = new StayLike 
                    {
                        UserId = model.UserId,
                        StayId = model.StayId, 
                        Islike = model.Islike,
                        DateLiked = DateTime.UtcNow
                    };
                    _db.StayLikes.Add(newLike);
                }

                await _db.SaveChangesAsync();

                // Trả về thông báo thành công nếu muốn
                return Ok(new {success = true, message = "Like Save Successfuly", data = existingLike});

            }
            catch(Exception ex)
            {
                return BadRequest(new {success = false, message = "Like Save Failed: " + ex.Message });
            }

        }


    }
}
