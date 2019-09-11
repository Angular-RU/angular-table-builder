import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy } from '@angular/core';
export declare class ObserverViewDirective implements AfterViewInit, OnDestroy {
    private element;
    private readonly ngZone;
    private static readonly MIN_TIME_IDLE;
    observeVisible: EventEmitter<boolean>;
    isRendered: boolean;
    private observer;
    private previousRation;
    private frameId;
    constructor(element: ElementRef, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
