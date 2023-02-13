import Person from "./Person";
export default class child extends Person{
    constructor(Id:number,IdentityNumber:string,FirstName:string,DateOfBirth:Date){
        super(Id,IdentityNumber,FirstName,DateOfBirth)
    }
}