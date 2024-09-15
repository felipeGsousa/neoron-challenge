import { Module } from '@nestjs/common';
import { FlightService } from './services/flight.service';
import { FlightController } from './controllers/flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from './models/flight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlightEntity])
  ],
  providers: [FlightService],
  controllers: [FlightController]
})
export class FlightModule {}
