interface SlidersProps {
  vehicleValue: number;
  setVehicleValue: (value: number) => void;
  clientAge: number;
  setClientAge: (value: number) => void;
}

export function Sliders({ vehicleValue, setVehicleValue, clientAge, setClientAge }: SlidersProps) {
    return (
      <div className="mt-10 flex flex-col gap-8">
  
        {/* Valor do veículo */}
        <div>
          <p className="text-sm text-gray-300 mb-2">
            Valor do veículo: <strong>R$ {vehicleValue.toLocaleString()}</strong>
          </p>
  
          <input
            type="range"
            min={10000}
            max={500000}
            value={vehicleValue}
            onChange={e => setVehicleValue(Number(e.target.value))}
            className="w-full"
          />
  
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>R$ 10.000</span>
            <span>R$ 500.000</span>
          </div>
        </div>
  
        {/* Idade */}
        <div>
          <p className="text-sm text-gray-300 mb-2">
            Idade do Cliente: <strong>{clientAge} anos</strong>
          </p>
  
          <input
            type="range"
            min={18}
            max={90}
            value={clientAge}
            onChange={e => setClientAge(Number(e.target.value))}
            className="w-full"
          />
  
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>18 anos</span>
            <span>90 anos</span>
          </div>
        </div>
  
      </div>
    );
  }
  