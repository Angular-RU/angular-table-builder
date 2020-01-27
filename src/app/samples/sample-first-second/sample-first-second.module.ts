import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SampleFirstSecondComponent } from './sample-first-second.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [SampleFirstSecondComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleFirstSecondComponent }])]
})
export class SampleFirstSecondModule {}
