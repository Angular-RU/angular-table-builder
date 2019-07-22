import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableEvent, TableRow } from '@angular-ru/table-builder';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { ToastrService } from 'ngx-toastr';

declare const hljs: Any;

@Component({
    selector: 'sample-thirteen',
    templateUrl: './sample-thirteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SampleThirteenComponent implements AfterViewInit {
    public data: TableRow[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199
        }
    ];

    constructor(private toast: ToastrService) {}

    public ngAfterViewInit(): void {
        this.update();
    }

    public update(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public rowOnClick(event: TableEvent): void {
        this.toast.success(JSON.stringify(event, null, 4), 'OnClick', { timeOut: 2000, onActivateTick: true });
    }

    public rowDblClick(event: TableEvent): void {
        this.toast.success(JSON.stringify(event, null, 4), 'DblClick', { timeOut: 2000, onActivateTick: true });
    }
}
