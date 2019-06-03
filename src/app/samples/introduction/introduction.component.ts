import { AfterViewInit, Component } from '@angular/core';
import { TableRow } from '@angular-ru/table-builder';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

declare const hljs: Any;

@Component({
    selector: 'introduction',
    templateUrl: './introduction.component.html'
})
export class IntroductionComponent implements AfterViewInit {
    public rowData: TableRow[] = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }
}
