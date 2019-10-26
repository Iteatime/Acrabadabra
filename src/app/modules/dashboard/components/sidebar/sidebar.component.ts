import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  toggleSidebar() {
    document.querySelector('#page-top').classList.toggle('sidebar-toggle');
    document.querySelector('#accordionSidebar').classList.toggle('toggled');
  }

}
