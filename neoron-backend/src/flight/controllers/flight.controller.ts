import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.interface';
import { from, Observable } from 'rxjs';

@Controller('flights')
export class FlightController {
    constructor(
        private flightService: FlightService
    ) {}

    @Post('new')
    create(@Body() flight: Flight): Observable<any>{
        return from(this.flightService.createFlight(flight));
    }

    @Get(':id')
    async getFlight(@Param('id') id: number): Promise<Flight> {
        return await this.flightService.getFlight(id);
    }

    @Get('')
    async getAll(): Promise<Flight[]> {
        return await this.flightService.getAllFlights();
    }

    @Put('update')
    async updateFlight(@Body() flightData: Partial<Flight>) {
        return this.flightService.updateFlight(flightData);
    }
}
