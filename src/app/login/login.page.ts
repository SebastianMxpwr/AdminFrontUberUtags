import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AdminService } from '../Services/admin.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public adminS: AdminService, public router:Router) { }

  ngOnInit() {
  }

  onLogin(form){
    this.adminS.login(form.value).subscribe(res=>{
      this.router.navigate(['/home'])
      console.log(res)
    }, err=>{
      console.log(err)
    })
  }

}
