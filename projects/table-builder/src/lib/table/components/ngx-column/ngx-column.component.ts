import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';
import { ColumnOptions } from '../common/column-options';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxColumnComponent extends ColumnOptions {
    @Input() public key: string = null;
    @Input('custom-key') public customKey: boolean = false;
    @Input('sticky') public stickyLeft: boolean = false;
    @Input('important-template') public importantTemplate: boolean = false;
    @Input('sticky-end') public stickyRight: boolean = false;
    @Input('vertical-line') public verticalLine: boolean = false;
    @ContentChild(TemplateHeadThDirective, { static: false }) public th: TemplateHeadThDirective;
    @ContentChild(TemplateBodyTdDirective, { static: false }) public td: TemplateBodyTdDirective;
}
