import { Url } from "url"

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string
    date: number
}
export type TProduct = {
    id:string,
    name:string,
    price:number,
    description : string,
    imageUrl: string,
    
}
export type TPurchase = {
    id:string,
    buyer_id: string,
    buyer_name: string,
    totalPrice:number,
    createdAT: number,
    paid: boolean,
}
export enum ProductCategory{
    AIRSOFT = "Airsoft",
    ACESSORIOS = "ACESSORIOS",
    ELETRONICS = "ELETRONICS"
}