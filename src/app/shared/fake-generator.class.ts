import { TableRow } from '@angular-ru/table-builder';

export class FakeGenerator {
    public static generateTable(rows: number, cols: number): TableRow[] {
        return new Array(rows).fill(0).map((_: unknown, index: number) => {
            const idx: number = index + 1;

            const baseRow: TableRow = {
                id: idx,
                name: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                description: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                guid: '5cdae5b2ba0a57f709b72142' + '__' + idx,
                ['About Big Text And More Powerful Label Fugiat tempor sunt nostrud']: `
                 Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
                 Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
                 Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam
                 `
            };

            if (cols > 5) {
                for (let i: number = 6; i <= cols; i++) {
                    baseRow['column-' + i] = `$row-${idx} $col-${i}`;
                }
            }

            return baseRow;
        });
    }
}
