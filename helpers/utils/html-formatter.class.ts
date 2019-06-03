import * as pretty from 'pretty';

export class HtmlFormatter {
    private readonly commentRegExp: RegExp = /<!--[\s\S]*?(?:-->)/g;
    private readonly ngAttr: RegExp = /ng-[^"\s]*="[^"]*"/g;

    constructor(private htmlContent: string = '') {}

    public removeComments(): HtmlFormatter {
        this.htmlContent = this.htmlContent.replace(this.commentRegExp, '');
        return this;
    }

    public removeNgAttr(attrs: string[] = []): HtmlFormatter {
        this.htmlContent = this.htmlContent.replace(this.ngAttr, '');

        this.htmlContent = this.removeAttrs(this.htmlContent, [
            ...attrs,
            'ng-reflect-ng-class',
            'ng-reflect-ng-style',
            'ng-reflect-klass',
            'role',
            'ng-reflect-table-data',
            'ng-reflect-row-height'
        ])
            // remove special angular value
            .replace(/ng-tns-c[0-9]-[0-9]/g, ' ')
            .replace(/ng-trigger-fadeAnimation/g, ' ')
            .replace(/ng-animating/g, ' ')
            .replace(/ng-trigger/g, ' ')
            .replace(/ng-star-inserted/g, ' ')
            .replace('mat-header-row=""', '')
            // remove multi whitespace
            .replace(/\s\s+/g, ' ')
            // remove new ng debug
            .replace(/ forwards /g, '')
            .replace(/gen_css_kf_[0-9]/g, '')
            .replace(/normalgen_css_kf_[0-9]/g, '')
            .replace(/_ngcontent-a-c[0-9]=""/g, '')
            .replace(/_nghost-a-c[0-9]=""/g, '')
            // fix incorrect remove space
            .replace(/ " >/g, '">')
            .replace(/=" /g, '="')
            .replace(/" >/g, '">')
            .replace(/\s"/g, '"')
            .replace(/class=""/g, '')
            .replace(/\sstyle=""|style=""/g, '');

        return this;
    }

    public prettyHtml(): string {
        return pretty.default(this.htmlContent);
    }

    public removeAttrs(str: string, list: string[]): string {
        let newStr: string = str;

        list.forEach((attr: string) => {
            newStr = newStr.replace(new RegExp(`${attr}=\"([^']*?)\"`, 'g'), ' ');
        });

        return newStr;
    }
}
