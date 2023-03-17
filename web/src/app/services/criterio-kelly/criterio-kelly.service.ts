import { Injectable } from '@angular/core';
import { Tip } from '../tip/tip.types';
import { BasicCriterioKellyInfo } from './criterio-kelly.types';

@Injectable({ providedIn: 'root' })
export class CriterioKellyService {
  getBasicCriterioKellyInfo(tips: Tip[]): BasicCriterioKellyInfo {
    let basicCriteriokellyInfo: BasicCriterioKellyInfo = {
      totalTips: tips.length,
      totalTipsWon: 0,
      totalTipsLost: 0,
      totalTipsVoid: 0,
      percentageTipsWon: 0,
    };

    tips.forEach((tip) => {
      if (tip.result === 'GREEN') {
        basicCriteriokellyInfo.totalTipsWon++;
      } else if (tip.result === 'RED') {
        basicCriteriokellyInfo.totalTipsLost++;
      } else {
        basicCriteriokellyInfo.totalTipsVoid++;
      }
    });

    basicCriteriokellyInfo.percentageTipsWon =
      basicCriteriokellyInfo.totalTipsWon / basicCriteriokellyInfo.totalTips;

    return basicCriteriokellyInfo;
  }

  calculateKellyCriterion(odd: number, percentageTipsWon: number): number {
    percentageTipsWon = percentageTipsWon / 100;
    return (percentageTipsWon * odd - 1) / (odd - 1) * 100;
  }
}
