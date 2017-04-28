export class Contenido{
  constructor(
    public id:number,
    public title:string,
    public text:string,
    public coords?:any[],
    public images?:string[],
    public web?:string,
   ){}
}