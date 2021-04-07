export interface JwtResponseP {
    dataPasajero:{
    id: number,
    strNombre: string,
    strEmail: string,
    strRfcCurp: string, 
    nmbCelular: [number],
    accessToken: string,
    expiresIn: string
    }
}
