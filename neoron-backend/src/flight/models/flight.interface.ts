
export interface Flight {
    id?:number;
    zipOrigin: string;
    countryOrigin: string;
    cityOrigin: string;
    stateOrigin: string;
    zipDestination: string;
    countryDestination: string;
    cityDestination: string;
    stateDestination: string;
    date:Date;
}