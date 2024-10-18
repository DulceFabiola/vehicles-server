import { DataSource } from 'typeorm';
import { VehicleData } from '../entities/VehicleData';
import { VehicleType } from '../entities/VehicleType';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/vehicles.db',
    synchronize: true,
    entities: [VehicleData, VehicleType],
});
