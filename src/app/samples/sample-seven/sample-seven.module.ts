import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SampleSevenComponent } from './sample-seven.component';

@NgModule({
    declarations: [SampleSevenComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleSevenComponent }])]
})
export class SampleSevenModule {}
