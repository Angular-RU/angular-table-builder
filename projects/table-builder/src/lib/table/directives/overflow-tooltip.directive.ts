import { AfterViewInit, Directive, Input, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { TableBuilderOptionsImpl } from '../config/table-builder-options';

@Directive({ selector: '[overflowTooltip]' })
export class OverflowTooltipDirective implements AfterViewInit, OnDestroy {
    @Input('overflowTooltip') public element: HTMLDivElement = null;
    @Input('parent') public parent: HTMLDivElement = null;
    @Input('text-center') public textCenter: boolean = null;
    private subscriptions: Subscription[] = [];

    /**
     * Minimal time before show tooltip
     */
    private readonly timeIdle: number = 500;
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private mainTask: number = null;
    private frameId: number = null;

    constructor(private readonly ngZone: NgZone) {}

    private get overflowContentElem(): HTMLDivElement {
        return document.querySelector(`.${this.overflowSelector}`);
    }

    private static checkOverflow(element: HTMLDivElement, parent: HTMLDivElement): boolean {
        return (
            element.offsetWidth > parent.offsetWidth ||
            element.offsetHeight > parent.offsetHeight ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight
        );
    }

    public ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.mainTask = window.setTimeout(() => {
                const mouseenter: Subscription = fromEvent(this.element, 'mouseenter').subscribe(() =>
                    this.detectCheckOverflow()
                );
                const mouseleave: Subscription = fromEvent(this.element, 'mouseleave').subscribe(() => {
                    clearInterval(this.frameId);
                });

                this.subscriptions = [mouseenter, mouseleave];
            }, TableBuilderOptionsImpl.TIME_RELOAD);
        });
    }

    public ngOnDestroy(): void {
        clearInterval(this.mainTask);
        clearInterval(this.frameId);
        this.removeElement();
        for (const subscription of this.subscriptions) {
            if (!subscription.closed) {
                subscription.unsubscribe();
            }
        }
    }

    private detectCheckOverflow(): void {
        this.ngZone.runOutsideAngular(() => {
            clearInterval(this.frameId);
            this.frameId = window.setTimeout(() => {
                const isOverflow: boolean = OverflowTooltipDirective.checkOverflow(this.element, this.parent);
                if (isOverflow) {
                    this.showTooltip();
                }
            }, this.timeIdle);
        });
    }

    private showTooltip(): void {
        if (this.overflowContentElem) {
            this.removeElement();
            return;
        }

        const elem: HTMLDivElement = document.createElement('div');
        const rect: ClientRect | DOMRect = this.element.getBoundingClientRect();
        elem.classList.add(this.overflowSelector, this.textCenter ? 'text-center' : null);
        elem.style.cssText = `left: ${rect.left}px; top: ${rect.top}px`;
        document.body.appendChild(elem);

        const overflowEvents: Subscription = fromEvent(this.overflowContentElem, 'mouseleave').subscribe(() => {
            this.removeElement();
            if (!overflowEvents.closed) {
                overflowEvents.unsubscribe();
            }
        });

        this.subscriptions.push(overflowEvents);

        window.setTimeout(() => {
            this.overflowContentElem.classList.add('visible');
            this.overflowContentElem.innerText = this.element.innerText;
        });
    }

    private removeElement(): void {
        if (this.overflowContentElem) {
            this.overflowContentElem.parentNode.removeChild(this.overflowContentElem);
        }
    }
}
