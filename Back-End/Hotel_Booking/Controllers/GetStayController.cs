using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetStayController : ControllerBase
    {

        private readonly DBContext_Bokking _db;

        public GetStayController(DBContext_Bokking db)
        {
            _db = db;
         
        }
       
        [HttpGet("getFamousLocations")]
        public async Task<List<FamousLocation>> GetFamousLocationsAsync()
        {
            
            // Lấy ra danh sách các địa điểm cùng với trung bình đánh giá và số lượng đánh giá
            double popularityThreshold = 4;
            int minimumReviews = 10;
            var famousLocationsQuery = _db.Stays
                .Where(s => s.ReviewCount >= minimumReviews)
                .GroupBy(s => s.LocationId)
                .Select(g => new
                {
                    LocationId = g.Key,
                    AverageReview = g.Average(s => s.ReviewStart),
                    ReviewCount = g.Sum(s => s.ReviewCount)
                })
                .Where(l => l.AverageReview >= popularityThreshold)
                .Select(l => l.LocationId);

            // Lấy ra thông tin chi tiết của các địa điểm đó
            var famousLocations = await _db.Locations
                .Where(l => famousLocationsQuery.Contains(l.Id))
                .Select(location => new FamousLocation
                {
                    Location = location,
                    Stays = _db.Stays
                            .Where(stay => stay.LocationId == location.Id && stay.Status == StayStatus.Approved)
                            .Include(stay => stay.Category)
                            .Include(stay => stay.GalleryImgs)
                            .Include(stay => stay.Price)
                            .ToList()
                })
                .ToListAsync();



            return famousLocations;
        }




        [HttpGet("listingStay")]
        public async Task<IActionResult> GetStays()
        {
            try
            {
                
                var query = _db.Stays
                    .Where(s =>s.Status == StayStatus.Approved)
                    .Include(s => s.Price)
                    .Include(s => s.Category)
                    .Include(s => s.GalleryImgs)
                    .AsQueryable();

                var totalCount = await query.CountAsync();
                var stays = await query
                    .ToListAsync();

                return Ok(new { success = true, totalCount, data = stays });
            }
            catch (Exception ex)
            {
                // Ghi log lỗi nếu cần
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet("GetStayById/{id}")]
        public async Task<IActionResult> GetStayByIdAsync(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { success = false, message = "Invalid stay ID." });
            }

            try
            {

             var stay = await _db.Stays
             .Include(p => p.Price)
             .Include(c => c.Category )
             .Include(l => l.Location)
             .Include(img => img.GalleryImgs)
             .Include(u=> u.User)
             .Select(s => new {
                 s.Id,
                 s.Title,
                 s.Description,
                 s.Address,
                 s.FeaturedImage,
                 s.MaxGuest,
                 s.Bed,
                 s.MaxBedroom,
                 s.MaxBathroom,
                 s.ReviewCount,
                 s.ReviewStart,
                 s.ViewCount,
                 s.SaleOff,
                 User = new UserData
                 {
                     Id = s.User.Id,
                     FullName = s.User.FullName,
                     Email = s.User.Email,
                     Avatar = s.User.Avatar,
                     Description = s.User.Description,
                     Created = s.User.Created,
                     
                 },
                  s.Price, 
                  s.Category, 
                  s.Location, 
                  s.GalleryImgs,


             })
             .FirstOrDefaultAsync(s => s.Id == id);

                if (stay == null)
                {
                    return NotFound(new { success = false, message = "Stay not found." });
                }

                var StayCount = await _db.Stays.CountAsync(st => st.UserId == stay.User.Id);

                return Ok(new { success = true, data = stay, stayOfUser  = StayCount });


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });

            }
           
        }


    }
}
