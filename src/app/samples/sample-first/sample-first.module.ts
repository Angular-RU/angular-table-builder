import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleFirstComponent } from './sample-first.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
    declarations: [SampleFirstComponent],
    imports: [CommonModule, MaterialModule, RouterModule.forChild([{ path: '', component: SampleFirstComponent }])]
})
export class SampleFirstModule {}
