using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public ProfilesController(DBContext_Bokking db)
        {
            _db = db;

        }
        [HttpGet("GetUserStayAndReviews/{id}")]
        public async Task<ActionResult<UserStayReviewModel>> GetUserStayAndReviews(int id)
        {
           

            try
            {
                var userWithStays = await _db.Users
                                .Where(u => u.Id == id)
                                .Select(u => new UserStayReviewModel
                                {
                                    User = new UserData
                                    {
                                        Id = u.Id,
                                        FullName = u.FullName,
                                        Avatar = u.Avatar,
                                        Description = u.Description,
                                        Email = u.Email,
                                        PhoneNumber = u.PhoneNumber,
                                        Address = u.Address,
                                        JobName = u.JobName,
                                        Created = u.Created,
                                        

                                    },
                                    Stays = _db.Stays
                                    .Include(s=>s.Category)
                                    .Include(s => s.Price)
                                    .Include(s=>s.Location)
                                    .Include(s=>s.GalleryImgs)
                                    .Where(s=>s.UserId == id && s.Status == StayStatus.Approved).ToList(),
             
                                }).FirstOrDefaultAsync();

                if (userWithStays != null)
                {
                    userWithStays.TotalReviewCount = userWithStays.Stays?.Sum(s => s.ReviewCount) ?? 0;
                    userWithStays.AverageReviewStart = userWithStays.Stays?.Average(s => s.ReviewStart) ?? 0.0;
                }
                else
                {
                    return NotFound(new { success = false, message = "User or stays not found." });
                }

                return Ok(new { success = true, data = userWithStays });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về thông báo lỗi hoặc log lỗi
                return StatusCode(500, new { success = false, message = ex.StackTrace });

            }
           

            

            
        }


    }
}
