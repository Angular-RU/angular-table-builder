import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { SimpleSchemaColumns, TableRow } from '@angular-ru/table-builder';
import { MatDialog } from '@angular/material/dialog';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';
import { MocksGenerator } from '@helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-five',
    templateUrl: './sample-five.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFiveComponent implements OnInit, AfterViewInit {
    public data: TableRow[];
    constructor(public readonly dialog: MatDialog, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        MocksGenerator.generator(1000, 30).then((data: TableRow[]) => {
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
                title: 'Overview resizable table',
                description: '',
                code: `
<ngx-table-builder [source]="data">
    <!--
       <ngx-options /> - declaration common options for columns

       Also you can customize your columns manually
       <ngx-column key="myKey" [resizable]="true">...</ngx-column>
    -->
    <ngx-options [resizable]="true"></ngx-options>
</ngx-table-builder>

                `
            },
            height: '350px',
            width: '700px'
        });
    }

    public updatedSchema(event: SimpleSchemaColumns): void {
        // tslint:disable-next-line:no-console
        console.log(event);
    }
}
