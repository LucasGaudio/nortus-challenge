export function calcPlanValue(baseValue: number, coverages: any) {
    let total = baseValue;
  
    if (coverages.rouboFurto) total += 25;
    if (coverages.colisao) total += 35;
    if (coverages.incendio) total += 20;
    if (coverages.fenomenos) total += 30;
  
    return total;
  }
  