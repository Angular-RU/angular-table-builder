import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleFirstComponent } from './sample-first.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [SampleFirstComponent],
    imports: [CommonModule, RouterModule.forChild([{ path: '', component: SampleFirstComponent }])]
})
export class SampleFirstModule {}
