import { FeedbacksRepository } from "../repositories/feedbacks-repositoy";
import { MailAdapter } from "../services/mail-adapter";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Inavlid screenshot format");
    }

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family:sans-serif; font-size:16px; color:#111; display:flex; align-items:flex-start; flex-direction:column; gap:1rem;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<image src="${screenshot}" style="width:35%;">` : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
