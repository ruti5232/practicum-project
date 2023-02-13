import Child from "./Child";
import Person from "./Person";

export default class User extends Person{
    constructor(Id:number,IdentityNumber:string,FirstName:string,DateOfBirth:Date,public LastName:string,public GenderId:number,public HMOId:number,public Children:Child[]){
        super(Id,IdentityNumber,FirstName,DateOfBirth)
    }
}
