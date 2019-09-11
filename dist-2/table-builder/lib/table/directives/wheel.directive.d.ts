import { EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { OverloadScrollService } from '../services/overload-scroll/overload-scroll.service';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
export declare class WheelThrottlingDirective implements OnInit, OnDestroy {
    private readonly options;
    private readonly ngZone;
    private readonly overload;
    wheelThrottling: HTMLDivElement;
    scrollOffset: EventEmitter<boolean>;
    scrollTopOffset: boolean;
    isScrolling: number;
    private scrolling;
    private subscription;
    constructor(options: TableBuilderOptionsImpl, ngZone: NgZone, overload: OverloadScrollService);
    private readonly element;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Correct works only Chrome
     * @param $event
     */
    onElementScroll($event: WheelEvent): void;
    private scrollStart;
    private scrollEnd;
}
