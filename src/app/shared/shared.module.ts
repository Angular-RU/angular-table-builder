import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableBuilderModule } from '@angular-ru/ng-table-builder';
import { CodeDialogComponent } from './dialog/code-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';

@NgModule({
  imports: [TableBuilderModule.forRoot(), CommonModule, MatButtonModule, FormsModule, MatInputModule, ReactiveFormsModule],
    entryComponents: [CodeDialogComponent, DialogTemplateComponent],
    declarations: [CodeDialogComponent, DialogTemplateComponent],
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
        CodeDialogComponent,
        MatIconModule,
        MatTableModule,
        MatTabsModule
    ]
})
export class SharedModule {}
