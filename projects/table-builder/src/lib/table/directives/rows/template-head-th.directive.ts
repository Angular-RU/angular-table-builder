import { Directive, Input, TemplateRef } from '@angular/core';

import { Any } from '../../interfaces/table-builder.internal';
import { TemplateCellCommon } from './template-cell.common';

@Directive({ selector: 'ng-template[ngx-th]' })
export class TemplateHeadThDirective extends TemplateCellCommon {
    @Input('ngx-th') public type: string = null;
    public nowrap: boolean = false;

    constructor(public template: TemplateRef<Any>) {
        super(template);
        this.bold = true;
    }
}
