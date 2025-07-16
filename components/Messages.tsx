"use client"
import { UIMessage } from "ai"
import MarkdownMsg from "./MarkdownMsg"

interface MessagesProps {
    messages?: UIMessage[],
    setMessages?: (messages: UIMessage[]) => void,
    status?: "streaming" | "error" | "submitted" | "ready"
    reload?: () => void
}

export default function Messages({
    messages,
    setMessages,
    status,
    reload
}: MessagesProps) {
  return (
    <div>
      {messages?.map((message) => (
        <MarkdownMsg
          key={message.id}
          message={message}
          status={status ?? "ready"}
          reload={reload}
          edit={setMessages ?? (() => {})}
        />
      ))}
    </div>
  )
}