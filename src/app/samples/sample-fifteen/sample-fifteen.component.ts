import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableRow, TableSchema } from '@angular-ru/table-builder';

import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { MatDialog } from '@angular/material';
import { MocksGenerator } from '@helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-fifteen',
    templateUrl: './sample-fifteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFifteenComponent implements OnInit, AfterViewInit {
    public data: TableRow[];
    constructor(public readonly dialog: MatDialog, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        MocksGenerator.generator(10000, 59).then((data: TableRow[]) => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public updatedSchema(event: Partial<TableSchema>): void {
        // tslint:disable-next-line:no-console
        console.log(event);
    }
}
