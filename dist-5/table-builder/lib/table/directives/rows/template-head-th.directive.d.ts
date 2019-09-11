import { TemplateRef } from '@angular/core';
import { TemplateCellCommon } from './template-cell.common';
export declare class TemplateHeadThDirective extends TemplateCellCommon {
    template: TemplateRef<unknown>;
    type: string;
    nowrap: boolean;
    constructor(template: TemplateRef<unknown>);
}
