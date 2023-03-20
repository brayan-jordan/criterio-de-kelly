import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CriterioKellyService } from 'src/app/services/criterio-kelly/criterio-kelly.service';
import { BasicCriterioKellyInfo } from 'src/app/services/criterio-kelly/criterio-kelly.types';
import { MethodService } from 'src/app/services/method/method.service';
import { Method } from 'src/app/services/method/method.types';
import { TipService } from 'src/app/services/tip/tip.service';
import { Tip, TipInput } from 'src/app/services/tip/tip.types';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  constructor(
    private tipService: TipService,
    private methodService: MethodService,
    private criterioKellyService: CriterioKellyService,
    private router: Router
  ) {}

  loader = false;
  tips: Tip[] = [];

  resultsOptions = ['GREEN', 'RED', 'PENDING'];
  selectedResultOption: any = '';

  methodsOptions: Method[] = [];
  selectedMethodOption = '';

  newTipInfo = {
    date: '',
    description: '',
    odd: '',
  };

  editTipInfo = {
    id: '',
    date: '',
    description: '',
    odd: '',
    result: '',
    methodId: '',
  };

  filter = {
    description: '',
    minOdd: '',
    maxOdd: '',
    startDate: '',
    finishDate: '',
    methodId: '',
    result: '',
  };

  criterioKellyFromActualTips: BasicCriterioKellyInfo = {
    totalTips: 0,
    totalTipsVoid: 0,
    totalTipsLost: 0,
    totalTipsWon: 0,
    percentageTipsWon: 0,
  };

  ngOnInit(): void {
    this.findMethodsOptions();
    this.findTips();
  }

  findMethodsOptions() {
    this.loader = true;
    this.methodService.get('', '').subscribe((res) => {
      this.methodsOptions = res;
      this.loader = false;
    });
  }

  findTips() {
    this.loader = true;
    this.tipService
      .get(
        this.filter.description,
        Number(this.filter.minOdd),
        Number(this.filter.maxOdd),
        new Date(this.filter.startDate),
        new Date(this.filter.finishDate),
        this.filter.methodId,
        this.filter.result
      )
      .subscribe((res) => {
        this.tips = res;
        this.updateCriterioKellyInfo();
        this.loader = false;
      });
  }

  submit() {
    if (!this.newTipInfo.description) {
      alert('preencha a descricao');
      return;
    }

    if (!this.selectedMethodOption) {
      alert('preencha o metodo');
      return;
    }

    let newTip = this.mapNewTipInfoToTipInput();
    this.tipService.post(newTip).subscribe((res) => {
      this.tips.unshift(res);
      this.updateCriterioKellyInfo();
    });
  }

  mapNewTipInfoToTipInput(): TipInput {
    let newTip: TipInput = {
      description: this.newTipInfo.description,
      methodId: this.selectedMethodOption,
    };

    if (this.newTipInfo.date) {
      newTip.date = new Date(this.newTipInfo.date);
    }

    if (this.newTipInfo.odd) {
      newTip.odd = Number(this.newTipInfo.odd);
    }

    if (this.selectedResultOption) {
      newTip.result = this.selectedResultOption;
    }

    return newTip;
  }

  deleteTip(id: string) {
    this.tips = this.tips.filter((tip) => tip.id !== id);
    this.tipService.delete(id).subscribe();
  }

  setTipToEdit(tip: Tip) {
    this.editTipInfo.id = tip.id;
    this.editTipInfo.description = tip.description;
    this.editTipInfo.odd = tip.odd ? tip.odd.toString() : '';
    this.editTipInfo.result = tip.result;
    this.editTipInfo.methodId = tip.method.id;
    let dateOfTip = new Date(tip.date);
    this.editTipInfo.date =
      dateOfTip.getFullYear() +
      '-' +
      (dateOfTip.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      dateOfTip.getDate().toString().padStart(2, '0');
  }

  saveEditTip() {
    let newTip = this.mapEditTipInfoToTipInput();
    this.tipService.put(this.editTipInfo.id, newTip).subscribe((res) => {
      this.tips = this.tips.map((tip) => {
        if (tip.id === res.id) {
          return res;
        }
        return tip;
      });
      this.editTipInfo.id = '';
      this.updateCriterioKellyInfo();
    });
  }

  mapEditTipInfoToTipInput(): TipInput {
    let newTip: TipInput = {
      description: this.editTipInfo.description,
      methodId: this.editTipInfo.methodId,
    };

    if (this.editTipInfo.date) {
      newTip.date = new Date(this.editTipInfo.date);
    }

    if (this.editTipInfo.odd) {
      newTip.odd = Number(this.editTipInfo.odd);
    }

    if (this.editTipInfo.result) {
      newTip.result = this.editTipInfo.result;
    }

    return newTip;
  }

  updateCriterioKellyInfo() {
    this.criterioKellyFromActualTips =
      this.criterioKellyService.getBasicCriterioKellyInfo(this.tips);
  }

  navigateToCalculator() {
    this.router.navigate(['/calculator'], {
      queryParams: {
        hitRate: parseFloat(
          (this.criterioKellyFromActualTips.percentageTipsWon * 100).toString()
        ).toFixed(2),
      },
    });
  }
}
