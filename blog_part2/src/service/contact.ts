import { EmailData } from './email';

// contact 이메일을 보내는 로직
// API Route에 이메일 전송을 위한 요청을 보낸다
// 클라이언트에서 네트워크를 요청하니까 해당 함수는 클라이언트에서 실행이 된다
export async function sendContactEmail(email: EmailData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'applicatioin/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '서버 요청에 실패함 😂');
  }
  return data;
}
