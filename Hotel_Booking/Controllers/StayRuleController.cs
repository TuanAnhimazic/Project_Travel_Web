using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StayRuleController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public StayRuleController(DBContext_Bokking db)
        {
            _db = db;
        }

        [HttpPost("add")]
        public async Task<ActionResult<StayRule>> CreateRule(StayRule stayRule)
        {
            try
            {
                if(stayRule != null) {

                    _db.StayRules.Add(stayRule);
                    await _db.SaveChangesAsync();

                    return Ok(new { success = true, message = "Created rules successful:", data = stayRule });

                }
                else
                {
                    return BadRequest(new { success = false, message = "Created rules failed"});
                }

            }catch(Exception ex)
            {
                return BadRequest(new { success = false, message = "Created rules failed" + ex.Message });
            }
        }
        //
        [HttpGet("listRule")]
        public async Task<ActionResult<IEnumerable<StayRule>>> GetRules()
        {
            try
            {


                var getRule = await _db.StayRules.ToListAsync();
                return Ok(new { success = true, message = "Get rule suceesful", data = getRule });


            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Failed to retrieve rules:" + ex.Message });
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteRule(int id)
        {
            try
            {
                var rule = await _db.StayRules.FindAsync(id);
                if (rule == null)
                {
                    return NotFound(new { success = false, message = "Rule not found." });
                }

                _db.StayRules.Remove(rule);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, message = "Rule deleted successfully." });
            }
            catch (Exception ex)
            {
               
                return BadRequest(new { success = false, message = "Error deleting rule: " + ex.Message });
            }
        }

    }
}
