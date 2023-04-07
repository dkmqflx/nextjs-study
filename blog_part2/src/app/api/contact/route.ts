import { sendEmail } from '@/service/email';
import * as yup from 'yup'; // 입력한 데이터 유효성 검사하기 위한 라이브러리

// 데이터에 대한 형태를 정해준다
const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

// route.ts 파일내에는 메소드 별로 함수를 만들 수 있따

// api route는 서버에서 실행이 된다
// 그렇기 때문에 노드메일러라는 노드 환경에서 실행되는 라이브러리를 사용할 수 있는 것이다
export async function POST(req: Request) {
  const body = await req.json();

  // POST 함수 내부에서 함수를 호출한다

  // 데이터 유효성 검사
  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: '메일 전송에 실패함!' }), {
      status: 400,
    });
  }
  // 노드 메일러를 사용해서 메일을 전송한다
  return sendEmail(body) //
    .then(
      () =>
        new Response(JSON.stringify({ message: '메일을 성공적으로 보냈음' }), {
          status: 200,
        }) // Response 마우스 클릭하면 어떤 인자들이 전달되는지 확인할 수 있다
    )
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify({ message: '메일 전송에 실패함!' }), {
        status: 500,
      });
    });
}

/**
 * 메일을 보내는 요청을 클라이언트에서 서버로 요청을 하면 서버에서 이메일로 보낸다
 * 성공적으롬 메일을 보내면 클라이언트로 응답을 보내준다
 * 클라이언트에서 바로 메일을 보내는 것이 아니라 서버에서 보내는데
 * 그 이유는 메일을 보내기 위해서는 사용자의 아이디와 패스워드가 필요한데 이것을 클라이언트에서 노출하고 싶지 않고
 * nodemailer 라이브러리는 노드 환경에서만 사용할 수 있다
 * 그러니까 submit을 누르면 서버에서 처리해달라고 요청을 하면, 서버에서 처리하고 그 결과를 클라이언트로 보낸다
 */
