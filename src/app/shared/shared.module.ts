import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableBuilderModule } from '@angular-ru/table-builder';
import { FormsModule } from '@angular/forms';

@NgModule({
    exports: [
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        DragDropModule,
        MatCardModule,
        TableBuilderModule
    ]
})
export class SharedModule {}
