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
}
