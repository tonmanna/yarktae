import { Injectable } from '@angular/core';
@Injectable()
export class MenubarService {
    public menuItem: string[] = ['Home', 'About Us', 'Contact Us'];
    constructor() {
    }
}
