export default function SummaryCard({ title, value, icon }: any) {
    return (
      <div className="bg-[#111827] p-6 rounded-xl flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-sm">{title}</span>
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </div>
    );
  }
  