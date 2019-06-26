import {
    AfterViewInit,
    ApplicationRef,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit
} from '@angular/core';
import { DynamicHeightOptions } from '../interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';

const { TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Directive({ selector: '[autoHeight]' })
export class AutoHeightDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() public autoHeight: Partial<DynamicHeightOptions> = {};
    private isDirtyCheck: boolean;

    constructor(private readonly element: ElementRef, public ngZone: NgZone, public app: ApplicationRef) {
        this.ngZone = ngZone;
    }

    private get height(): number {
        return this.autoHeight.height;
    }

    private get inViewport(): boolean {
        return this.autoHeight.inViewport;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', this.recalculateByResize.bind(this), { passive: true });
        });
    }

    public ngAfterViewInit(): void {
        this.calculateHeight();
        this.isDirtyCheck = true;
    }

    public ngOnChanges(): void {
        if (this.isDirtyCheck) {
            this.calculateHeight();
        }
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resize', this.recalculateByResize.bind(this));
    }

    public recalculateByResize(): void {
        this.calculateHeight();
        this.ngZone.runOutsideAngular(() => window.setTimeout(() => this.app.tick(), TIME_IDLE));
    }

    public calculateHeight(): void {
        if (this.inViewport) {
            this.setHeightByParent(this.element.nativeElement);
        }
    }

    private setHeightByParent(element: HTMLElement): void {
        element.setAttribute('style', this.getStyleHeight(element));
    }

    private getStyleHeight(element: HTMLElement): string {
        let height: string;

        if (this.height) {
            height = `${this.height}px`;
        } else if (this.autoHeight.detect) {
            height = `calc(${document.body.clientHeight}px - ${element.getBoundingClientRect().top}px - 10px)`;
        }

        return height ? `display: block; height: ${height}` : '';
    }
}
