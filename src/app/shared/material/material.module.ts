import { NgModule } from '@angular/core';
import { MatCardModule, MatDividerModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    exports: [MatSidenavModule, MatToolbarModule, MatDividerModule, MatListModule, DragDropModule, MatCardModule]
})
export class MaterialModule {}
