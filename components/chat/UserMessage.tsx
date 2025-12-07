interface UserMessageProps {
  author: string;
  content: string;
  timestamp: string;
}

export function UserMessage({ author, content, timestamp }: UserMessageProps) {
  return (
    <div className="flex flex-col items-start mb-4">
      <div className="bg-[#4CD3CD] text-[#0e111a] px-5 py-4 rounded-xl max-w-[60%] shadow-md">
        <p className="font-semibold text-xs mb-1">{author}</p>
        <p className="text-sm">{content}</p>
      </div>
      <span className="text-xs text-gray-400 mt-1">{timestamp}</span>
    </div>
  );
}
  