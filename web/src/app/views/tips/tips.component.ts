import { Component } from '@angular/core';
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
    private methodService: MethodService
  ) {}

  loader = false;
  tips: Tip[] = [];

  resultsOptions = ['GREEN', 'RED'];
  selectedResultOption: any = '';

  methodsOptions: Method[] = [];
  selectedMethodOption = '';

  newTipInfo = {
    date: '',
    description: '',
    odd: '',
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
    this.tipService.get().subscribe((res) => {
      this.tips = res;
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
}
