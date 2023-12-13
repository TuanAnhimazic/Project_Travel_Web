using Hotel_Booking.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DBContext_Bokking>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Thêm d?ch v? CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000", "http://localhost:8888") // Thay th? b?ng các origin c?a b?n
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Lấy giá trị secret key từ cấu hình
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings.GetValue<string>("SecretKey");

// Thiết lập thông số xác thực JWT
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = false,
    ValidateAudience = false,
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey)),
};

// Thêm xác thực JWT vào dịch vụ xác thực
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{

    options.TokenValidationParameters = tokenValidationParameters;

});

//policy yêu cầu xác thực token
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

//app.Use((context, next) =>
//{
//    var origin = context.Request.Headers["Origin"];
//    var allowedOrigins = new List<string> { "http://localhost:3000", "http://localhost:8888" };

//    // Kiểm tra xem origin có nằm trong danh sách các origin đã cho phép
//    if (allowedOrigins.Contains(origin))
//    {
//        context.Response.Headers.Add("Access-Control-Allow-Origin", origin);
//        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
//        context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//        context.Response.Headers.Add("Access-Control-Allow-Credentials", "true"); // Điều này cho phép sử dụng cookie trong CORS

//        // Nếu bạn muốn xử lý yêu cầu CORS OPTIONS (pre-flight)
//        if (context.Request.Method == "OPTIONS")
//        {
//            context.Response.StatusCode = 200;
//            context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
//            context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//            context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
//            return Task.CompletedTask;
//        }

//        // Ghi log
//        Console.WriteLine($"CORS request allowed for origin: {origin}");
//    }
//    else
//    {
//        // Ghi log
//        Console.WriteLine($"CORS request denied for origin: {origin}");
//    }

//    return next();
//});

app.UseCors("AllowSpecificOrigin");


app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
