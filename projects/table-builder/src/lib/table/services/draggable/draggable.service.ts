import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { TemplateParserService } from '../template-parser/template-parser.service';

@Injectable()
export class DraggableService {
    constructor(private readonly parser: TemplateParserService) {}

    public drop(event: CdkDragSortEvent): void {
        if (this.canDropped(event)) {
            const columns: string[] = [...this.parser.schema.displayedColumns];
            const { previousIndex, currentIndex }: CdkDragSortEvent = event;

            if (currentIndex === columns.length - 1) {
                const currentKey: string = columns[currentIndex];
                const previousKey: string = columns[previousIndex];
                this.parser.schema.columns[currentKey].width = this.parser.schema.columns[previousKey].width;
                this.parser.schema.columns[previousKey].width = null;
            }

            moveItemInArray(columns, previousIndex, currentIndex);
            this.parser.schema.displayedColumns = columns;
        }
    }

    public canDropped(event: CdkDragSortEvent): boolean {
        const { previousIndex, currentIndex }: CdkDragSortEvent = event;
        const previousKey: string = this.parser.schema.displayedColumns[previousIndex];
        const currentKey: string = this.parser.schema.displayedColumns[currentIndex];
        const previousIsDraggable: boolean = this.parser.schema.columns[previousKey].draggable;
        const currentIsDraggable: boolean = this.parser.schema.columns[currentKey].draggable;
        return previousIsDraggable && currentIsDraggable;
    }
}
