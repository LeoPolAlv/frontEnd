import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() userToken!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async logoOut(){
    //console.log('LOGOUT');
    await this.loginService.logout();
    this.router.navigateByUrl('/login');
    //console.log('navegamos al inicio');
    //this.router.navigate(['/login']);
    //console.log('navegamos al inicio- despues');
  }

}
