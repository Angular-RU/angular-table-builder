import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective extends TemplateCellCommon {
    @Input('ngx-th') public type: string = null;

    constructor(public template: TemplateRef<unknown>) {
        super(template);
        this.bold = true;
    }
}
