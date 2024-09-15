import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./place.interface";

@Entity('flight')
export class FlightEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('jsonb', {nullable: false})
    origin:Place;

    @Column('jsonb', {nullable: false})
    destination:Place;

    @Column({type: 'timestamp'})
    date: Date;
}