import nodemailer from 'nodemailer'; // nodemailer 노드 환경에서만 사용할 수 있다

export type EmailData = {
  from: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER, // .env.local에 있는 파일 읽어온다
    pass: process.env.AUTH_PASS,
  },
});

// transporter를 이용해서 외부에서 호출할 수 있는 함수를 만든다
export async function sendEmail({ subject, from, message }: EmailData) {
  const mailData = {
    to: process.env.AUTH_USER,
    subject: `[BLOG] ${subject}`,
    from,
    html: `
        <h1>${subject}</h1>
        <div>${message}</div>
        <br/>
        <p>보낸사람: ${from}</p>
        `,
  };

  return transporter.sendMail(mailData); // 메일 전송
}

/**
 * 10.15 강의 참조 -  이메일 보내는 기능 구현
 */
