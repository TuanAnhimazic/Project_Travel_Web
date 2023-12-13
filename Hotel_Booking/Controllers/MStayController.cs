using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class MStayController : ControllerBase
    {
        private readonly DBContext_Bokking _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public MStayController(DBContext_Bokking db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        //count user
        [HttpGet]
        [Route("count")]
        public ActionResult<int> GetStayCount()
        {
            var stayCount = _db.Stays.Count(); // Giả sử 'Users' là bảng người dùng của bạn
            return Ok(stayCount);
        }



        // GET api/stays
        [HttpGet]
        public ActionResult<IEnumerable<Stay>> GetAllStays()
        {
            // Lấy tất cả các stay và thông tin vị trí liên quan
            var staysWithLocations = _db.Stays
                                             .Include(s => s.Location)
                                             .ToList();

            // Tùy chọn: Nhóm các stays theo vị trí
            var staysGroupedByLocation = staysWithLocations
                                         .GroupBy(s => s.Location)
                                         .Select(g => new
                                         {
                                             Location = g.Key.City,
                                             Stays = g.ToList()
                                         })
                                         .ToList();

            if (!staysWithLocations.Any())
            {
                return NotFound();
            }

            return Ok(staysGroupedByLocation);
        }

        //list stay
        [HttpGet("GetListStay")]
        public async Task<ActionResult<IEnumerable<Stay>>> GetListStay()
        {
            try
            {
                var stayList = await _db.Stays.Include(c => c.Category).Include(p => p.Price).ToListAsync();
                return Ok(stayList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Failed to retrieve Stay: " + ex.Message });
            }
        }
        [HttpPut("UpdateStatus/{id}")]
        public async Task<IActionResult> UpdateStayStatus(int id, [FromBody] StayStatus status)
        {
            var stay = await _db.Stays.FindAsync(id);
            if (stay == null)
            {
                return NotFound();
            }

            stay.Status = status;
            await _db.SaveChangesAsync();

            return Ok(new { success = true, message = "Stay status updated successfully." });
        }


        //add category stay
        [HttpPost("category")]
        public async Task<IActionResult> AddCategory(StayCategory category)
        {
            try
            {
                if (category != null)
                {
                    _db.StayCategories.Add(category);
                    await _db.SaveChangesAsync();
                    return Ok(new { success = true, message = "created category sucessful" });
                }
                else
                {
                    return BadRequest(new { success = false, message = "create category failed" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = " create category failed: " + ex.Message });
            }
        }


        [HttpGet("GetStayById/{id}")]
        public async Task<IActionResult> GetStayById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid stay ID.");
            }

            try
            {
                var stay = await _db.Stays
                .Include(p => p.Price)
                .Include(c => c.Category)
                .Include(l => l.Location)
                .Include(img => img.GalleryImgs)
                .Include(u => u.User)
                .Select(s => new
                {
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
                    User = new
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
                    GalleryImgs = s.GalleryImgs.Select(img => new { img.Id, img.ListImage }),
                })
                .FirstOrDefaultAsync(s => s.Id == id);

                if (stay == null)
                {
                    return NotFound(new { success = false, message = "Stay not found." });
                }
                return Ok(new { success = true, data = stay });
            }
            catch (Exception ex)
            {
                // Log the exception details here to troubleshoot
                return StatusCode(500, new { success = false, message = "An error occurred while processing your request." });
            }
        }


        //list catgory stay
        [HttpGet("ListCategories")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await _db.StayCategories.ToListAsync();
                return Ok(new { success = true, message = " Get Category successful: ", data = categories });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Failed to retrieve categories: " + ex.Message });
            }
        }




    }
}
