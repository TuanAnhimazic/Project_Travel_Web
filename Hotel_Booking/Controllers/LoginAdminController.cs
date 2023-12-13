using Hotel_Booking.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Hotel_Booking.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAdminController : ControllerBase
    {
        private readonly DBContext_Bokking _context;
        private readonly IConfiguration _configuration;

        public LoginAdminController(DBContext_Bokking context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }



        [HttpPost("login")]
        public IActionResult Login(LoginAdmin adminLogin)
        {
            try
            {
                if (adminLogin != null)
                {
                    var admin = _context.AdminAccounts.FirstOrDefault(u => u.Email == adminLogin.Email && u.Password == adminLogin.Password);

                    if (admin != null)
                    {
                        var createToken = GenerateToken(admin.Email);
                        return Ok(new { Message = "LoginSucces.", Token = createToken });
                    }
                    else
                    {
                        return Unauthorized(new { Message = "Username or password is incorrect." });
                    }
                }
                else
                {
                    return BadRequest(new { Message = "Invalid request." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Server error", Error = ex.Message });
            }
        }

        private string GenerateToken(string email)

        {
            
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings.GetValue<string>("SecretKey");

            
            var claims = new List<Claim>
             {

               new Claim(ClaimTypes.Name, email)
                 
             };

           

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenOptions = new JwtSecurityToken
            (
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // Thời gian hết hạn 1 giờ
                signingCredentials: credentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;

        }



    }

}





