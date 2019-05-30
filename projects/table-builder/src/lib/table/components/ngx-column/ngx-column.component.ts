import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html'
})
export class NgxColumnComponent {
    @Input() public key: string;
}
