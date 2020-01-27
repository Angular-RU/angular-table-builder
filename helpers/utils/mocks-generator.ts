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

    public static generator(rowsNumber: number, colsNumber: number, startIndex: number = 0): Promise<TableRow[]> {
        return new WebWorkerThreadService().run<TableRow[], Any>(
            (data: Any): TableRow[] => {
                class FakeGenerator {
                    public static generateTable(rows: number, cols: number, start: number): TableRow[] {
                        return new Array(rows).fill(0).map((_: unknown, index: number) => {
                            const idx: number = start + index + 1;

                            const baseRow: TableRow = {
                                id: idx,
                                reverseId: Math.round(Math.random() + rows * 512 + cols + start * 10) * 1024,
                                name: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                                description: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                                guid: '5cdae5b2ba0a57f709b72142' + '__' + idx
                            };

                            const random = (min: number, max: number) => min + Math.random() * (max - min);

                            if (cols > 6) {
                                baseRow['About Big Text And More Powerful Label Fugiat Tempor Sunt Nostrud'] = [
                                    ...Array(Math.ceil(random(0, 1000)))
                                ]
                                    .map((i) => (~~(Math.random() * 36)).toString(36))
                                    .join('');

                                for (let i: number = 6; i <= cols - 1; i++) {
                                    baseRow['column-' + i] = `$row-${idx} $col-${i}`;
                                }
                            }

                            return baseRow;
                        });
                    }
                }

                return FakeGenerator.generateTable(data.rows, data.cols, data.start);
            },
            { rows: rowsNumber, cols: colsNumber, start: startIndex }
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
            type, // events type : emitClick, mousedown, mouseup, mouseover, mousemove, mouseout.
            true, // canBubble
            false, // cancelable
            window, // events's AbstractView : should be window
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
            null // relatedTarget : Only used with some events types (e.g. mouseover and mouseout).
            // In other cases, pass null.
        );

        (mouseMoveEvent as any)['pageX'] = x;

        document.dispatchEvent(mouseMoveEvent);

        return mouseMoveEvent;
    }
}
