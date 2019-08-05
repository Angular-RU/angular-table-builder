import { EventEmitter } from '@angular/core';
import {
    ImplicitContext,
    TableCellOptions,
    TableRow
} from '../../projects/table-builder/src/lib/table/interfaces/table-builder.external';
import { NgxColumnComponent } from '../../projects/table-builder/src/lib/table/components/ngx-column/ngx-column.component';
import { TemplateHeadThDirective } from '../../projects/table-builder/src/lib/table/directives/rows/template-head-th.directive';
import { TemplateBodyTdDirective } from '../../projects/table-builder/src/lib/table/directives/rows/template-body-td.directive';
import { WebWorkerThreadService } from '../../projects/table-builder/src/lib/table/worker/worker-thread.service';
import { Any } from '../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

export class MocksGenerator {
    public static generateColumn(columnName: string): NgxColumnComponent {
        const column: NgxColumnComponent = new NgxColumnComponent();
        column.key = columnName;
        column.th = new TemplateHeadThDirective(null);
        column.td = new TemplateBodyTdDirective(null);
        return column;
    }

    public static generator(rowsNumber: number, colsNumber: number): Promise<TableRow[]> {
        return new WebWorkerThreadService().run<TableRow[], Any>(
            (data: Any): TableRow[] => {
                class FakeGenerator {
                    public static generateTable(rows: number, cols: number): TableRow[] {
                        return new Array(rows).fill(0).map((_: unknown, index: number) => {
                            const idx: number = index;

                            const baseRow: TableRow = {
                                id: idx,
                                reverseId: Math.round(Math.random() * rows),
                                name: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                                description: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                                guid: '5cdae5b2ba0a57f709b72142' + '__' + idx,
                                ['About Big Text And More Powerful Label Fugiat Tempor Sunt Nostrud']:
                                    'Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa' +
                                    ' consectetur veniam Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis' +
                                    ' incididunt culpa consectetur veniam. Fugiat tempor sunt nostrud ad fugiat.' +
                                    ' Laboris velit duis incididunt culpa consectetur veniam'
                            };

                            if (cols > 5) {
                                for (let i: number = 6; i <= cols; i++) {
                                    baseRow['column-' + i] = `$row-${idx} $col-${i}`;
                                }
                            }

                            return baseRow;
                        });
                    }
                }

                return FakeGenerator.generateTable(data.rows, data.cols);
            },
            { rows: rowsNumber, cols: colsNumber }
        );
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
            onClick: new EventEmitter<TableCellOptions>(),
            dblClick: new EventEmitter<TableCellOptions>()
        };
    }

    public static dispatchMouseEvent(type: string, x: number, y: number): MouseEvent {
        const mouseMoveEvent: MouseEvent = document.createEvent('MouseEvents');

        mouseMoveEvent.initMouseEvent(
            type, // event type : emitClick, mousedown, mouseup, mouseover, mousemove, mouseout.
            true, // canBubble
            false, // cancelable
            window, // event's AbstractView : should be window
            1, // detail : Event's mouse emitClick count
            x, // screenX
            y, // screenY
            x, // clientX
            y, // clientY
            false, // ctrlKey
            false, // altKey
            false, // shiftKey
            false, // metaKey
            0, // button : 0 = emitClick, 1 = middle button, 2 = right button
            null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout).
            // In other cases, pass null.
        );

        (mouseMoveEvent as any)['pageX'] = x;

        document.dispatchEvent(mouseMoveEvent);

        return mouseMoveEvent;
    }
}
