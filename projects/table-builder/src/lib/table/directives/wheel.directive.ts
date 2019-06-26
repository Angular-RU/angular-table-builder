import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { NGX_TABLE_OPTIONS } from '../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';
import { ScrollOverload } from '../interfaces/table-builder.internal';
import { UtilsService } from '../services/utils/utils.service';

@Directive({ selector: '[wheelThrottling]' })
export class WheelThrottlingDirective implements OnInit, OnDestroy {
    @Output() public scrollOffset: EventEmitter<boolean> = new EventEmitter();
    @Output() public scrollOverload: EventEmitter<ScrollOverload> = new EventEmitter();
    public scrollTopOffset: boolean = false;
    public isDetectOverload: boolean = false;
    public isScrolling: number = null;

    constructor(
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        private readonly elementRef: ElementRef,
        private readonly ngZone: NgZone,
        private readonly utils: UtilsService
    ) {}

    /**
     * Firefox can't correct rendering when mouse wheel delta X, Y more then 200-500px
     */
    public handlerOptions(userAgent: string = null): boolean | AddEventListenerOptions {
        return this.utils.isFirefox(userAgent) ? true : { passive: false };
    }

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.element.addEventListener('wheel', this.onElementScroll.bind(this), this.handlerOptions());
        });
    }

    public ngOnDestroy(): void {
        this.element.removeEventListener('wheel', this.onElementScroll.bind(this), this.handlerOptions());
    }

    public onElementScroll($event: WheelEvent): void {
        const deltaY: number = Math.abs(Number($event.deltaY));
        const isLimitExceeded: boolean = deltaY > this.options.wheelMaxDelta;

        if (isLimitExceeded) {
            if (!this.isDetectOverload) {
                this.fireOnScroll(true);
            }
            $event.preventDefault();
        }

        window.clearTimeout(this.isScrolling);
        this.isScrolling = window.setTimeout(() => {
            this.fireOnScroll(false);
        }, TableBuilderOptionsImpl.FRAME_TIME);

        const isOffset: boolean = this.element.scrollTop > 0 && !this.scrollTopOffset;

        if (isOffset) {
            this.scrollTopOffset = true;
            this.scrollOffset.emit(this.scrollTopOffset);
        } else if (this.element.scrollTop === 0 && this.scrollTopOffset) {
            this.scrollTopOffset = false;
            this.scrollOffset.emit(this.scrollTopOffset);
        }
    }

    private fireOnScroll(overload: boolean): void {
        this.isDetectOverload = overload;
        this.scrollOverload.emit({ isOverload: this.isDetectOverload });
    }
}
