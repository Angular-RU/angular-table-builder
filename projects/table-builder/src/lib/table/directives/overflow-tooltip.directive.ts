import { AfterViewInit, Directive, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OverloadScrollService } from '../services/overload-scroll/overload-scroll.service';

@Directive({ selector: '[overflowTooltip]' })
export class OverflowTooltipDirective implements OnInit, AfterViewInit, OnDestroy {
    @Input('overflowTooltip') public element: HTMLDivElement = null;
    @Input('parent') public parent: HTMLDivElement = null;
    @Input('text-center') public textCenter: boolean = null;
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private canBindMouseEvent: boolean = true;

    /**
     * Minimal time before show tooltip
     */
    private readonly timeIdle: number = 500;
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private frameId: number = null;

    constructor(private overload: OverloadScrollService, private ngZone: NgZone) {}

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

    public ngOnInit(): void {
        this.overload.scrollDelta.pipe(takeUntil(this.destroy$)).subscribe((delta: number) => {
            if (delta > OverloadScrollService.MIN_DELTA) {
                this.canBindMouseEvent = false;
            }
        });
    }

    public ngAfterViewInit(): void {
        if (this.canBindMouseEvent) {
            fromEvent(this.element, 'mouseenter')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.detectCheckOverflow());
            fromEvent(this.element, 'mouseleave')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    clearInterval(this.frameId);
                });
        }
    }

    /**
     * fix problem with memory leak
     */
    public ngOnDestroy(): void {
        clearInterval(this.frameId);
        this.removeElement();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.overload = null;
        this.ngZone = null;
        this.element = null;
        this.parent = null;
        this.destroy$ = null;
    }

    private detectCheckOverflow(): void {
        clearInterval(this.frameId);
        this.ngZone.runOutsideAngular(() => {
            this.frameId = window.setTimeout(() => {
                if (!this.overload) {
                    return;
                }

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

        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                if (this.overflowContentElem) {
                    this.overflowContentElem.classList.add('visible');
                    this.overflowContentElem.innerHTML = this.element.innerHTML;

                    fromEvent(this.overflowContentElem, 'mouseleave')
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => this.removeElement());
                }
            });
        });
    }

    private removeElement(): void {
        if (this.overflowContentElem) {
            this.overflowContentElem.parentNode.removeChild(this.overflowContentElem);
        }
    }
}
