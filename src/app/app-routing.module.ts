/* tslint:disable */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Any } from '../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'samples'
                },
                {
                    path: 'samples',
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            redirectTo: 'guide'
                        },
                        {
                            path: 'guide',
                            loadChildren: () => import('./samples/guide/guide.module').then((m) => m.GuideModule)
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
                        },
                        {
                            path: 'seven',
                            loadChildren: () =>
                                import('./samples/sample-seven/sample-seven.module').then((m) => m.SampleSevenModule)
                        },
                        {
                            path: 'eight',
                            loadChildren: () =>
                                import('./samples/sample-eight/sample-eight.module').then((m) => m.SampleEightModule)
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
