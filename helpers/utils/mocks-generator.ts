import { EventEmitter } from '@angular/core';
import {
    ImplicitContext,
    TableCellOptions
} from '../../projects/table-builder/src/lib/table/interfaces/table-builder.external';
import { NgxColumnComponent } from '../../projects/table-builder/src/lib/table/components/ngx-column/ngx-column.component';
import { TemplateHeadThDirective } from '../../projects/table-builder/src/lib/table/directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../projects/table-builder/src/lib/table/directives/rows/template-body-td.directive';

export class MocksGenerator {
    public static generateColumn(columnName: string): NgxColumnComponent {
        const column: NgxColumnComponent = new NgxColumnComponent();
        column.key = columnName;
        column.th = new TemplateHeadThDirective(null);
        column.td = new TemplateBodyTdDirective(null);
        return column;
    }

    public static generateCell(textBold: boolean = null, useDeepPath: boolean = false): TableCellOptions {
        return {
            template: null,
            context: ImplicitContext.CELL,
            nowrap: true,
            textBold,
            useDeepPath,
            style: null,
            class: null,
            height: null,
            width: null,
            onClick: new EventEmitter<TableCellOptions>()
        };
    }

    public static dispatchMouseEvent(type: string, x: number, y: number): MouseEvent {
        const mouseMoveEvent: MouseEvent = document.createEvent('MouseEvents');

        mouseMoveEvent.initMouseEvent(
            type, // event type : click, mousedown, mouseup, mouseover, mousemove, mouseout.
            true, // canBubble
            false, // cancelable
            window, // event's AbstractView : should be window
            1, // detail : Event's mouse click count
            x, // screenX
            y, // screenY
            x, // clientX
            y, // clientY
            false, // ctrlKey
            false, // altKey
            false, // shiftKey
            false, // metaKey
            0, // button : 0 = click, 1 = middle button, 2 = right button
            null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout).
            // In other cases, pass null.
        );

        (mouseMoveEvent as any)['pageX'] = x;

        document.dispatchEvent(mouseMoveEvent);

        return mouseMoveEvent;
    }
}
