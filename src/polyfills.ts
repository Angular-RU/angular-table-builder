import 'hammerjs';
import 'intersection-observer';
import './zone-flags';
import 'zone.js/dist/zone';

import { Any } from '../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

(window as Any)['__importDefault'] =
    (window as Any)['__importDefault'] ||
    function (mod: Any): Any {
        return mod && mod.__esModule ? mod : { default: mod };
    };

(window as Any).global = window; // Included with Angular CLI.
