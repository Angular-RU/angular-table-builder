import { AfterViewInit, Component } from '@angular/core';
import { TableRow } from '@angular-ru/table-builder';

declare const hljs: any;

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
        document.querySelectorAll('pre code').forEach((block: any) => {
            hljs.highlightBlock(block);
        });
    }
}
