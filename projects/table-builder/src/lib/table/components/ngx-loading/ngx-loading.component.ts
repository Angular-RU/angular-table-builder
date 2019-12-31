import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ngx-loading',
    templateUrl: './ngx-loading.component.html',
    styleUrls: ['./ngx-loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxLoadingComponent {}
