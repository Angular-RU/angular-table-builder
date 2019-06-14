import {
    ImplicitContext,
    TableCellOptions
} from '../../projects/table-builder/src/lib/table/interfaces/table-builder.external';
import { NgxColumnComponent } from '../../projects/table-builder/src/lib/table/components/ngx-column/ngx-column.component';
import { TemplateHeadThDirective } from '../../projects/table-builder/src/lib/table/directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../projects/table-builder/src/lib/table/directives/rows/template-body-td.directive';

export class FakeGeneratorTable {
    public static generateColumn(columnName: string): NgxColumnComponent {
        const column: NgxColumnComponent = new NgxColumnComponent();
        column.key = columnName;
        column.th = new TemplateHeadThDirective(null);
        column.td = new TemplateBodyTdDirective(null);
        return column;
    }

    public static generateCell(textBold: boolean = null, useDeepPath: boolean = false): TableCellOptions {
        return {
            template: null,
            context: ImplicitContext.CELL,
            nowrap: true,
            textBold,
            useDeepPath,
            style: null,
            class: null,
            height: null,
            width: null
        };
    }
}
