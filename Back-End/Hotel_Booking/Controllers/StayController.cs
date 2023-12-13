using Hotel_Booking.Data;
using Hotel_Booking.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Hotel_Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    
    public class StayController : ControllerBase
    {
        private readonly DBContext_Bokking _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public StayController( DBContext_Bokking db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpPost("add")]
        public async Task<IActionResult> AddStay(
          [FromForm] string stayDataJson,
          [FromForm] IFormFile featuredImage,
          [FromForm] List<IFormFile> galleryImages)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    var stayData = JsonConvert.DeserializeObject<Stay>(stayDataJson);

                    if (stayData != null)
                    {

                        
                        if (stayData.Location != null && !_db.Locations.Any(l => l.Id == stayData.LocationId))
                        {
                            //nếu nhu location id trong stay chưa có thực hiện tạo mới
                            var newLocation = new Location 
                            {
                                Country = stayData.Location.Country,
                                Street = stayData.Location.Street,
                                State = stayData.Location.State,
                                City = stayData.Location.City,
                                Lat = stayData.Location.Lat,
                                Lng = stayData.Location.Lng,
                                
                            };
                            _db.Locations.Add(newLocation);
                            await _db.SaveChangesAsync();
                            stayData.LocationId = newLocation.Id; 
                        }
                        //
                        if(stayData.Price !=null && !_db.Prices.Any(p=>p.Id == stayData.PriceId))
                        {
                            var newPrice = new Price
                            {
                                BasePrice = stayData.Price.BasePrice,
                                Currency = stayData.Price.Currency,
                            };
                            _db.Prices.Add(newPrice);
                            await _db.SaveChangesAsync();
                            stayData.PriceId = newPrice.Id;
                        }
                        //
                        if(stayData.Category !=null && !_db.StayCategories.Any(c=>c.Id == stayData.categoryId))
                        {
                            var newCategory = new StayCategory
                            {
                                PropertyType = stayData.Category.PropertyType,
                                Rentalform = stayData.Category.Rentalform,
                            };
                            _db.StayCategories.Add(newCategory);
                            await _db.SaveChangesAsync();
                            stayData.categoryId = newCategory.Id;
                        }
                        var stay = new Stay
                        {
                            Title = stayData.Title,
                            Price = stayData.Price,
                            Description = stayData.Description,
                            Address = stayData.Address,
                            Bed     = stayData.Bed,
                            MaxGuest = stayData.MaxGuest,
                            MaxBedroom = stayData.MaxBedroom,
                            MaxBathroom = stayData.MaxBathroom,
                            SaleOff = stayData.SaleOff,
                            Status = stayData.Status,
                            UserId = stayData.UserId,
                            LocationId = stayData.LocationId,
                            PriceId = stayData.PriceId,
                            categoryId = stayData.categoryId,
                            

                        };

                        if (featuredImage != null)
                        {
                            var uniqueFileName = Guid.NewGuid().ToString() + "_" + featuredImage.FileName;
                            var featuredImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", uniqueFileName);
                            using (var stream = new FileStream(featuredImagePath, FileMode.Create))
                            {
                                await featuredImage.CopyToAsync(stream);

                            }
                            stay.FeaturedImage = uniqueFileName;
                        }

                        _db.Stays.Add(stay);
                        await _db.SaveChangesAsync();

                        stay.GalleryImgs = new List<GalleryImage>();
                        foreach (var galleryImage in galleryImages)
                        {
                            var uniqueFileName = Guid.NewGuid().ToString() + "_" + galleryImage.FileName;
                            var galleryImagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", uniqueFileName);
                            using (var stream = new FileStream(galleryImagePath, FileMode.Create))
                            {
                                await galleryImage.CopyToAsync(stream);
                            }
                            stay.GalleryImgs.Add(new GalleryImage
                            {
                                ListImage = uniqueFileName,
                                StayId = stay.Id 
                            });
                        }

                        var bookingPolicy = stayData.BookingPolicy;
                        if (bookingPolicy != null)
                        {
                            var newBookingPolicy = new StayBookingPolicy
                            {
                                MinNight = bookingPolicy.MinNight,
                                MaxNight = bookingPolicy.MaxNight,
                                CheckInTime = bookingPolicy.CheckInTime,
                                CheckOutTime = bookingPolicy.CheckOutTime,
                                PolicyDescription = bookingPolicy.PolicyDescription,
                                StayId = stay.Id,


                            };

                            _db.StayBookingPolicies.Add(newBookingPolicy);
                            await _db.SaveChangesAsync();

                            if (bookingPolicy.BlockedDate != null)
                            {
                                foreach (var blockedDate in bookingPolicy.BlockedDate)
                                {
                                    if (!_db.BlockedDates.Any(l => l.Id == blockedDate.Id)) {

                                        var newBlockedDate = new BlockedDate
                                        {
                                            StartDate = blockedDate.StartDate,
                                            EndDate = blockedDate.EndDate,
                                            StayBookingPolicyId = newBookingPolicy.Id
                                        };

                                        _db.BlockedDates.Add(newBlockedDate);
                                    }      
                                }
                            }

                            if (bookingPolicy.ListAmenity != null)
                            {
                                foreach (var amenity in bookingPolicy.ListAmenity)
                                {
                                    if (!_db.ListAmenities.Any(l => l.Id == amenity.Id))
                                    {
                                        var newAmenity = new ListAmenity
                                        {
                                            Describe = amenity.Describe,
                                            IsDefaultChecked = amenity.IsDefaultChecked,
                                            AmenityId = amenity.AmenityId,
                                            StayBookingPolicyId = newBookingPolicy.Id
                                        };

                                        _db.ListAmenities.Add(newAmenity);
                                    }
                                }
                            }

                            if (bookingPolicy.ListRule != null)
                            {
                                foreach (var rule in bookingPolicy.ListRule)
                                {
                                    if (!_db.ListRules.Any(l => l.Id == rule.Id))
                                    {
                                        var newRule = new ListRule
                                        {
                                            Describe = rule.Describe,
                                            IsDefaultAllowed = rule.IsDefaultAllowed,
                                            IsDefaultChargeable = rule.IsDefaultChargeable,
                                            StayRuleId = rule.StayRuleId,
                                            StayBookingPolicyId = newBookingPolicy.Id
                                        };

                                        _db.ListRules.Add(newRule);

                                    }
                                    
                                }
                            }
                        }


                        await _db.SaveChangesAsync();
                        transaction.Commit();
                        return Ok(new { success = true, message = "Stay Listing published successfully!" });
                    }
                    else
                    {
                        return BadRequest(new { success = false, message = "Failed to publish Stay listing." });
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return BadRequest(new { success = false, message = "Stay failed: " + ex.StackTrace });
                }
            }
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
                var stayList = await _db.Stays.Include(c=>c.Category).Include(p=>p.Price).ToListAsync();
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
                if(category != null)
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
            catch(Exception ex) 
            {
                return BadRequest(new { success = false, message = " create category failed: " + ex.Message });
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
