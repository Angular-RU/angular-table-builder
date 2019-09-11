import { Subject } from 'rxjs';
import { TableUpdateSchema } from '../../interfaces/table-builder.external';
export declare class NgxTableViewChangesService {
    events: Subject<TableUpdateSchema>;
    update(state: TableUpdateSchema): void;
}
