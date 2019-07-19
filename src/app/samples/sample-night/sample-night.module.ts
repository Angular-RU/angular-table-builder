import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SampleNightComponent } from './sample-night.component';

@NgModule({
    declarations: [SampleNightComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleNightComponent }])]
})
export class SampleNightModule {}
