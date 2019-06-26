import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/table-builder';
import { MocksGenerator } from '@helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-seven',
    templateUrl: './sample-seven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSevenComponent implements OnInit, AfterViewInit {
    public data: TableRow[];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        MocksGenerator.generator(10000, 30).then((data: TableRow[]) => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }
}
