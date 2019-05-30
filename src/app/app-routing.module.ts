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
                            loadChildren: (): Promise<any> =>
                                import('./samples/sample-first/sample-first.module').then(
                                    (module: any) => module.SampleFirstModule
                                )
                        },
                        {
                            path: 'second',
                            loadChildren: (): Promise<any> =>
                                import('./samples/sample-second/sample-second.module').then(
                                    (module: any) => module.SampleSecondModule
                                )
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
