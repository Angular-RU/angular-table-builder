import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { ColumnsSchema, ImplicitContext, TableRow, ViewPortInfo } from '../../interfaces/table-builder.external';
import { trim } from '../../operators/trim';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent implements OnDestroy {
    @Input() public item: TableRow;
    @Input() public index: number;
    @Input() public parent: HTMLDivElement;
    @Input('is-filterable') public isFilterable: boolean;
    @Input('column-schema') public columnSchema: ColumnsSchema;
    @Input('enable-filtering') public enableFiltering: boolean;
    @Input('viewport-info') public viewportInfo: ViewPortInfo;
    public contextType: typeof ImplicitContext = ImplicitContext;
    private readonly closeButtonSelector: string = 'table-close__button';
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private readonly timeIdle: number = 700;
    private nodeSubscription: Subscription;
    private closeElemSub: Subscription;
    private frameId: number = null;

    constructor(public readonly cd: ChangeDetectorRef, private readonly ngZone: NgZone) {
        this.cd.reattach();
    }

    private get overflowContentElem(): HTMLDivElement {
        return document.querySelector(`.${this.overflowSelector}`);
    }

    private get overflowCloseElem(): HTMLDivElement {
        return document.querySelector(`.${this.closeButtonSelector}`);
    }

    private get disableTooltip(): boolean {
        return this.viewportInfo.isScrolling || !this.columnSchema.overflowTooltip;
    }

    private static removeElementByRef(element: HTMLDivElement): void {
        element && element.parentNode && element.parentNode.removeChild(element);
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.frameId);
    }

    public mouseEnterCell(element: HTMLDivElement, event: MouseEvent): void {
        if (this.disableTooltip) {
            return;
        }

        this.detectCheckOverflow(element, event);
    }

    public mouseLeaveCell(): void {
        if (this.disableTooltip) {
            return;
        }

        window.clearInterval(this.frameId);
    }

    private isEllipsisActive(element: HTMLElement): boolean {
        const div = document.createElement('div');
        div.innerHTML = element.textContent;
        const fontSize: string = window.getComputedStyle(element).fontSize;
        div.style.cssText = `transform: translateX(-999999px);position: fixed; font-size: ${fontSize};`;

        document.body.appendChild(div);

        const isEllipsis: boolean =
            div.offsetWidth > this.parent.offsetWidth ||
            div.offsetHeight > this.parent.offsetHeight ||
            div.scrollWidth > element.offsetWidth ||
            div.scrollHeight > element.offsetHeight;

        TableCellComponent.removeElementByRef(div);

        return isEllipsis;
    }

    private detectCheckOverflow(element: HTMLDivElement, event: MouseEvent): void {
        window.clearInterval(this.frameId);
        this.ngZone.runOutsideAngular(() => {
            this.frameId = window.setTimeout(() => {
                const canEnableTooltip: boolean = this.viewportInfo.isScrolling
                    ? false
                    : this.isEllipsisActive(element);

                if (canEnableTooltip) {
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
        this.overflowContentElem.innerHTML = `<div class="${this.closeButtonSelector}"></div>${innerText}`;

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
