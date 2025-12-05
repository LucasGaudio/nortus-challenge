export default function SummaryCard({ title, value, icon }: any) {
    return (
      <div className="bg-[#111827] p-6 rounded-2xl flex flex-col gap-2">
        <span className="text-gray-400">{title}</span>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">{value}</span>
          <span>{icon}</span>
        </div>
      </div>
    );
  }
  