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
