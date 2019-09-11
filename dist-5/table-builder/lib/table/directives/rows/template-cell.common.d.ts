import { EventEmitter, TemplateRef } from '@angular/core';
import { KeyMap } from '../../interfaces/table-builder.internal';
import { TableEvent } from '../../interfaces/table-builder.external';
export declare abstract class TemplateCellCommon {
    template: TemplateRef<unknown>;
    type: string;
    row: boolean;
    bold: boolean;
    nowrap: boolean;
    width: number;
    height: number;
    cssStyles: KeyMap;
    cssClasses: string | string[] | KeyMap;
    onClick: EventEmitter<TableEvent>;
    dblClick: EventEmitter<TableEvent>;
    protected constructor(template: TemplateRef<unknown>);
}
