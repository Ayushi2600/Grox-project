import { injectable } from "tsyringe";

@injectable()
class EmailService {
  constructor() { }

  async sendEmail(to: string, subject: string, text: string) {
    // TODO: Implement email sending
    console.log(to, subject, text);
    return {
      message: "Email sent",
    }
  }
}

export default EmailService;