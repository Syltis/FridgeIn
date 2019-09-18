using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace fridgein_api.Models
{
    public partial class FridgeInDbContext : DbContext
    {
        public FridgeInDbContext()
        {
        }

        public FridgeInDbContext(DbContextOptions<FridgeInDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Food> Food { get; set; }
        public virtual DbSet<Stockitem> Stockitem { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:fridgein-server.database.windows.net,1433;Initial Catalog=fridgein-db;Persist Security Info=False;User ID=kakemann;Password=Daddy199;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Food>(entity =>
            {
                entity.ToTable("food");

                entity.Property(e => e.FoodId).HasColumnName("food_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasColumnName("type")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Food)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_food_user");
            });

            modelBuilder.Entity<Stockitem>(entity =>
            {
                entity.ToTable("stockitem");

                entity.Property(e => e.StockitemId).HasColumnName("stockitem_id");

                entity.Property(e => e.ExpirationDate)
                    .HasColumnName("expiration_date")
                    .HasColumnType("date");

                entity.Property(e => e.FoodId).HasColumnName("food_id");

                entity.Property(e => e.PurchaseDate)
                    .HasColumnName("purchase_date")
                    .HasColumnType("date");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Food)
                    .WithMany(p => p.Stockitem)
                    .HasForeignKey(d => d.FoodId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stockitem_food");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Stockitem)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_stockitem_user");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
