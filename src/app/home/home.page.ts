import { Component, OnInit } from '@angular/core';
import { AdminService} from '../Services/admin.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public admin: AdminService) {}

  ngOnInit() {
    this.getC()
    this.getP()
  }

  onRegisterP(form){
    this.admin.registerPasajero(form.value).subscribe(res=>{
      this.getP()
      console.log(res)
    }, err=>{
      console.log(err)
    })
  }

  onRegisterC(form){
    this.admin.registerConductor(form.value).subscribe(res=>{
      console.log(res)
      this. getC()
    }, err=>{
      console.log(err)
    })
  }

  getP(){
    this.admin.obtenerPasajeros()
  }

  getC(){
    this.admin.obtenerConductores()
  }

}
