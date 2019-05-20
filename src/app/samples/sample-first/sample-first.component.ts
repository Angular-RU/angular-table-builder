import { Component } from '@angular/core';
import { TableRow } from '@angular-ru/table-builder';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.css']
})
export class SampleFirstComponent {
    public width: string = '100%';
    public height: string = '500px';
    public rowHeight: string;
    public cellWidth: string;
    public visibleColumns: number;
    public nowrap: boolean = true;

    public simple: TableRow[] = new Array(100000).fill(0).map((_: any, index: number) => ({
        id: index + '__' + index,
        name: 'Hello - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + index,
        description: 'World - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + index,
        _id: '5cdae5b2ba0a57f709b72142' + '__' + index,
        aboutBigTextAndMorePowerfulLabel:
            `
            Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
            Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
             Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam
             ` +
            '__' +
            index,
        index: 1 + '__' + index,
        guid: 'guid-0' + '__' + index,
        guid1: 'guid-1' + '__' + index,
        guid2: 'guid-2' + '__' + index,
        guid3: 'guid-3' + '__' + index,
        guid4: 'guid-4' + '__' + index,
        guid5: 'guid-5' + '__' + index,
        guid6: 'guid-6' + '__' + index,
        guid7: 'guid-7' + '__' + index,
        guid8: 'guid-8' + '__' + index,
        guid9: 'guid-9' + '__' + index,
        guid10: 'guid-10' + '__' + index,
        guid11: 'guid-11' + '__' + index,
        guid12: 'guid-12' + '__' + index,
        guid13: 'guid-13' + '__' + index,
        guid14: 'guid-14' + '__' + index,
        guid15: 'guid-15' + '__' + index,
        guid16: 'guid-16' + '__' + index,
        guid17: 'guid-17' + '__' + index,
        guid18: 'guid-18' + '__' + index,
        guid19: 'guid-19' + '__' + index,
        guid20: 'guid-20' + '__' + index,
        guid21: 'guid-21' + '__' + index,
        guid22: 'guid-22' + '__' + index,
        guid23: 'guid-23' + '__' + index,
        guid24: 'guid-24' + '__' + index,
        guid25: 'guid-25' + '__' + index,
        guid26: 'guid-26' + '__' + index,
        guid27: 'guid-27' + '__' + index,
        guid28: 'guid-28' + '__' + index,
        guid29: 'guid-29' + '__' + index,
        guid30: 'guid-30' + '__' + index,
        guid31: 'guid-31' + '__' + index,
        guid32: 'guid-32' + '__' + index,
        guid33: 'guid-33' + '__' + index,
        guid34: 'guid-34' + '__' + index,
        guid35: 'guid-35' + '__' + index,
        guid36: 'guid-36' + '__' + index,
        guid37: 'guid-37' + '__' + index,
        guid38: 'guid-38' + '__' + index,
        guid39: 'guid-39' + '__' + index,
        guid40: 'guid-40' + '__' + index,
        isActive: false,
        picture: 'http://placehold.it/32x32' + '__' + index,
        age: 30 + '__' + index,
        eyeColor: 'blue' + '__' + index,
        company: 'ECLIPSENT' + '__' + index,
        email: 'patrice.morgan@eclipsent.name' + '__' + index,
        phone: '+1 (934) 484-2778' + '__' + index
    }));
}
