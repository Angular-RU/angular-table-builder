import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCommon } from './template.common';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective extends TemplateCommon {
    @Input('ngx-th') public type: string = null;
    constructor(public template: TemplateRef<unknown>) {
        super(template);
        this.bold = true;
    }
}
