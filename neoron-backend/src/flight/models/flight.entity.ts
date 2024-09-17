import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('flight')
export class FlightEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    zipOrigin: string;

    @Column()
    countryOrigin: string;

    @Column()
    cityOrigin: string;

    @Column()
    stateOrigin: string;

    @Column()
    zipDestination: string;

    @Column()
    countryDestination: string;

    @Column()
    cityDestination: string;

    @Column()
    stateDestination: string;

    @Column({type: 'timestamp'})
    date: Date;
}