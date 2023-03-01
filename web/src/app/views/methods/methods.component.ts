import { Component, OnInit } from '@angular/core';
import { MethodService } from 'src/app/services/method/method.service';
import { Method } from 'src/app/services/method/method.types';

@Component({
  selector: 'app-methods',
  templateUrl: './methods.component.html',
  styleUrls: ['./methods.component.scss'],
})
export class MethodsComponent implements OnInit {
  constructor(private methodService: MethodService) {}

  loader = false;
  methods: Method[] = [];

  ngOnInit(): void {
    this.loader = true;
    this.methodService.get().subscribe((res) => {
      this.methods = res;
      this.loader = false;
    });
  }
}
