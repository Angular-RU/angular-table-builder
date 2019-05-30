import { Injectable, QueryList } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { TableSchema } from '../../interfaces/table-builder.external';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema = new SchemaBuilder();

    public parse(columns: QueryList<NgxColumnComponent>): void {
        columns.forEach((column: NgxColumnComponent) => this.extractColumnTemplate(column));
    }

    private extractColumnTemplate(column: NgxColumnComponent): void {
        const { key }: NgxColumnComponent = column;
        this.schema.columns[key] = {
            th: {
                template: null
            },
            td: {
                template: null
            }
        };

        console.log(this.schema);
    }

    public get templateColumnKeys(): string[] {
        return Object.keys(this.schema.columns);
    }
}
