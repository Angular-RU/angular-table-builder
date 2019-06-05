import { NgxColumnComponent } from '@angular-ru/table-builder';
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
}
