import { CdkDragSortEvent, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

import { TemplateParserService } from '../template-parser/template-parser.service';
import { ColumnsSchema } from '../../interfaces/table-builder.external';

@Injectable()
export class DraggableService {
    constructor(private readonly parser: TemplateParserService) {}

    public drop(event: CdkDragSortEvent): void {
        if (this.canDropped(event)) {
            const { previousIndex, currentIndex }: CdkDragSortEvent = event;

            if (currentIndex === this.columns.length - 1) {
                this.columns[currentIndex].width = this.columns[previousIndex].width;
                this.columns[previousIndex].width = null;
            }

            moveItemInArray(this.columns, previousIndex, currentIndex);
        }
    }

    public canDropped(event: CdkDragSortEvent): boolean {
        const { previousIndex, currentIndex }: CdkDragSortEvent = event;
        const previousIsDraggable: boolean = this.columns[previousIndex].draggable;
        const currentIsDraggable: boolean = this.columns[currentIndex].draggable;
        return previousIsDraggable && currentIsDraggable;
    }

    private get columns(): ColumnsSchema[] {
        return this.parser.schema.columns;
    }
}
