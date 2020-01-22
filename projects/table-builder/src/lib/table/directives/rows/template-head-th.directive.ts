import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';
import { Any } from '../../interfaces/table-builder.internal';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective extends TemplateCellCommon {
    @Input('ngx-th') public type: string = null;
    public nowrap: boolean = false;

    constructor(public template: TemplateRef<Any>) {
        super(template);
        this.bold = true;
    }
}
