import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableRow, TableSchema } from '@angular-ru/table-builder';

import { Any } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { MatDialog } from '@angular/material';
import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { HttpClient } from '@angular/common/http';

declare const hljs: Any;

@Component({
    selector: 'sample-sixteen',
    templateUrl: './sample-sixteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSixteenComponent implements OnInit, AfterViewInit {
    public data: TableRow[];
    public schema: TableSchema = null;

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly http: HttpClient
    ) {}

    public ngOnInit(): void {
        const tableName: string = 'test';
        this.http
            .get(`http://10.219.177.131:8102/settings?tableName=${tableName}&username=m.ivanov4`)
            .subscribe((response: any) => {
                this.schema = JSON.parse(response.settings);
                console.log(this.schema);
                this.cd.detectChanges();
            });

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

        this.http
            .post(`http://10.219.177.131:8102/settings`, {
                username: 'm.ivanov4',
                tableName: 'test',
                settings: JSON.stringify(event)
            })
            .subscribe((e) => console.log(e));
    }
}
