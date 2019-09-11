import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../common/column-options';
export declare class NgxColumnComponent extends ColumnOptions {
    key: string;
    stickyLeft: boolean;
    emptyHead: boolean;
    headTitle: string;
    customKey: boolean;
    importantTemplate: boolean;
    stickyRight: boolean;
    verticalLine: boolean;
    th: TemplateHeadThDirective;
    td: TemplateBodyTdDirective;
    withKey(key: string): NgxColumnComponent;
}
