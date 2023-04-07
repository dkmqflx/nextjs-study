import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

// head 태그에서 아래 내용을 확인할 수 있다
export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Ellie에게 메일 보내기',
};

const LINKS = [
  { icon: <AiFillGithub />, url: '' },
  { icon: <AiFillLinkedin />, url: '' },
  { icon: <AiFillYoutube />, url: '' },
];

export default function ContactPage() {
  return (
    <section className='flex flex-col items-center'>
      <h2 className='text-3xl font-bold my-2'>Contact Me</h2>
      <p>info@dream-coding.com</p>
      <ul className='flex gap-4 my-2'>
        {/* 페이지 내부 이동할 때는 Link 태그 사용하지만
        외부 이동할 때는 a 태그 사용한다  */}
        {LINKS.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target='_blank'
            rel='noreferrer'
            className='text-5xl hover:text-yellow-400'
          >
            {link.icon}
          </a>
        ))}
      </ul>
      <h2 className='text-3xl font-bold my-8'>Or Send me an email</h2>
      <ContactForm />
    </section>
  );
}
