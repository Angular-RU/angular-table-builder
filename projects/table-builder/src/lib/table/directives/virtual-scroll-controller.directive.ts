import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { THROTTLING_TIME, WHEEL_SCROLL_LIMIT } from '../../table-builder.interfaces';

@Directive({ selector: '[virtualScroll]' })
export class VirtualScrollControllerDirective implements OnInit, OnDestroy {
    @Output() public scrollDelta: EventEmitter<number> = new EventEmitter();
    private id: number;
    private useNextTick: boolean = true;
    private lastDeltaX: number;

    constructor(
        @Inject(WHEEL_SCROLL_LIMIT) private readonly maxDelta: number,
        @Inject(THROTTLING_TIME) private readonly throttlingTime: number,
        private elementRef: ElementRef,
        private ngZone: NgZone
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
        if (this.lastDeltaX === $event.deltaX) {
            return;
        }

        this.oncChangeScrollDelta($event);
        this.lastDeltaX = $event.deltaX;
    }

    private oncChangeScrollDelta($event: WheelEvent): void {
        const delta: number = Math.abs($event.deltaY as number);
        const checkThrottling: boolean = delta > 100 && this.useNextTick;
        if (checkThrottling) {
            clearInterval(this.id);
            this.scrollDelta.emit($event.deltaY);
            this.useNextTick = false;

            this.id = window.setTimeout(() => {
                this.useNextTick = true;
                this.scrollDelta.emit(0);
            }, this.throttlingTime);
        }
    }
}
