import { TableBuilderOptions } from './table-builder.interfaces';

export class TableBuilderConfig implements TableBuilderOptions {
    public wheelScrollLimit: number = 500;
    public wheelScrollDelta: number = 100;

    /**
     * Time throttling to delay redrawing the table rows in viewport
     */
    public throttlingTime: number = 3000;
}
