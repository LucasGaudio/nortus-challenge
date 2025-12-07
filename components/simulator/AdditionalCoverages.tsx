interface Coverages {
  rouboFurto: boolean;
  colisao: boolean;
  incendio: boolean;
  fenomenos: boolean;
}

interface AdditionalCoveragesProps {
  coverages: Coverages;
  setCoverages: (updater: (prev: Coverages) => Coverages) => void;
}

export function AdditionalCoverages({ coverages, setCoverages }: AdditionalCoveragesProps) {
    function toggle(name: keyof Coverages) {
      setCoverages(prev => ({ ...prev, [name]: !prev[name] }));
    }
  
    return (
      <div className="mt-10 text-gray-300">
        <h3 className="font-semibold mb-4">Coberturas Adicionais</h3>
  
        <div className="flex flex-col gap-3">
  
          <label className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={coverages.rouboFurto}
                onChange={() => toggle("rouboFurto")}
              />
              Cobertura contra roubo e furto
            </div>
            <span className="text-xs text-gray-400">+ R$ 25,00</span>
          </label>
  
          <label className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={coverages.colisao}
                onChange={() => toggle("colisao")}
              />
              Danos por colisão
            </div>
            <span className="text-xs text-gray-400">+ R$ 35,00</span>
          </label>
  
          <label className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={coverages.incendio}
                onChange={() => toggle("incendio")}
              />
              Cobertura contra incêndio
            </div>
            <span className="text-xs text-gray-400">+ R$ 20,00</span>
          </label>
  
          <label className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={coverages.fenomenos}
                onChange={() => toggle("fenomenos")}
              />
              Fenômenos naturais (granizo, enchente)
            </div>
            <span className="text-xs text-gray-400">+ R$ 30,00</span>
          </label>
  
        </div>
      </div>
    );
  }
  