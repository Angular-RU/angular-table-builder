/* tslint:disable */
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
                            loadChildren: () =>
                                import('./samples/sample-first/sample-first.module').then((m) => m.SampleFirstModule)
                        },
                        {
                            path: 'second',
                            loadChildren: () =>
                                import('./samples/sample-second/sample-second.module').then(
                                    (m: Any) => m.SampleSecondModule
                                )
                        },
                        {
                            path: 'third',
                            loadChildren: () =>
                                import('./samples/sample-third/sample-third.module').then((m) => m.SampleThirdModule)
                        },
                        {
                            path: 'fourth',
                            loadChildren: () =>
                                import('./samples/sample-fourth/sample-fourth.module').then((m) => m.SampleFourthModule)
                        },
                        {
                            path: 'five',
                            loadChildren: () =>
                                import('./samples/sample-five/sample-five.module').then((m) => m.SampleFiveModule)
                        },
                        {
                            path: 'six',
                            loadChildren: () =>
                                import('./samples/sample-six/sample-six.module').then((m) => m.SampleSixModule)
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
