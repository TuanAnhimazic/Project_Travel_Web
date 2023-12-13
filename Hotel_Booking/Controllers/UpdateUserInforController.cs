using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateUserInforController : ControllerBase
    {
        private readonly DBContext_Bokking _db;

        public UpdateUserInforController(DBContext_Bokking db)
        {
            _db = db;
        }

        [HttpPut("changePassword/{id}")]
        public IActionResult ChangePassword(int id, [FromBody] changePasswordModel changePasswordModel)
        {
            try
            {
                if (string.IsNullOrEmpty(changePasswordModel.CurrentPassword) || string.IsNullOrEmpty(changePasswordModel.NewPassword))
                {
                    return BadRequest(new { Success = false, Message = "Current password and new password are required" });
                }

                var user = _db.Users.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    return NotFound(new { Success = false, Message = "User not found" });
                }

                var passwordHash = new PasswordHasher<User>();

                // Xác nhận mật khẩu cũ trước khi thay đổi
                var verifyOldPasswordResult = passwordHash.VerifyHashedPassword(user, user.Password, changePasswordModel.CurrentPassword);

                if (verifyOldPasswordResult != PasswordVerificationResult.Success)
                {
                    return Ok(new  { Success = false, Message = "Incorrect current password" });
                }

                // Thay đổi mật khẩu mới
                user.Password = passwordHash.HashPassword(user, changePasswordModel.NewPassword);

                // Lưu thay đổi vào cơ sở dữ liệu
                _db.SaveChanges();

                return Ok(new { Success = true, Message = "Password changed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = "Change password failed: " + ex.Message });
            }
        }


        [HttpPost("updateUser/{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserData updatedUserData)
        {
            try
            {
                if (updatedUserData == null)
                {
                    return BadRequest(new { Success = false, Message = "Invalid user information" });
                }

                var existingUser = _db.Users.FirstOrDefault(u => u.Id == id);

                if (existingUser == null)
                {
                    return NotFound(new  { Success = false, Message = "User not found" });
                }

                // Cập nhật thông tin người dùng
                existingUser.FullName = updatedUserData.FullName;
                existingUser.PhoneNumber = updatedUserData.PhoneNumber;
                existingUser.Address = updatedUserData.Address;
                existingUser.Birthday = updatedUserData.Birthday;
                existingUser.Gender = updatedUserData.Gender;
                existingUser.Avatar = updatedUserData.Avatar;
                existingUser.Description = updatedUserData.Description;
                existingUser.JobName = updatedUserData.JobName;
                existingUser.bgImage = updatedUserData.bgImage;

                // Lưu thay đổi vào cơ sở dữ liệu
                _db.SaveChanges();

                // Trả về thông tin người dùng sau khi cập nhật
                var updatedUserResponse = new UserData
                {
                    Id = existingUser.Id,
                    FullName = existingUser.FullName,
                    Email = existingUser.Email,
                    PhoneNumber = existingUser.PhoneNumber,
                    Address = existingUser.Address,
                    Birthday = existingUser.Birthday,
                    Gender = existingUser.Gender,
                    Avatar = existingUser.Avatar,
                    Description = existingUser.Description,
                    JobName = existingUser.JobName,
                    bgImage = existingUser.bgImage,
                    Created = existingUser.Created
                };

                return Ok(new  { Success = true, Message = "User updated successfully", Data = updatedUserResponse });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = "Update user failed: " + ex.Message });
            }
        }


        [HttpGet("getUserInfo/{id}")]
        public async Task<IActionResult> GetUserInfo(int id)
        {
            try
            {
                // Kiểm tra ID có hợp lệ không
                if (id <= 0)
                {
                    return BadRequest(new { success = false, message = "Invalid ID" });
                }

                // Tìm kiếm thông tin người dùng theo ID
                // Tìm kiếm thông tin người dùng theo ID
                var userInfo = await _db.Users
                    .Where(u => u.Id == id)
                    .Select(u => new UserData
                    {
                        Id = u.Id,
                        FullName = u.FullName,
                        Email = u.Email,
                        PhoneNumber = u.PhoneNumber,
                        Address = u.Address,
                        Birthday = u.Birthday,
                        Gender = u.Gender,
                        Avatar = u.Avatar,
                        Description = u.Description,
                        JobName = u.JobName,
                        bgImage = u.bgImage,
                        Created = u.Created
                    })
                    .FirstOrDefaultAsync();

                // Kiểm tra xem người dùng có tồn tại không
                if (userInfo == null)
                {
                    return NotFound(new { success = false, message = "User not found." });
                }

                // Trả về thông tin người dùng nếu mọi thứ hợp lệ
                return Ok(new { success = true, data = userInfo });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về thông báo lỗi
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}
