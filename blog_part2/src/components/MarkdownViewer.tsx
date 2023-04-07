'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // syntax highlight 위한 라이브러리
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';

/**
 * 외부 라이브러리를 사용할 때, 이렇게 별도의 컴포넌트로 분리하면
 * 라이브러리에 대한 책임을 한단계 감싸주면
 * 라이브러리를 교체할 때 해당 컴포넌트에서만 수정을 해주면 되낟
 */

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      // max-w-none: 마크다운 최대로 커질 수 있는 너비 제한 없도록 한다
      className='prose max-w-none'
      remarkPlugins={[remarkGfm]}
      // code와 img를 어떻게 처리할지 설정할 수 있다
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag='div'
              {...props}
              style={materialDark}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: (image) => (
          <Image
            className='w-full max-h-60 object-cover'
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={350}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

/**
 * 스타일이 적용되어 있지 않다
 * 그 이유는 tailwind에서 typography가 기본적으로 reset 되어 있기 때문이다
 * 기본적으로 tailwind 사용하면 모든 html 요소가 reset 되어서 기본적으로 적용되는 padding, margin 이런 것들이 적용되지 않는다
 * 즉 클래스 이름으로 스타일을 적용해주지 않는이상 아무런 스타일이 적용되어 있지 않다
 * 그럴때는 아래링크의  @tailwindcss/typograhy를 사용해서  props 옵션을 전달해주면 된다
 * TailwindCSS 플러그인: https://tailwindcss.com/docs/typography-plugin
 * tailwind.confing.js에 @tailwindcss/typography 사용한다고 명시해준다
 */

/**
 * SyntaxHighlighter
 * 타입에러 참고 이슈: https://github.com/react-syntax-highlighter/react-syntax-highlighter/issues/479
 */
