import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';

@Directive({ selector: 'ng-template[ngx-td]' })
export class TemplateBodyTdDirective extends TemplateCellCommon {
    @Input('ngx-td') public type: string = null;
    constructor(public template: TemplateRef<unknown>) {
        super(template);
    }
}
