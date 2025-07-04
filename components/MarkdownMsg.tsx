/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown" // markdown
import { UIMessage } from "ai"
import { cn } from "@/lib/utils"
// import remarkMath from 'remark-math'
// import rehypeKatex from 'rehype-katex'
// import remarkGfm from 'remark-gfm'
// import rehypeHighlight from 'rehype-highlight'

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any
}


const Avatar = ({ letter }: { letter: string }) => (
<div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium">
  {letter}
</div>
)

const CodeBlock = ({children,className,...props}:any)=>{
  const match = /language-(\w+)/.exec(className || "") 
  return (
    <pre
    className={cn('p-4 rounded-lg bg-slate-800 overflow-x-auto','my-4 text-sm',match && `language-${match[1]}`)}
    >
      <code className={className} {...props}>
        {children}
      </code>
    </pre>
  )
}

const InlineCode = ({children,className,...props}:any)=>{
return (
  <pre
  className={cn("bg-slate-200 dark:bg-slate-800 rounded px-1.5 py-0.5 text-sm", className)}
  {...props}
  >
    {children}
  </pre>
)
}

function MarkdownMsg({  message,  status, reload, edit }: {
  message:UIMessage,
  status: "streaming" | "error" | "submitted" | "ready", 
  reload?: () => void 
  edit:(messages:UIMessage[]) => void,
} ) {
  console.log('message', message)

  if (status === 'streaming') {
    return (
      <div key={message.id} className="message">
        <div className="p-1 bg-blue-200 rounded-md text-sm w-2 ">
          {message.role === 'user' ? 'U' : 'AI'}
        </div>
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

 const isUser = message.role === 'user'

 const content = Array.isArray(message.parts) ? message.parts.filter(part => part.type === 'text').map(part => part.text).join("\n") : message.content || '';
  
  return (
    <div 
      className={cn(
        "flex gap-3 items-start py-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && <Avatar letter="AI" />}

      <div
        className={cn(
          "rounded-lg px-4 py-2.5 max-w-[85%]",
          "shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm">{content}</p>
        ) : (
          <div className={cn(
            "prose dark:prose-invert prose-sm max-w-none",
            "prose-p:leading-relaxed prose-pre:p-0",
            "prose-code:before:content-none prose-code:after:content-none"
          )}>
            <ReactMarkdown
              components={{
              code: ({ inline, className, children, ...props }: CodeProps) => 
                inline 
                  ? <InlineCode className={className} {...props}>{children}</InlineCode>
                  : <CodeBlock className={className} {...props}>{children}</CodeBlock>
            }}
          >
            {content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && <Avatar letter="U" />}
    </div>
  )
}
export default MarkdownMsg
