using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StayPolicyController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public StayPolicyController(DBContext_Bokking db)
        {
            _db = db;

        }

        [HttpGet("getStayPolicy/{id}")]

        public async Task<IActionResult> GetStayPolicy(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new { success = false, message = "Invalid ID." });
            }

            try
            {
                var policy = await _db.StayBookingPolicies
                    .Include(d => d.BlockedDate)
                    .Include(a => a.ListAmenity)
                    .Include(r => r.ListRule)
                    .Where(r => r.StayId == id)
                    .Select(r => new {
                       r.Id,
                       r.MaxNight,
                       r.MinNight,
                       r.CheckInTime,
                       r.CheckOutTime,
                       r.PolicyDescription,
                       r.StayId,
                       r.BlockedDate,
                       r.ListAmenity,
                       r.ListRule
                    })
                    .FirstOrDefaultAsync();


                if (policy == null)
                {
                    return NotFound(new { success = false, message = "Stay policy not found." });
                }

                return Ok(new { success = true, data = policy });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }


    }
}
