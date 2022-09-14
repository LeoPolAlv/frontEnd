import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public menu: any[] = [];

  constructor(
    private adminService: AdminService,
  ) { 
    console.log('Menu del Administrador: ', adminService.getMenu());
    this.menu = adminService.getMenu();
  }

  ngOnInit(): void {
  }

}
