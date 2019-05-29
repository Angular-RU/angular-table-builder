import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SampleFirstComponent } from './sample-first.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [SampleFirstComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleFirstComponent }])]
})
export class SampleFirstModule {}
