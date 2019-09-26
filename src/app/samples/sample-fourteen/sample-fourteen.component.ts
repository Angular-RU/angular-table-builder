import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { TableRow } from '@angular-ru/ng-table-builder';
import { MatDialog } from '@angular/material/dialog';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';
import { MocksGenerator } from '../../../../helpers/utils/mocks-generator';

declare const hljs: Any;

// noinspection CssUnusedSymbol
@Component({
    selector: 'sample-fourteen',
    templateUrl: './sample-fourteen.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            .my-filter {
                padding: 10px 5px 10px 5px;
            }

            .my-filter .mat-form-field {
                width: 100%;
            }

            .my-filter .filter-form {
                display: flex;
            }

            .my-filter .filter-options.mat-form-field {
                margin-right: 0;
            }

            .my-filter .filter-options {
                width: 40%;
            }

            .my-filter .mat-form-field-appearance-outline .mat-form-field-wrapper {
                margin-bottom: 0;
                padding: 2px 0;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFourteenComponent implements OnInit, AfterViewInit {
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

    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Overview selection table',
                description:
                    'In order to use the API for string highlighting, you can use the table.selection service. <br>' +
                    'In more detail you can read in the guide.',
                code: `
<ngx-table-builder #table [source]="data" [enable-selection]="true">
    <ngx-column key="selection" [sticky]="true" width="55" custom-key>
        <ng-template ngx-th>
            <mat-checkbox
                (change)="table.selection.toggleAll(data)"
                [indeterminate]="table.selectionModel.isIndeterminate"
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
