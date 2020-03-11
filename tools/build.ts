import { ngPackagr } from 'ng-packagr';
import { join } from 'path';

async function buildPackage(): Promise<void> {
    try {
        await ngPackagr()
            .forProject(join(__dirname, '../projects/table-builder/ng-package.json'))
            .withTsConfig(join(__dirname, './tsconfig.lib.json'))
            .build();
    } catch {
        process.exit(1);
    }
}

buildPackage().then(
    (): void => {
        // eslint-disable-next-line no-console
        console.log('done');
    }
);
