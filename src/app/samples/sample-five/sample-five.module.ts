import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SampleFiveComponent } from './sample-five.component';

@NgModule({
    declarations: [SampleFiveComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleFiveComponent }])]
})
export class SampleFiveModule {}
