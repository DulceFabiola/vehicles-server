interface VehicleTypeInput {
    VehicleTypeId: number;
    VehicleTypeName: string;
}

interface VehicleDataInput {
    makeId: number;
    makeName: string;
    vehicleTypes: VehicleTypeInput[];
}

import { AppDataSource } from '../db/connection';
import { VehicleData } from '../entities/VehicleData';
import { VehicleType } from '../entities/VehicleType';

class DatabaseService {
    async saveVehicleData(vehicleDataArray: VehicleDataInput[]) { 
        const vehicleRepo = AppDataSource.getRepository(VehicleData);

        for (const data of vehicleDataArray) {
            const vehicleData = new VehicleData();
            vehicleData.makeId = data.makeId;
            vehicleData.makeName = data.makeName;

            vehicleData.vehicleTypes = data.vehicleTypes.map((type: VehicleTypeInput) => {
                const vehicleType = new VehicleType();
                vehicleType.vehicleTypeId = type.VehicleTypeId;
                vehicleType.vehicleTypeName = type.VehicleTypeName;
                return vehicleType;
            });

            await vehicleRepo.save(vehicleData);
        }
    }
    async getVehicleData(): Promise<VehicleData[]> {
        const vehicleRepo = AppDataSource.getRepository(VehicleData);
        return await vehicleRepo.find({ relations: ['vehicleTypes'] }); 
    }
}

export default DatabaseService;
