using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmenityController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public AmenityController(DBContext_Bokking db)
        {
            _db = db;
        }

        // POST: api/Amenity
        [HttpPost("add")]
        public async Task<ActionResult> AddAmenity([FromBody] Amenity amenity)
        {
            try
            {
                if (amenity != null)
                {
                    // Kiểm tra giá trị type
                    if (amenity.Type != AmenityType.General && amenity.Type != AmenityType.Other && amenity.Type != AmenityType.Safe)
                    {
                        return BadRequest(new { success = false, message = "Already Amenity Type" });
                    }

                    _db.Amenities.Add(amenity);
                    await _db.SaveChangesAsync();
                    return Ok(new { success = true, message = "Add amenity suceesful", data = amenity });
                }
                else
                {
                    return BadRequest(new { success = false, message = "Add amenity failed" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Add amenity failed" + ex.StackTrace });
            }

        }



        
        [HttpGet("AmenityList")]
        public async Task<ActionResult<IEnumerable<Amenity>>> GetAmenitiesByType()
        {
            try
            {

                var amenityType = await _db.Amenities.ToListAsync();
                return Ok(new { success = true, message = "Get amenity suceesful", data = amenityType });

            }
            catch (Exception ex)
            {

                return BadRequest(new { success = false, message = "Get amenity failed" + ex.Message });
            }


        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                // Tìm bản ghi Amenity cần xóa bằng id
                var amenityToDelete = await _db.Amenities.FindAsync(id);

                if (amenityToDelete == null)
                {
                    return NotFound(new { success = false, message = "Amenity not found" });
                }

                // Xóa bản ghi Amenity
                _db.Amenities.Remove(amenityToDelete);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, message = "Amenity deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Delete amenity failed: " + ex.Message });
            }
        }


    }
}
