export interface JwtResponseC {
    dataConductor:{
    id: number,
    strNombre: string,
    strEmail: string,
    nmbCelular: [number],
    strRfcCurp: string,
    accessToken: string,
    expiresIn: string
    }
}
