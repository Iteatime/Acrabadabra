import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  ngOnInit() {
  }

  toggleSidebar() {
    document.querySelector('#page-top').classList.toggle('sidebar-toggle');
    document.querySelector('#accordionSidebar').classList.toggle('toggled');
  }

}
