import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableBuilderModule } from '@angular-ru/table-builder';
import { CodeDialogComponent } from './dialog/code-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [TableBuilderModule.forRoot(), CommonModule, MatButtonModule],
    entryComponents: [CodeDialogComponent],
    declarations: [CodeDialogComponent],
    exports: [
        FormsModule,
        MatButtonModule,
        MatDialogModule,
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
        TableBuilderModule,
        MatSnackBarModule,
        CodeDialogComponent
    ]
})
export class SharedModule {}
