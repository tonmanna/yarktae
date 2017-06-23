import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-nav-bar',
    templateUrl: './Navbar.html'
})

export class NavbarComponent implements OnInit {
    public menuItems: any;
    constructor() {
        this.menuItems = [
            {
                Name: 'Home',
                URL: '',
            },
            {
                Name: 'CRM Accounting',
                URL: 'crm_account',
            },
            {
                Name: 'CRM Sales',
                URL: 'crm_sales',
            },
            {
                Name: 'Service',
                URL: '#',
                bChild: true,
                Child: [
                    {
                        Name: 'Problem งวด 2',
                        URL: 'problem_second_payment'
                    }
                ]
            },
            {
                Name: 'Allure Adwords',
                URL: 'adwords',
            }
        ];
    }
    ngOnInit() {

    }
}
