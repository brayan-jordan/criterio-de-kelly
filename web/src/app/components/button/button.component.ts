import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() text = '';
  @Input() icon = '';
  @Input() width = '100%';
  @Input() backgroundColor = 'transparent';
}
