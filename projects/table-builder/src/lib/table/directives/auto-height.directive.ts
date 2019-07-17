import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Any, DynamicHeightOptions } from '../interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../config/table-builder-options';

const { TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Directive({ selector: '[autoHeight]' })
export class AutoHeightDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private static readonly DEFAULT_VALUE: number = 0;
    private static readonly HEAD_TOP: string = '10px';
    @Input() public autoHeight: Partial<DynamicHeightOptions> = {};
    @Output() public recalculatedHeight: EventEmitter<void> = new EventEmitter();

    private useOnlyAutoViewPort: boolean;
    private isDirtyCheck: boolean;
    private taskId: number;

    constructor(private readonly element: ElementRef, public ngZone: NgZone) {
        this.ngZone = ngZone;
    }

    private get height(): number {
        return this.autoHeight.height;
    }

    private get canCalculated(): boolean {
        return this.autoHeight.inViewport && this.autoHeight.sourceLength > 0;
    }

    private get style(): string {
        let height: string;

        if (this.height) {
            height = `${this.height}px`;
        } else if (this.autoHeight.detect) {
            let viewportHeight: number;
            const paddingTop: string = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-top');
            const paddingBottom: string = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-bottom');
            const scrollbarHeight: number = this.childElement.offsetHeight - this.childElement.clientHeight || 0;

            if (this.isLessHeightViewPort) {
                viewportHeight = this.columnHeight;
                height = `calc(${viewportHeight}px + ${scrollbarHeight}px)`;
            } else if (this.isLessHeightParentOffset && !this.useOnlyAutoViewPort) {
                viewportHeight = this.parentOffsetHeight - parseInt(AutoHeightDirective.HEAD_TOP);
                height = `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`;
            } else {
                viewportHeight = this.autoViewHeight - parseInt(AutoHeightDirective.HEAD_TOP);
                height = `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`;
            }
        }

        return height ? `display: block; height: ${height}` : '';
    }

    private get isLessHeightParentOffset(): boolean {
        return (
            this.parentOffsetHeight > parseInt(AutoHeightDirective.HEAD_TOP) &&
            this.parentOffsetHeight < this.autoViewHeight
        );
    }

    private get isLessHeightViewPort(): boolean {
        return this.columnHeight <= this.parentOffsetHeight || this.columnHeight < this.autoViewHeight;
    }

    private get parentOffsetHeight(): number {
        return this.rootCurrentElement.offsetHeight || AutoHeightDirective.DEFAULT_VALUE;
    }

    private get currentElement(): HTMLDivElement {
        return this.element.nativeElement;
    }

    private get childElement(): Partial<HTMLDivElement> {
        return ((this.element.nativeElement as HTMLDivElement).firstChild as HTMLDivElement) || {};
    }

    private get rootCurrentElement(): Partial<HTMLElement> {
        return (this.currentElement.parentNode && this.currentElement.parentNode.parentElement) || {};
    }

    private get columnHeight(): number {
        return this.autoHeight.columnHeight;
    }

    private get autoViewHeight(): number {
        return document.body.clientHeight - this.currentElement.getBoundingClientRect().top;
    }

    private static getStyle(element: Element | Any, strCssRule: string): string {
        let strValue: string = '';

        if (document.defaultView && document.defaultView.getComputedStyle) {
            try {
                strValue = document.defaultView.getComputedStyle(element, '').getPropertyValue(strCssRule);
            } catch (e) {
                strValue = '0px';
            }
        } else if (element.currentStyle) {
            strCssRule = strCssRule.replace(/\-(\w)/g, (strMatch: string, p1: string): string => p1.toUpperCase());
            strValue = element.currentStyle[strCssRule];
        }

        return strValue;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            window.addEventListener('resize', this.recalculateByResize.bind(this), { passive: true });
        });
    }

    public ngAfterViewInit(): void {
        this.markForCheck();
    }

    public ngOnChanges(): void {
        if (this.isDirtyCheck) {
            this.recalculateByResize();
        }
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resize', this.recalculateByResize.bind(this));
    }

    public recalculateByResize(): void {
        this.calculateHeight();
        this.ngZone.runOutsideAngular(() => {
            clearTimeout(this.taskId);
            this.taskId = window.setTimeout(() => {
                this.recalculatedHeight.emit();
            }, TIME_IDLE);
        });
    }

    public calculateHeight(): void {
        if (this.canCalculated) {
            this.setHeightByParent();
        }
    }

    private markForCheck(): void {
        this.isDirtyCheck = true;

        if (this.parentOffsetHeight <= parseInt(AutoHeightDirective.HEAD_TOP)) {
            this.useOnlyAutoViewPort = true;
        }
    }

    private setHeightByParent(): void {
        this.currentElement.setAttribute('style', this.style);
    }
}
