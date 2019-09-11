import { TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';
export declare class TemplateBodyTdDirective extends TemplateCellCommon {
    template: TemplateRef<unknown>;
    type: string;
    constructor(template: TemplateRef<unknown>);
}
