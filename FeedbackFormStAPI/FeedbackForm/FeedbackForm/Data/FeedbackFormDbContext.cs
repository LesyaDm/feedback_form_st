using FeedbackForm.Models;
using Microsoft.EntityFrameworkCore;

namespace FeedbackForm.Data
{
    public class FeedbackFormDbContext : DbContext
    {
        public FeedbackFormDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Message> Messages { get; set; }

    }
}
