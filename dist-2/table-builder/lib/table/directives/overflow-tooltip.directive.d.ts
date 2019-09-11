import { AfterViewInit, NgZone, OnDestroy } from '@angular/core';
export declare class OverflowTooltipDirective implements AfterViewInit, OnDestroy {
    private ngZone;
    element: HTMLDivElement;
    parent: HTMLDivElement;
    textCenter: boolean;
    private destroy$;
    /**
     * Minimal time before show tooltip
     */
    private readonly timeIdle;
    private readonly overflowSelector;
    private frameId;
    constructor(ngZone: NgZone);
    private readonly overflowContentElem;
    private static checkOverflow;
    ngAfterViewInit(): void;
    /**
     * fix problem with memory leak
     */
    ngOnDestroy(): void;
    private detectCheckOverflow;
    private showTooltip;
    private removeElement;
}
