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

  formInfo = {
    id: '',
    name: '',
    description: '',
  };

  ngOnInit(): void {
    this.loader = true;
    this.methodService.get().subscribe((res) => {
      this.methods = res;
      this.loader = false;
    });
  }

  submitMethodForm() {
    if (this.formInfo.name === '' || this.formInfo.description === '') {
      /* trocar por toast... */
      alert('preencha todas as informacoes');
      return;
    }

    this.methodService.post(this.formInfo).subscribe((newMethod) => {
      this.methods.push(newMethod);
      this.formInfo = {
        id: '',
        name: '',
        description: '',
      };
      /* focus no insira o nome do metodo */
    });
  }
}
