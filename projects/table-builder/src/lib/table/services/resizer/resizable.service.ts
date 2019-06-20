import { Injectable } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Fn } from '../../interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';

const { COLUMN_RESIZE_MIN_WIDTH }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Injectable()
export class ResizableService {
    public startX: number;
    public startWidth: number;
    private destroyed$: ReplaySubject<boolean>;

    private static clearSelection(): void {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document['selection']) {
            document['selection'].empty();
        }
    }

    public resize(event: MouseEvent, column: HTMLElement, mousemove: Fn, mouseup: Fn): void {
        this.destroyed$ = new ReplaySubject(1);
        this.startX = event.pageX;
        this.startWidth = column.offsetWidth;

        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((e: MouseEvent) => this.computeEvent(e, mousemove));

        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((e: MouseEvent) => this.unsubscribe(e, mouseup));
    }

    private computeEvent(event: MouseEvent, mousemove: Fn): void {
        ResizableService.clearSelection();
        const width: number = this.startWidth + (event.pageX - this.startX);
        if (width >= COLUMN_RESIZE_MIN_WIDTH) {
            mousemove(width);
        }
    }

    private unsubscribe(event: MouseEvent, mouseup: Fn): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        mouseup(event);
    }
}
