import { AfterViewInit, Directive, Input, NgZone, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({ selector: '[overflowTooltip]' })
export class OverflowTooltipDirective implements AfterViewInit, OnDestroy {
    @Input('overflowTooltip') public element: HTMLDivElement = null;
    @Input('parent') public parent: HTMLDivElement = null;
    @Input('text-center') public textCenter: boolean = null;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    /**
     * Minimal time before show tooltip
     */
    private readonly timeIdle: number = 500;
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private frameId: number = null;

    constructor(private ngZone: NgZone) {}

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
        fromEvent(this.element, 'mouseenter')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.detectCheckOverflow());
        fromEvent(this.element, 'mouseleave')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                clearInterval(this.frameId);
            });
    }

    /**
     * fix problem with memory leak
     */
    public ngOnDestroy(): void {
        clearInterval(this.frameId);
        this.removeElement();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.ngZone = null;
        this.element = null;
        this.parent = null;
        this.destroy$ = null;
    }

    private detectCheckOverflow(): void {
        clearInterval(this.frameId);
        this.ngZone.runOutsideAngular(() => {
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
        elem.classList.add(this.overflowSelector);

        if (this.textCenter) {
            elem.classList.add('text-center');
        }

        elem.style.cssText = `left: ${rect.left}px; top: ${rect.top}px`;
        document.body.appendChild(elem);

        this.ngZone.runOutsideAngular(() => {
            window.setTimeout(() => {
                if (this.overflowContentElem) {
                    this.overflowContentElem.classList.add('visible');
                    this.overflowContentElem.innerHTML = this.element.innerHTML.trim().replace(/<!--.*?-->/g, '');

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
