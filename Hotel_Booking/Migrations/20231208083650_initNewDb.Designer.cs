﻿// <auto-generated />
using System;
using Hotel_Booking.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Hotel_Booking.Migrations
{
    [DbContext(typeof(DBContext_Bokking))]
    [Migration("20231208083650_initNewDb")]
    partial class initNewDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.24")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Hotel_Booking.Models.AdminAccount", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AdminId"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AdminId");

                    b.ToTable("AdminAccounts");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Amenity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("IsChecked")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Amenities");
                });

            modelBuilder.Entity("Hotel_Booking.Models.BlockedDate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("StayBookingPolicyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayBookingPolicyId");

                    b.ToTable("BlockedDates");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CancellationPolicy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CheckInDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CheckOutDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateCancelled")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<int?>("Guests")
                        .HasColumnType("int");

                    b.Property<int?>("PaymentInfoId")
                        .HasColumnType("int");

                    b.Property<decimal?>("ServiceCharge")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StayId")
                        .HasColumnType("int");

                    b.Property<decimal?>("TotalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PaymentInfoId");

                    b.HasIndex("StayId");

                    b.HasIndex("UserId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("Hotel_Booking.Models.GalleryImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ListImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StayId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayId");

                    b.ToTable("GalleryImages");
                });

            modelBuilder.Entity("Hotel_Booking.Models.ListAmenity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("AmenityId")
                        .HasColumnType("int");

                    b.Property<string>("Describe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDefaultChecked")
                        .HasColumnType("bit");

                    b.Property<int?>("StayBookingPolicyId")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AmenityId");

                    b.HasIndex("StayBookingPolicyId");

                    b.ToTable("ListAmenities");
                });

            modelBuilder.Entity("Hotel_Booking.Models.ListRule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Describe")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDefaultAllowed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDefaultChargeable")
                        .HasColumnType("bit");

                    b.Property<int?>("StayBookingPolicyId")
                        .HasColumnType("int");

                    b.Property<int?>("StayRuleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayBookingPolicyId");

                    b.HasIndex("StayRuleId");

                    b.ToTable("ListRules");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Lat")
                        .HasColumnType("float");

                    b.Property<double?>("Lng")
                        .HasColumnType("float");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("Hotel_Booking.Models.PaymentDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CVC")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CardExpiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("CardHolderName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PaymentConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("PaymentMethod")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PaymentDetails");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Price", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("BasePrice")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Prices");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<double?>("Rating")
                        .HasColumnType("float");

                    b.Property<int?>("StayId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayId");

                    b.HasIndex("UserId");

                    b.ToTable("Review");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Stay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Bed")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FeaturedImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Like")
                        .HasColumnType("bit");

                    b.Property<int?>("LocationId")
                        .HasColumnType("int");

                    b.Property<int?>("MaxBathroom")
                        .HasColumnType("int");

                    b.Property<int?>("MaxBedroom")
                        .HasColumnType("int");

                    b.Property<int?>("MaxGuest")
                        .HasColumnType("int");

                    b.Property<int?>("PriceId")
                        .HasColumnType("int");

                    b.Property<int?>("ReviewCount")
                        .HasColumnType("int");

                    b.Property<double?>("ReviewStart")
                        .HasColumnType("float");

                    b.Property<string>("SaleOff")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int?>("ViewCount")
                        .HasColumnType("int");

                    b.Property<int?>("categoryId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("PriceId");

                    b.HasIndex("UserId");

                    b.HasIndex("categoryId");

                    b.ToTable("Stays");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayBookingPolicy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime?>("CheckInTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("CheckOutTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("MaxNight")
                        .HasColumnType("int");

                    b.Property<int?>("MinNight")
                        .HasColumnType("int");

                    b.Property<string>("PolicyDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StayId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayId")
                        .IsUnique()
                        .HasFilter("[StayId] IS NOT NULL");

                    b.ToTable("StayBookingPolicies");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("PropertyType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rentalform")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("StayCategories");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayRule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("IsAllowed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsChargeable")
                        .HasColumnType("bit");

                    b.Property<string>("Rule")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("StayRules");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayView", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateViewed")
                        .HasColumnType("datetime2");

                    b.Property<int?>("StayId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StayId");

                    b.HasIndex("UserId");

                    b.ToTable("StayView");
                });

            modelBuilder.Entity("Hotel_Booking.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Birthday")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JobName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("bgImage")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Hotel_Booking.Models.BlockedDate", b =>
                {
                    b.HasOne("Hotel_Booking.Models.StayBookingPolicy", null)
                        .WithMany("BlockedDate")
                        .HasForeignKey("StayBookingPolicyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Hotel_Booking.Models.Booking", b =>
                {
                    b.HasOne("Hotel_Booking.Models.PaymentDetails", "PaymentInfo")
                        .WithMany()
                        .HasForeignKey("PaymentInfoId");

                    b.HasOne("Hotel_Booking.Models.Stay", "Stay")
                        .WithMany()
                        .HasForeignKey("StayId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Hotel_Booking.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.Navigation("PaymentInfo");

                    b.Navigation("Stay");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Hotel_Booking.Models.GalleryImage", b =>
                {
                    b.HasOne("Hotel_Booking.Models.Stay", null)
                        .WithMany("GalleryImgs")
                        .HasForeignKey("StayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Hotel_Booking.Models.ListAmenity", b =>
                {
                    b.HasOne("Hotel_Booking.Models.Amenity", "Amenity")
                        .WithMany()
                        .HasForeignKey("AmenityId");

                    b.HasOne("Hotel_Booking.Models.StayBookingPolicy", null)
                        .WithMany("ListAmenity")
                        .HasForeignKey("StayBookingPolicyId");

                    b.Navigation("Amenity");
                });

            modelBuilder.Entity("Hotel_Booking.Models.ListRule", b =>
                {
                    b.HasOne("Hotel_Booking.Models.StayBookingPolicy", "StayBookingPolicy")
                        .WithMany("ListRule")
                        .HasForeignKey("StayBookingPolicyId");

                    b.HasOne("Hotel_Booking.Models.StayRule", "StayRule")
                        .WithMany()
                        .HasForeignKey("StayRuleId");

                    b.Navigation("StayBookingPolicy");

                    b.Navigation("StayRule");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Review", b =>
                {
                    b.HasOne("Hotel_Booking.Models.Stay", "Stay")
                        .WithMany()
                        .HasForeignKey("StayId");

                    b.HasOne("Hotel_Booking.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Stay");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Stay", b =>
                {
                    b.HasOne("Hotel_Booking.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId");

                    b.HasOne("Hotel_Booking.Models.Price", "Price")
                        .WithMany()
                        .HasForeignKey("PriceId");

                    b.HasOne("Hotel_Booking.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.HasOne("Hotel_Booking.Models.StayCategory", "Category")
                        .WithMany()
                        .HasForeignKey("categoryId");

                    b.Navigation("Category");

                    b.Navigation("Location");

                    b.Navigation("Price");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayBookingPolicy", b =>
                {
                    b.HasOne("Hotel_Booking.Models.Stay", null)
                        .WithOne("BookingPolicy")
                        .HasForeignKey("Hotel_Booking.Models.StayBookingPolicy", "StayId");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayView", b =>
                {
                    b.HasOne("Hotel_Booking.Models.Stay", "Stay")
                        .WithMany()
                        .HasForeignKey("StayId");

                    b.HasOne("Hotel_Booking.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Stay");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Hotel_Booking.Models.Stay", b =>
                {
                    b.Navigation("BookingPolicy");

                    b.Navigation("GalleryImgs");
                });

            modelBuilder.Entity("Hotel_Booking.Models.StayBookingPolicy", b =>
                {
                    b.Navigation("BlockedDate");

                    b.Navigation("ListAmenity");

                    b.Navigation("ListRule");
                });
#pragma warning restore 612, 618
        }
    }
}
