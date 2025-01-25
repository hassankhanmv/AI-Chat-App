import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import ReactMarkdown from 'react-markdown';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function MarkdownRenderer({ content }) {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };
    
    return (
        <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const codeContent = String(children).replace(/\n$/, '');

            return !inline && match ? (
                <div className="relative group my-4">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-1.5 text-muted-foreground hover:text-primary bg-background/50 backdrop-blur"
                    onClick={() => handleCopy(codeContent)}
                >
                    {copiedCode === codeContent ? (
                    <Check className="h-4 w-4" />
                    ) : (
                    <Copy className="h-4 w-4" />
                    )}
                </Button>
                </div>
                
                <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                className="rounded-lg p-4 pr-12 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30 overflow-x-auto"
                {...props}
                >
                {codeContent}
                </SyntaxHighlighter>
            </div>
            ) : (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                {children}
                </code>
            );
            },
            // Headings
            h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
            <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
            ),
            // Paragraphs
            p: ({ node, ...props }) => (
            <p className="text-base leading-7 mb-3" {...props} />
            ),
            // Lists
            ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
            <li className="mb-1.5" {...props} />
            ),
            // Checkboxes
            input: ({ node, ...props }) => (
            <input 
                type="checkbox" 
                className="w-4 h-4 mr-2 align-middle accent-primary" 
                checked={props.checked} 
                readOnly 
            />
            ),
            // Horizontal rules
            hr: ({ node, ...props }) => (
            <hr className="my-6 border-t-2 border" {...props} />
            ),
            // Links
            a: ({ node, ...props }) => (
            <a 
                className="text-primary underline hover:text-primary/80" 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer"
            />
            ),
            // Strong/bold
            strong: ({ node, ...props }) => (
            <strong className="font-semibold" {...props} />
            ),
            // Emphasis/italic
            em: ({ node, ...props }) => (
            <em className="italic" {...props} />
            )
        }}
        >
        {content}
        </ReactMarkdown>
    );
}