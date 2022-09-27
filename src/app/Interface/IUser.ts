export interface IUser
{
    userID: number | string,
    userName:string,
    firstName:string,
    lastName:string,
    emailAddress:string,
    dateCreated:Date,
    phone:string,
    token:string,
    password:string,
    role: 'admin' | 'user';
}
