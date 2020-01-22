import {
    AfterContentInit,
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
import { detectChanges } from '../../operators/detect-changes';

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent implements AfterContentInit, OnDestroy {
    @Input() public item: TableRow;
    @Input() public index: number;
    @Input() public parent: HTMLDivElement;
    @Input() public isRendered: boolean;
    @Input('is-filterable') public isFilterable: boolean;
    @Input('column-schema') public columnSchema: ColumnsSchema;
    @Input('enable-filtering') public enableFiltering: boolean;
    @Input('viewport-info') public viewportInfo: ViewPortInfo;
    public loaded: boolean = null;
    public contextType: typeof ImplicitContext = ImplicitContext;
    private readonly closeButtonSelector: string = 'table-close__button';
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private readonly timeIdle: number = 1500;
    private nodeSubscription: Subscription;
    private closeElemSub: Subscription;
    private timeoutShowedFrameId: number = null;
    private timeoutOverflowId: number = null;
    private frameLoadedId: number = null;

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

    public ngAfterContentInit(): void {
        if (!this.loaded) {
            this.frameLoadedId = window.requestAnimationFrame(() => {
                this.loaded = true;
                detectChanges(this.cd);
            });
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.timeoutOverflowId);
        window.clearTimeout(this.timeoutShowedFrameId);
        window.cancelAnimationFrame(this.frameLoadedId);
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

        window.clearInterval(this.timeoutShowedFrameId);
    }

    private isEllipsisActive(element: HTMLElement): boolean {
        return (
            element.offsetWidth > this.parent.offsetWidth ||
            element.offsetHeight > this.parent.offsetHeight ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight
        );
    }

    private detectCheckOverflow(element: HTMLDivElement, event: MouseEvent): void {
        window.clearInterval(this.timeoutShowedFrameId);
        this.ngZone.runOutsideAngular(() => {
            this.timeoutShowedFrameId = window.setTimeout(() => {
                const canEnableTooltip: boolean = this.viewportInfo.isScrolling
                    ? false
                    : this.isEllipsisActive(element);

                if (canEnableTooltip) {
                    this.removeElement();
                    this.showTooltip(element, event);
                }
            }, this.timeIdle);
        });
    }

    private showTooltip(element: HTMLDivElement, event: MouseEvent): void {
        const empty: boolean = trim(element.innerText).length === 0;

        if (empty) {
            this.removeElement();
        }

        const elem: HTMLDivElement = document.createElement('div');
        elem.classList.add(this.overflowSelector);

        const left: number = event.clientX - 15;
        const top: number = event.clientY - 15;

        elem.style.cssText = `left: ${left}px; top: ${top}px`;

        document.body.appendChild(elem);
        const innerText = String(element.innerText || '').trim();
        this.overflowContentElem.innerHTML = `<div class="${this.closeButtonSelector}"></div>${innerText}`;

        this.nodeSubscription = fromEvent(elem, 'mouseleave').subscribe(() => this.removeElement());
        this.closeElemSub = fromEvent(this.overflowCloseElem, 'click').subscribe(() => this.removeElement());

        this.ngZone.runOutsideAngular(() => {
            this.timeoutOverflowId = window.setTimeout(() => {
                if (this.viewportInfo.isScrolling) {
                    this.removeElement();
                } else {
                    this.overflowContentElem.classList.add('visible');
                }
            }, TableBuilderOptionsImpl.TIME_IDLE);
        });
    }

    private removeElement(): void {
        if (this.overflowContentElem) {
            this.overflowContentElem.classList.remove('visible');
            this.ngZone.runOutsideAngular(() => {
                window.setTimeout(() => {
                    this.overflowContentElem.parentNode.removeChild(this.overflowContentElem);
                    this.nodeSubscription && this.nodeSubscription.unsubscribe();
                    this.closeElemSub && this.closeElemSub.unsubscribe();
                }, TableBuilderOptionsImpl.TIME_IDLE);
            });
        }
    }
}
