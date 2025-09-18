import { Component, OnInit } from "@angular/core";

import { HeaderComponent } from "@shared/components/header/header.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss'],
    standalone: true,
    imports: [HeaderComponent]
})

export class DashboardComponent implements OnInit {
    
    constructor(

    ){}

    ngOnInit(): void {
        
    }

    
}
