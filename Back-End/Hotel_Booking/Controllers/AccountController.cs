using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DBContext_Bokking _context;
        private readonly IConfiguration _configuration;

        public AccountController(DBContext_Bokking context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Register(Register register)
        {
            try
            {

                if (register != null)
                {
                    var CheckEmail = await CheckEmailExistence(register.Email);

                    if (CheckEmail)
                    {
                        return Ok(new Response { Success = false, Message = "Email already exists." });
                    }
                    var user = new User
                    {
                        FullName = register.FullName,
                        Address = register.Address,
                        PhoneNumber = register.PhoneNumber,
                        Email = register.Email,
                        // Các thông tin khác ở đây
                    };

                    //mã hóa mật khẩu
                    var passwordHash = new PasswordHasher<User>();
                    user.Password = passwordHash.HashPassword(user, register.Password);

                    // Lưu đối tượng User vào cơ sở dữ liệu
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                    return Ok(new Response { Success = true, Message = "Registration successful" });
                }


            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return BadRequest(new Response { Success = false, Message = "Registration failed: " + ex.Message });
            }
            // Trả về BadRequest nếu thông tin đăng ký không hợp lệ
            return BadRequest(new Response { Success = false, Message = "Invalid registration information" });
        }


        private async Task<bool> CheckEmailExistence(string? email)
        {

            var existingUser = await _context.Users.FirstOrDefaultAsync(e => e.Email == email);

            if (existingUser != null)
            {
                // Địa chỉ email đã tồn tại
                return true;
            }
            else
            {
                // Địa chỉ email không tồn tại
                return false;
            }
        }


        [HttpPost("login")]
        public IActionResult Login(Login login)
        {
            try
            {
                if (login == null)
                {
                    return BadRequest(new Response { Success = false, Message = "Invalid login information" });
                }

                var user = _context.Users.FirstOrDefault(u => u.Email == login.Email);

                if (user != null && !string.IsNullOrEmpty(user.Email))
                {
                    var passwordHash = new PasswordHasher<User>();
                    //so sánh password 
                    var result = passwordHash.VerifyHashedPassword(user, user.Password, login.Password);

                    if (result == PasswordVerificationResult.Success)
                    {
                        var createToken = GenerateToken(user.Email);
                        return Ok(new Response { Success = true, Message = " Login successful ", Token = createToken });
                    }
                    else
                    {

                        return Ok(new Response { Success = false, Message = " Wrong password " });
                    }

                }
                else {

                    return Ok(new Response { Success = false, Message = " Wrong Email information " });

                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Success = false, Message = " Login failed: " + ex.Message });
                
            }


        }



        private string GenerateToken(string email)

        {
            // lấy jwt từ appsetting
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings.GetValue<string>("SecretKey");

            // tạo thông tin xác thực
            var claims = new List<Claim>
             {

               new Claim(ClaimTypes.Name, email)
                 // Các thông tin khác về người dùng có thể được thêm vào claims ở đây
             };

            // Tạo khóa ngẫu nhiên có kích thước (32 byte)

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

        [Authorize]
        [HttpGet("UserInfor")]
        public IActionResult GetUserInfor()
        {
            try
            {
                var authEmail = User?.Identity?.Name;
                if (authEmail != null)
                {
                    var user = _context.Users.FirstOrDefault(u => u.Email == authEmail);

                    if (user != null)
                    {
                        var userInfor = new User
                        {
                            Id = user.Id,
                            FullName = user.FullName,
                            Address = user.Address,
                            PhoneNumber = user.PhoneNumber,
                            Email = user.Email,
                            Birthday = user.Birthday,
                            Avatar = user.Avatar,
                            Gender = user.Gender,
                            bgImage = user.bgImage,
                            Description = user.Description,
                            JobName = user.JobName,

                        };
                        return Ok(new Response { Success = true, Message = "Authorzation successful:", Data = userInfor });
                    }
                }
                else
                {
                    return BadRequest(new Response { Success = false, Message = "Authorization failed" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Success = false, Message = ex.Message });

            }

            return BadRequest("Authorization no valid");

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            var user = await _context.Users.ToListAsync();
            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //count user
        [HttpGet]
        [Route("count")]
        public ActionResult<int> GetUserCount()
        {
            var userCount = _context.Users.Count(); // Giả sử 'Users' là bảng người dùng của bạn
            return Ok(userCount);
        }


        [HttpPut("update/{id}")]
        public async Task< IActionResult> updateUser(int id, [FromBody] User user)
        {
            var ExitsUser = await _context.Users.FindAsync(id);

            try
            {
                if(ExitsUser != null)
                {
                    ExitsUser.FullName = user.FullName;
                    ExitsUser.Address = user.Address;
                    ExitsUser.PhoneNumber = user.PhoneNumber;
                    ExitsUser.Avatar = user.Avatar;
                    ExitsUser.Gender = user.Gender;
                    ExitsUser.Birthday = user.Birthday;
                    ExitsUser.JobName = user.JobName;
                    ExitsUser.Description = user.Description;

                    
                    await _context.SaveChangesAsync();

                    var  updatedUser = ExitsUser;

                    return Ok(new Response { Success = true, Message = "Update successful" , Data= updatedUser });


                }
                else
                {
                    return Ok(new Response { Success = false, Message = "User Not Found" });
                }

            }catch(Exception ex)
            {
                return BadRequest(new Response { Success = false, Message = "Update failed" + ex.Message });
            }
        }

    }
}
