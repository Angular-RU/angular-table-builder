import { Directive, Input, TemplateRef } from '@angular/core';
import { TemplateCommon } from './template.common';

@Directive({ selector: 'ng-template[ngx-td]' })
export class TemplateBodyTdDirective extends TemplateCommon {
    @Input('ngx-td') public type: string = null;
    @Input('deep-path') public useDeepPath: boolean = null;
    constructor(public template: TemplateRef<unknown>) {
        super(template);
    }
}
