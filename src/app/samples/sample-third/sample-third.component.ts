import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/table-builder';
import { FakeGenerator } from '../../shared/fake-generator.class';
import { MatDialog } from '@angular/material';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

declare const hljs: Any;

@Component({
    selector: 'sample-third',
    templateUrl: './sample-third.component.html',
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
export class SampleThirdComponent implements OnInit, AfterViewInit {
    public data: TableRow[];
    constructor(public readonly dialog: MatDialog) {}

    public ngOnInit(): void {
        this.data = FakeGenerator.generateTable(1000, 59);
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview selection table',
                description:
                    'In order to use the API for string highlighting, you can use the table.selection service. <br>' +
                    'In more detail you can read in the guide.',
                code: `
<ngx-table-builder #table [source]="data" [auto-height]="true" [enable-selection]="true">
    <ngx-column key="selection" [sticky]="true" width="55" custom-key>
        <ng-template ngx-th>
            <mat-checkbox
                (change)="table.selection.toggleAll(data)"
                [indeterminate]="table.selectionModel.hasValue() && !table.selectionModel.isAll"
                [checked]="table.selectionModel.isAll"
            ></mat-checkbox>
        </ng-template>
        <ng-template ngx-td [row]="true" let-row (onClick)="$event.preventDefault()">
            <mat-checkbox
                [checked]="table.selectionModel.get($any(row).id)"
                (change)="table.selection.toggle(row)"
            ></mat-checkbox>
        </ng-template>
    </ngx-column>

    <ngx-column *ngFor="let key of table.modelColumnKeys" [key]="key">
       <!--
        If you want to parameterize your templates, you can describe the code here.
        <ng-template ngx-th>{{ key }}</ng-template>
        <ng-template ngx-td let-cell>{{ cell }}</ng-template>
       -->
    </ngx-column>
</ngx-table-builder>
                    `
            },
            height: '650px',
            width: '900px'
        });
    }
}
