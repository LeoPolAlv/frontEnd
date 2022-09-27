import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit {

  public menu: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { 
    //console.log('Menu del Administrador: ', adminService.getMenu());
    this.menu = adminService.getMenu();
  }

  ngOnInit(): void {
  }

  nuevaReserva() {
    this.router.navigateByUrl('/admin', {skipLocationChange: true}).then(() => this.router.navigate(['admin/newreserva']));
  }

  misReservas() {
    this.router.navigateByUrl('/admin', {skipLocationChange: true}).then(() => this.router.navigate(['admin/misreservas']));
  }

  onclick(item:any, boton:any) {
    console.log('Item click admin: ', item);
    console.log('Boton click admin: ', boton);
  }

}
