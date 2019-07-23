import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SampleThirteenComponent } from './sample-thirteen.component';

@NgModule({
    declarations: [SampleThirteenComponent],
    imports: [CommonModule, SharedModule, RouterModule.forChild([{ path: '', component: SampleThirteenComponent }])]
})
export class SampleThirteenModule {}
