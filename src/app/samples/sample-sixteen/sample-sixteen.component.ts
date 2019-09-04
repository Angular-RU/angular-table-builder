import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
    ColumnsSchema,
    NgxTableViewChangesService,
    SimpleSchemaColumns,
    TableRow,
    TableUpdateSchema
} from '@angular-ru/table-builder';

import { Any, DeepPartial } from '../../../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';
import { MatDialog } from '@angular/material';
import { MocksGenerator } from '@helpers/utils/mocks-generator';
import { Subscription } from 'rxjs';

declare const hljs: Any;

@Component({
    selector: 'sample-sixteen',
    templateUrl: './sample-sixteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSixteenComponent implements OnInit, AfterViewInit, OnDestroy {
    public data: TableRow[];
    public schema: SimpleSchemaColumns = null;
    public readonly testName: string = 'test';
    private sub: Subscription;

    constructor(
        public readonly dialog: MatDialog,
        private readonly cd: ChangeDetectorRef,
        private readonly tableChanges: NgxTableViewChangesService
    ) {}

    public ngOnInit(): void {
        const schema: TableUpdateSchema =
            (JSON.parse(window.localStorage.getItem(this.testName)) as TableUpdateSchema) || null;
        this.schema = schema && schema.columns;

        MocksGenerator.generator(1000, 59).then((data: TableRow[]) => {
            this.data = data;
            this.cd.detectChanges();
        });

        this.sub = this.tableChanges.events.subscribe((event: TableUpdateSchema) => this.save(event));
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any) => {
            hljs.highlightBlock(block);
        });
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private save(event: TableUpdateSchema): void {
        // tslint:disable-next-line:no-console
        console.log(event); // NOSONAR
        window.localStorage.setItem(this.testName, JSON.stringify(event));
        this.schema = [...event.columns];
        this.cd.detectChanges();
    }
}
