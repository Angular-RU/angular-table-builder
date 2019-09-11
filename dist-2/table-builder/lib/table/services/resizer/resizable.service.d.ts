import { Fn } from '../../interfaces/table-builder.internal';
export declare class ResizableService {
    startX: number;
    startWidth: number;
    private destroyed$;
    private static clearSelection;
    resize(event: MouseEvent, column: HTMLElement, mousemove: Fn, mouseup: Fn): void;
    private computeEvent;
    private unsubscribe;
}
