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
    public cellFullWidth: boolean = false;

    public simple: TableRow[] = new Array(100).fill(0).map(() => ({
        id: ((Math.random() + 1) * 100).toFixed(0),
        name: 'Hello',
        description: 'World',
        _id: '5cdae5b2ba0a57f709b72142',
        about: `
            Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
            Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam.
             Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa consectetur veniam
             `,
        index: 1,
        guid: '12dc8891-d3a7-4689-89af-a3f851b89c08',
        isActive: false,
        balance: '$2,912.80',
        picture: 'http://placehold.it/32x32',
        age: 30,
        eyeColor: 'blue',
        company: 'ECLIPSENT',
        email: 'patrice.morgan@eclipsent.name',
        phone: '+1 (934) 484-2778',
        address: '935 Losee Terrace, Darrtown, Wisconsin, 9932',
        registered: 'Monday, January 2, 2017 11:08 AM',
        latitude: '-51.862465',
        longitude: '-74.444691',
        tags: ['officia', 'do', 'excepteur', 'esse', 'aliquip']
    }));
}
