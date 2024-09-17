import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { FlightEntity } from '../models/flight.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from '../models/flight.interface';
import { Observable } from 'rxjs';
import { differenceInMinutes } from 'date-fns'

@Injectable()
export class FlightService {

    constructor(
        @InjectRepository(FlightEntity)
        private readonly flightRepository: Repository<FlightEntity>
    ){}

    async getFlight(id: number): Promise<Flight> {
        return await this.flightRepository.findOneBy({ id: id });
    }

    async getAllFlights(): Promise<Flight[]> {
        return await this.flightRepository.find();
    }

    async createFlight(flightData: Flight){ 
        if (this.verifyDate(flightData.date)) {
            return "Insira uma data futura!"
        }
        const hasFlightToday = await this.findFlightByDestination(flightData.cityDestination, flightData.stateDestination, flightData.countryDestination, flightData.date);
        if (hasFlightToday.length == 0) {
            const lastFlight = await this.getLast();
            if(lastFlight) {
                const minutesDifference = await this.verifyMinuteDifference(flightData.date, lastFlight.date);
                if(!minutesDifference) {
                    return "Cada voo deve possuir no minimo 30 minutos de diferença. Horário do ultimo voo: " + lastFlight.date;
                }
            }
            this.flightRepository.save(flightData);
            return "Voo criado com sucesso"
        }
        return "Não é permitido mais de um voo para o mesmo destino no mesmo dia!"
    }

    async updateFlight(flightData: Partial<Flight>){
        const flight = await this.flightRepository.findOneBy({ id:flightData.id });

        if (!flight) {
            throw new Error('Voo não encontrado');
        }

        if (this.verifyDate(flightData.date)) {
            return "Insira uma data futura!"
        }
        const hasFlightToday = await this.findFlightByDestination(flightData.cityDestination, flightData.stateDestination, flightData.countryDestination, flightData.date);
        if (hasFlightToday.length == 0) {
            const lastFlight = await this.getLast();
            if(lastFlight) {
                const minutesDifference = await this.verifyMinuteDifference(flightData.date, lastFlight.date);
                if(!minutesDifference) {
                    return "Cada voo deve possuir no minimo 30 minutos de diferença. Horário do ultimo voo: " + lastFlight.date;
                }
            }

            Object.assign(flight, flightData);

            this.flightRepository.save(flight);
            return "Voo editado com sucesso"
        }
        return "Não é permitido mais de um voo para o mesmo destino no mesmo dia!"
    }

    async findFlightByDestination(cityDestination: string, stateDestination: string, countryDestination: string, date: Date): Promise<Flight[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        return this.flightRepository.find({
            where: {
                cityDestination: cityDestination,
                stateDestination: stateDestination,
                countryDestination: countryDestination,
                date: Between(startOfDay, endOfDay),
            },
        });
    }

    async verifyMinuteDifference(newDate, lastDate): Promise<boolean>{
        const lastFlightDate = new Date(lastDate);
        const newFlightDate = new Date(newDate);
                
        const differenceTime = differenceInMinutes(newFlightDate, lastFlightDate);
        if (differenceTime < 30) {
            return false;
        }
        return true;
    }

    async getLast(): Promise<Flight | null> {
        const flights = await this.flightRepository.find({
            order: {
                id: 'DESC',
            },
            take: 1,
        });
    
        return flights.length > 0 ? flights[0] : null;
    }

    verifyDate(flightDate: Date) {
        const flightDepartureDate = new Date(flightDate);
        const currDate = new Date();

        return flightDepartureDate.getTime() < currDate.getTime();
    }
}
