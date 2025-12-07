interface IndicatorCardProps {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export function IndicatorCard({ name, conversion, roi, value }: IndicatorCardProps) {
  return (
    <div className="bg-[#1a2335] rounded-2xl p-5 flex justify-between items-center">
      <div>
        <p className="text-white font-semibold">{name}</p>
        <p className="text-xs text-gray-400 mt-1">
          Conversão: <span className="text-green-400">{conversion}%</span>
          &nbsp;&nbsp; ROI: <span className="text-green-500">{roi}%</span>
        </p>
      </div>

      <p className="text-xl font-bold text-white">R$ {value.toFixed(2)}</p>
    </div>
  );
}
  