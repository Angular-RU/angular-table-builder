import { Injectable, QueryList } from '@angular/core';

import { NgxColumnComponent } from '../../components/ngx-column/ngx-column.component';
import { TableSchema } from '../../interfaces/table-builder.external';
import { SchemaBuilder } from './schema-builder.class';

@Injectable()
export class TemplateParserService {
    public schema: TableSchema = new SchemaBuilder();

    public parse(modelKeys: string[], columns: QueryList<NgxColumnComponent>): void {
        columns.forEach((column: NgxColumnComponent) => {
            if (modelKeys.includes(column.key)) {
                this.extractColumnTemplate(column);
            }
        });
    }

    private extractColumnTemplate(column: NgxColumnComponent): void {
        const { key, th, td }: NgxColumnComponent = column;
        this.schema.columns[key] = {
            th: {
                template: th && th.template
            },
            td: {
                template: td && td.template
            }
        };
    }

    public get templateColumnKeys(): string[] {
        return Object.keys(this.schema.columns);
    }
}
