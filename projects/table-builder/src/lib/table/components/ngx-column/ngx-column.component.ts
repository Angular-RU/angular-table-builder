import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { TemplateHeadThDirective } from '../../directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../directives/rows/template-body-td.directive';

@Component({
    selector: 'ngx-column',
    templateUrl: './ngx-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxColumnComponent {
    @Input() public key: string;
    @Input() public width: number;
    @Input('css-class') public cssClass: string[];
    @Input('css-style') public cssStyle: string[];
    @Input('sticky') public stickyLeft: boolean;
    @Input('sticky-end') public stickyRight: boolean;
    @Input('custom-key') public customKey: boolean = false;
    @ContentChild(TemplateHeadThDirective, { static: true }) public th: TemplateHeadThDirective;
    @ContentChild(TemplateBodyTdDirective, { static: true }) public td: TemplateBodyTdDirective;
}
