import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriterioKellyService } from 'src/app/services/criterio-kelly/criterio-kelly.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  constructor(
    private criterioKellyService: CriterioKellyService,
    private route: ActivatedRoute
  ) {}

  odd = '';
  hitRate = '';
  percentageToBet = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.hitRate = params['hitRate'];
      this.calculate();
    });
  }

  calculate() {
    if (this.odd && this.hitRate) {
      this.percentageToBet = this.criterioKellyService.calculateKellyCriterion(
        parseFloat(this.odd),
        parseFloat(this.hitRate)
      );
    } else {
      this.percentageToBet = 0;
    }
  }
}
