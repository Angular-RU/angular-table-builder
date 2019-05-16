import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBuilderComponent } from './table/table-builder.component';
import { TableRowComponent } from './table/components/table-row/table-row.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TableBuilderComponent, TableRowComponent],
    exports: [TableBuilderComponent]
})
export class TableBuilderModule {}
