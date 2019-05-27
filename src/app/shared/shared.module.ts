import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableBuilderModule } from '@angular-ru/table-builder';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [TableBuilderModule.forRoot()],
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
        ScrollingModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        TableBuilderModule
    ]
})
export class SharedModule {}
