import { Injectable } from '@angular/core';
import { fromEvent, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { Fn } from '../../interfaces/table-builder.internal';

const { COLUMN_RESIZE_MIN_WIDTH }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

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

    // eslint-disable-next-line max-params
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
