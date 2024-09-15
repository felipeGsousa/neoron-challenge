import { Place } from "./place.interface";

export interface Flight {
    id?:number;
    origin:Place;
    destination:Place;
    date:Date;
}