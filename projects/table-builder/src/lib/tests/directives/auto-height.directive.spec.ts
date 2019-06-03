import { ApplicationRef, ElementRef, NgZone } from '@angular/core';

import { Any, Fn } from '../../table/interfaces/table-builder.internal';
import { AutoHeightDirective } from '../../table/directives/auto-height.directive';

describe('[TEST]: auto height', () => {
    let directive: AutoHeightDirective;
    let recalculateDispatcher: Fn;
    let addedEvent: boolean = false;
    let removeEvent: boolean = false;
    let ticked: number = 0;
    let style: string;

    const mockNgZone: Partial<NgZone> = {
        runOutsideAngular<T = Any>(fn: Fn): T {
            return fn() as Any;
        }
    };

    const appMock: Partial<ApplicationRef> = {
        tick(): void {
            ticked++;
        }
    };

    const mockElementRef: ElementRef = {
        nativeElement: {
            setAttribute: (_: string, styleResult: string): void => {
                style = styleResult;
            },
            getBoundingClientRect: (): Partial<ClientRect> => {
                return { top: 10 };
            }
        }
    };

    Object.defineProperty(document.body, 'clientHeight', {
        value: 1000
    });

    Object.defineProperties(window, {
        addEventListener: {
            value: (_: string, fn: Fn): void => {
                recalculateDispatcher = fn;
                addedEvent = true;
            }
        },
        removeEventListener: {
            value: (): void => {
                recalculateDispatcher = null;
                removeEvent = true;
            }
        }
    });

    beforeEach(() => {
        directive = new AutoHeightDirective(mockElementRef, mockNgZone as NgZone, appMock as ApplicationRef);
        style = '';
        ticked = 0;
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnInit();
        expect(addedEvent).toEqual(true);
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnDestroy();
        expect(removeEvent).toEqual(true);
    });

    it('should be correct calculate auto height', () => {
        directive.autoHeight = { detect: true };
        directive.calculateHeight();
        expect(style).toEqual(`display: block; height: calc(1000px - 10px - 10px)`);
    });

    it('should be correct calculate custom height', () => {
        directive.autoHeight = { detect: true, height: 500 };
        directive.calculateHeight();
        expect(style).toEqual(`display: block; height: 500px`);
    });

    it('should be correct empty style when autoHeight not called', () => {
        directive.autoHeight = { detect: false, height: null };
        directive.calculateHeight();
        expect(style).toEqual(``);
    });

    it('should be correct recalculate height', () => {
        directive.autoHeight = { height: 200 };
        directive.recalculateByResize();
        expect(style).toEqual(`display: block; height: 200px`);
        expect(ticked).toEqual(1);
    });
});
