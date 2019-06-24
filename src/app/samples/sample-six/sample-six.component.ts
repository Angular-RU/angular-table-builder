import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/table-builder';
import { FakeGenerator } from '../../shared/fake-generator.class';
import { MatDialog } from '@angular/material';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

declare const hljs: Any;

@Component({
    selector: 'sample-six',
    templateUrl: './sample-six.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            .show-simple {
                position: absolute;
                right: 0;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSixComponent implements OnInit, AfterViewInit {
    public data: TableRow[];
    constructor(public readonly dialog: MatDialog) {}

    public ngOnInit(): void {
        this.data = FakeGenerator.generateTable(10000, 50);
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview sortable table',
                description: '',
                code: `
<ngx-table-builder [source]="data" [auto-height]="true">
    <!--
       <ngx-options /> - declaration common options for columns

       Also you can customize your columns manually
       <ngx-column key="myKey" [sortable]="'desc'">...</ngx-column>
    -->
    <ngx-options [sortable]="'asc'"></ngx-options>
</ngx-table-builder>

                `
            },
            height: '350px',
            width: '700px'
        });
    }
}
