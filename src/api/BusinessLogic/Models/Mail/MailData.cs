namespace BusinessLogic.Models.Mail;

public sealed class MailData
{
    public MailData(string to, string subject, string htmlContent = null)
    {
        To = to;
        Subject = subject;
        HtmlContent = htmlContent;
    }

    public string To { get; }

    public string Subject { get; }

    public string HtmlContent { get; }
}
