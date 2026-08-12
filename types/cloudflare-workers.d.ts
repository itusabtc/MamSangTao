/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'cloudflare:workers' {
  export const env: {
    DB: {
      prepare(sql:string): any
      batch(statements:any[]):Promise<any[]>
    }
  }
}
