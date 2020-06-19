/* eslint-disable */
import { ngPackagr } from 'ng-packagr';
// @ts-ignore
import { join } from 'path';

async function buildPackage(): Promise<void> {
    try {
        await ngPackagr()
            // @ts-ignore
            .forProject(join(__dirname, '../projects/table-builder/ng-package.json'))
            // @ts-ignore
            .withTsConfig(join(__dirname, './tsconfig.lib.json'))
            .build();
    } catch {
        // @ts-ignore
        process.exit(1);
    }
}

buildPackage().then((): void => {
    // eslint-disable-next-line no-console
    console.log('done');
});
