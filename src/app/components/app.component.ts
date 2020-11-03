import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScrollService} from "../services/scroll.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('cardBody', {static: false}) cardBody: ElementRef;

    constructor(private scrollService: ScrollService) {
    }

    ngAfterViewInit(): void {
        this.scrollService.container = this.cardBody;
    }

}
