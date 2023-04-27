namespace FeedbackForm.Models
{
    public class Message
    {

        public int Id { get; set; }

        public int TopicId { get; set; }

        public Topic? Topics { get; set; }

        public int ContactId { get; set; }

        public Contact? Contacts { get; set; }

        public string MessageText { get; set; }
    }
}
