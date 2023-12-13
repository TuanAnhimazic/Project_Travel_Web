using Hotel_Booking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OauthGoogleController : ControllerBase
    {
        [HttpPost("oauth-callback")]
        public async Task<IActionResult> OAuthCallback([FromBody] OAuthCallbackRequest request)
        {
            // Kiểm tra xem mã code đã được gửi thành công hay chưa
            if (string.IsNullOrEmpty(request.Code))
            {
                return BadRequest("Mã code không hợp lệ.");
            }

            try
            {
                // Gửi mã code đến Google để đổi lấy token
                string clientId = "354909848546-jsh2jd5e6gmqd2atthdp8cstbu8ian53.apps.googleusercontent.com";
                string clientSecret = "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";
                string redirectUri = "http://localhost:3000/login";  
                string tokenEndpoint = "https://accounts.google.com/o/oauth2/token";

                var httpClient = new HttpClient();

                var content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                {"code", request.Code},
                {"client_id", clientId},
                {"client_secret", clientSecret},
                {"redirect_uri", redirectUri},
                {"grant_type", "authorization_code"}
            });

                var response = await httpClient.PostAsync(tokenEndpoint, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    // responseBody chứa thông tin token từ Google

                    // Xử lý thông tin token            
             
                    return Ok(responseBody);
                }
                else
                {
                    return BadRequest("Lỗi khi đổi lấy token từ Google.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}
