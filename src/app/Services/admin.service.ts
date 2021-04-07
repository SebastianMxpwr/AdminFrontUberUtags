import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Admin }  from '../models/admin/Admin'
import { Pasajero } from '../models/pasajero/pasajero'
import { Conductor } from '../models/conductor/conductor'
import { JwtResponse } from '../models/admin/JwtResponse'
import { JwtResponseP} from '../models/pasajero/JwtResponseP'
import { JwtResponseC} from '../models/conductor/JwtResponseC' 
import { tap } from  'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url:string = "http://localhost:3000"
  authSubejct = new BehaviorSubject(false)
  public token: string
  conductores: any
  pasajeros: any

    strNombreP: string
    strCorreoP: string
    CurpRfcP: string
    nmbCelularP: [number]

    strNombreC: string
    strCorreoC: string
    CurpRfcC: string
    nmbCelularC: [number]

constructor(private http: HttpClient) {
  this.conductores = []
  this.pasajeros= []
 }

registerPasajero(pasajero: Pasajero ): Observable<JwtResponseP>{
  return this.http.post<JwtResponseP>
  (`${this.url}/register/pasajero`, pasajero).pipe(tap((res:JwtResponseP)=>{
    if(res){
      this.strNombreP = res.dataPasajero.strNombre
      this.strCorreoP = res.dataPasajero.strEmail
      this.CurpRfcP = res.dataPasajero.strRfcCurp
      this.nmbCelularP = res.dataPasajero.nmbCelular
    }
  }))
}

registerConductor(conductor: Conductor ): Observable<JwtResponseC>{
  return this.http.post<JwtResponseC>
  (`${this.url}/register/conductor`, conductor).pipe(tap((res:JwtResponseC)=>{
    if(res){
      this.strNombreC = res.dataConductor.strNombre
      this.strCorreoC = res.dataConductor.strEmail
      this.CurpRfcC = res.dataConductor.strRfcCurp
      this.nmbCelularC = res.dataConductor.nmbCelular
    }
  }))
}

  login(admin:Admin): Observable<JwtResponse>{
    return this.http.post<JwtResponse>
    (`${this.url}/login/admin`, admin).pipe(tap((res:JwtResponse)=>{
      if (res){
        this.saveToken(res.dataAdmin.accessToken, res.dataAdmin.expiresIn)
      }
    }, err=>{
      console.log(err)
    }))
  }
  
  obtenerConductores(){
    this.http.get(`${this.url}/api/conductores`).subscribe( res=>{
      this.conductores=res
    }, err=>{
      console.log(err) 
    })
  }

  obtenerPasajeros(){
    this.http.get(`${this.url}/api/pasajeros`).subscribe( res=>{
      this.pasajeros=res
    }, err=>{
      console.log(err) 
    })
  }
  
  logout(){
    this.token=''
    localStorage.removeItem("ACCES_TOKEN")
    localStorage.removeItem("EXPIRES_IN")
  }

  private saveToken(token: string, expiresIn: string): void{
    localStorage.setItem('ACCES_TOKEN', token)
    localStorage.setItem('EXPIRES_IN', expiresIn)
    this.token=token
  }



  
}
