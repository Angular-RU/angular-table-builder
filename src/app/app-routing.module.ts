import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroductionComponent } from './samples/introduction/introduction.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    component: IntroductionComponent
                },
                {
                    path: 'samples',
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            redirectTo: 'first'
                        },
                        {
                            path: 'first',
                            loadChildren: './samples/sample-first/sample-first.module#SampleFirstModule'
                        }
                    ]
                }
            ],
            { useHash: true }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
