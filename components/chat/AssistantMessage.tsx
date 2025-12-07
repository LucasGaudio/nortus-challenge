interface AssistantMessageProps {
  content: string;
  timestamp: string;
}

export function AssistantMessage({ content, timestamp }: AssistantMessageProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-[#D1D5DB]/20 border border-[#2b3441] text-gray-200 px-5 py-4 rounded-xl max-w-[60%] shadow-md">
        <p className="text-sm">{content}</p>
      </div>
      <span className="text-xs text-gray-500 ml-2 self-end">{timestamp}</span>
    </div>
  );
}
  