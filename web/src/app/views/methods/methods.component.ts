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

  newMethodFormInfo = {
    id: '',
    name: '',
    description: '',
  };

  filter = {
    name: '',
    description: '',
  };

  ngOnInit(): void {
    this.findMethods();
  }

  findMethods() {
    this.loader = true;
    this.methodService
      .get(this.filter.name, this.filter.description)
      .subscribe((res) => {
        this.methods = res;
        this.loader = false;
      });
  }

  submitMethodForm() {
    if (
      this.newMethodFormInfo.name === '' ||
      this.newMethodFormInfo.description === ''
    ) {
      /* trocar por toast... */
      alert('preencha todas as informacoes');
      return;
    }

    this.methodService.post(this.newMethodFormInfo).subscribe((newMethod) => {
      this.methods.unshift(newMethod);
      this.newMethodFormInfo = {
        id: '',
        name: '',
        description: '',
      };

      /* focus no insira o nome do metodo */
    });
  }
}
