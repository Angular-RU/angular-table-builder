import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IntroductionComponent } from './samples/introduction/introduction.component';
import { Any } from '../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

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
                            loadChildren: (): Promise<unknown> =>
                                import('./samples/sample-first/sample-first.module').then(
                                    (module: Any) => module.SampleFirstModule
                                )
                        },
                        {
                            path: 'second',
                            loadChildren: (): Promise<unknown> =>
                                import('./samples/sample-second/sample-second.module').then(
                                    (module: Any) => module.SampleSecondModule
                                )
                        },
                        {
                            path: 'third',
                            loadChildren: (): Promise<unknown> =>
                                import('./samples/sample-third/sample-third.module').then(
                                    (module: Any) => module.SampleThirdModule
                                )
                        },
                        {
                            path: 'fourth',
                            loadChildren: (): Promise<unknown> =>
                                import('./samples/sample-fourth/sample-fourth.module').then(
                                    (module: Any) => module.SampleFourthModule
                                )
                        },
                        {
                            path: 'five',
                            loadChildren: (): Promise<unknown> =>
                                import('./samples/sample-five/sample-five.module').then(
                                    (module: Any) => module.SampleFiveModule
                                )
                        }
                    ]
                }
            ],
            { useHash: true, scrollPositionRestoration: 'enabled' }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
