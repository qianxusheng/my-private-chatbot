import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageContentProps {
  content: string;
  role: 'user' | 'assistant';
}

export default function MessageContent({ content, role }: MessageContentProps) {
  if (role === 'user') {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const isCodeBlock = className && className.startsWith('language-');
          
          if (isCodeBlock && match) {
            return (
              <SyntaxHighlighter
                style={oneDark as { [key: string]: React.CSSProperties }}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-2 !bg-gray-900"
                customStyle={{
                  margin: '8px 0',
                  borderRadius: '6px',
                  backgroundColor: '#1a1a1a'
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          
          return (
            <code 
              className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        p: ({ children, ...props }) => <p className="mb-2 last:mb-0" {...props}>{children}</p>,
        ul: ({ children, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props}>{children}</ul>,
        ol: ({ children, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props}>{children}</ol>,
        h1: ({ children, ...props }) => <h1 className="text-xl font-bold mb-2" {...props}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 className="text-lg font-semibold mb-2" {...props}>{children}</h2>,
        h3: ({ children, ...props }) => <h3 className="text-md font-medium mb-1" {...props}>{children}</h3>,
        blockquote: ({ children, ...props }) => (
          <blockquote className="border-l-4 border-gray-500 pl-4 italic my-2" {...props}>
            {children}
          </blockquote>
        ),
        a: ({ children, href, ...props }) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:underline"
            {...props}
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}