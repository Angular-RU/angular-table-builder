import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';

import { ColumnsSchema, ImplicitContext, TableRow, ViewPortInfo } from '../../interfaces/table-builder.external';
import { trim } from '../../operators/trim';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent {
    @Input() public item: TableRow;
    @Input() public index: number;
    @Input() public parent: HTMLDivElement;
    @Input('is-filterable') public isFilterable: boolean;
    @Input('column-schema') public columnSchema: ColumnsSchema;
    @Input('enable-filtering') public enableFiltering: boolean;
    @Input('viewport-info') public viewportInfo: ViewPortInfo;
    public contextType: typeof ImplicitContext = ImplicitContext;
    private readonly timeIdle: number = 500;
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private frameId: number = null;
    private nodeSubscription: Subscription;
    private closeElemSub: Subscription;

    constructor(public readonly cd: ChangeDetectorRef, private readonly ngZone: NgZone) {
        this.cd.reattach();
    }

    private get overflowContentElem(): HTMLDivElement {
        return document.querySelector(`.${this.overflowSelector}`);
    }

    private get overflowCloseElem(): HTMLDivElement {
        return document.querySelector(`.overflow-close`);
    }

    private static checkOverflow(element: HTMLDivElement, parent: HTMLDivElement): boolean {
        return (
            element.offsetWidth > parent.offsetWidth ||
            element.offsetHeight > parent.offsetHeight ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight
        );
    }

    public mouseEnterCell(element: HTMLDivElement, event: MouseEvent): void {
        if (!this.columnSchema.overflowTooltip || this.viewportInfo.isScrolling) {
            return;
        }

        this.detectCheckOverflow(element, event);
    }

    public mouseLeaveCell(): void {
        if (!this.columnSchema.overflowTooltip || this.viewportInfo.isScrolling) {
            return;
        }

        clearInterval(this.frameId);
    }

    private detectCheckOverflow(element: HTMLDivElement, event: MouseEvent): void {
        clearInterval(this.frameId);
        this.ngZone.runOutsideAngular(() => {
            this.frameId = window.setTimeout(() => {
                const isOverflow: boolean = TableCellComponent.checkOverflow(element, this.parent);
                if (isOverflow && !this.viewportInfo.isScrolling) {
                    this.showTooltip(element, event);
                }
            }, this.timeIdle);
        });
    }

    private showTooltip(element: HTMLDivElement, event: MouseEvent): void {
        const empty: boolean = trim(element.innerText).length === 0;

        if (this.overflowContentElem || empty) {
            this.removeElement();
        }

        const elem: HTMLDivElement = document.createElement('div');
        elem.classList.add(this.overflowSelector);

        const left: number = event.clientX - 10;
        const top: number = event.clientY - 10;

        elem.style.cssText = `left: ${left}px; top: ${top}px`;

        document.body.appendChild(elem);
        const innerText = String(element.innerText || '').trim();
        this.overflowContentElem.innerHTML = `<div class="overflow-close"></div>${innerText}`;

        this.nodeSubscription = fromEvent(elem, 'mouseleave').subscribe(() => this.removeElement());
        this.closeElemSub = fromEvent(this.overflowCloseElem, 'click').subscribe(() => this.removeElement());

        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                this.overflowContentElem.classList.add('visible');
            }, TableBuilderOptionsImpl.TIME_IDLE);
        });
    }

    private removeElement(): void {
        this.overflowContentElem.classList.remove('visible');
        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                if (this.overflowContentElem) {
                    this.overflowContentElem.parentNode.removeChild(this.overflowContentElem);
                    this.nodeSubscription && this.nodeSubscription.unsubscribe();
                    this.closeElemSub && this.closeElemSub.unsubscribe();
                }
            }, TableBuilderOptionsImpl.TIME_IDLE);
        });
    }
}
