using Hotel_Booking.Models;
using Microsoft.EntityFrameworkCore;
namespace Hotel_Booking.Data
{
    public class DBContext_Bokking: DbContext
    {
        public DBContext_Bokking(DbContextOptions<DBContext_Bokking> options) : base(options)
        {



        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Stay> Stays { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<StayCategory> StayCategories { get; set; }
        public virtual DbSet<GalleryImage> GalleryImages { get; set; }
        public virtual DbSet<StayBookingPolicy> StayBookingPolicies { get; set; }
        public virtual DbSet<Amenity>Amenities  { get; set; }
        public virtual DbSet<ListAmenity> ListAmenities { get; set; }
        public virtual DbSet<StayRule> StayRules { get; set; }
        public virtual DbSet<ListRule>ListRules { get; set; }
        public virtual DbSet<BlockedDate> BlockedDates { get; set; }
        public virtual DbSet<StayView> StayViews { get; set; }
        public virtual DbSet<Review> Review { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<PaymentDetails> PaymentDetails { get; set; }
       
        public virtual DbSet<StayLike> StayLikes { get; set; }

        public virtual DbSet<AdminAccount> AdminAccounts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình Booking
            modelBuilder.Entity<Booking>(entity =>
            {
                
                entity.HasOne(d => d.Stay)
                      .WithMany()
                      .HasForeignKey(d => d.StayId)
                      .OnDelete(DeleteBehavior.Cascade); // hoặc NoAction tùy theo yêu cầu

                entity.HasOne(d => d.User)
                      .WithMany()
                      .HasForeignKey(d => d.UserId)
                      .OnDelete(DeleteBehavior.NoAction); // Sử dụng NoAction để tránh vấn đề xóa liên tiếp

                // Thiết lập kiểu cột cho các thuộc tính decimal

                entity.Property(e => e.TotalPrice)
                      .HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ServiceCharge)
                      .HasColumnType("decimal(18, 2)");
            });

            // Cấu hình cho các entities khác...
        }








    }
}
