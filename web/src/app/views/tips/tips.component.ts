import { Component } from '@angular/core';
import { TipService } from 'src/app/services/tip/tip.service';
import { Tip } from 'src/app/services/tip/tip.types';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  constructor(private tipService: TipService) {}

  loader = false;
  tips: Tip[] = [];

  ngOnInit(): void {
    this.loader = true;
    this.tipService.get().subscribe((res) => {
      this.tips = res;
      this.loader = false;
    });
  }
}
