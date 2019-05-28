import { Directive, ElementRef, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { WHEEL_MAX_DELTA } from '../../table-builder.tokens';

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    constructor(
        @Inject(WHEEL_MAX_DELTA) private readonly maxDelta: number,
        private readonly elementRef: ElementRef,
        private readonly ngZone: NgZone
    ) {}

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.element.addEventListener('wheel', this.onElementScroll.bind(this), true);
        });
    }

    public ngOnDestroy(): void {
        this.element.removeEventListener('wheel', this.onElementScroll.bind(this), true);
    }

    public onElementScroll($event: WheelEvent): void {
        const deltaX: number = Math.abs(Number($event.deltaY));
        const deltaY: number = Math.abs(Number($event.deltaX));
        const isLimitExceeded: boolean = deltaX > this.maxDelta || deltaY > this.maxDelta;

        if (isLimitExceeded) {
            $event.preventDefault();
        }
    }
}
