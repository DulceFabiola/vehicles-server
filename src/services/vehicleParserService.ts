import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface VehicleMake {
    Make_ID: number;
    Make_Name: string;
}

interface VehicleType {
    VehicleTypeId: number;
    VehicleTypeName: string;
}

interface VehicleData {
    makeId: number;
    makeName: string;
    vehicleTypes: VehicleType[];
}

class XmlParserService {
    private static BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

    async getAllMakes(): Promise<VehicleMake[]> {
        const response = await axios.get(`${XmlParserService.BASE_URL}/getallmakes?format=xml`);
        const result = await parseStringPromise(response.data);
        return result.Response.Results[0].Make.map((make: { Make_ID: [string]; Make_Name: [string] }) => ({
            Make_ID: parseInt(make.Make_ID[0], 10),
            Make_Name: make.Make_Name[0],
        }));
    }

    async getVehicleTypesForMake(makeId: number): Promise<VehicleType[]> {
        const response = await axios.get(`${XmlParserService.BASE_URL}/GetVehicleTypesForMakeId/${makeId}?format=xml`);
        const result = await parseStringPromise(response.data);

        return result.Response.Results[0].VehicleType.map((type: { VehicleTypeId: [string]; VehicleTypeName: [string] }) => ({
            VehicleTypeId: parseInt(type.VehicleTypeId[0], 10),
            VehicleTypeName: type.VehicleTypeName[0],
        }));
    }

    async getCombinedVehicleData(): Promise<VehicleData[]> {
        const makes = await this.getAllMakes();

        const vehicleData = await Promise.all(makes.map(async (make) => {
            const vehicleTypes = await this.getVehicleTypesForMake(make.Make_ID);
            return {
                makeId: make.Make_ID,
                makeName: make.Make_Name,
                vehicleTypes,
            };
        }));

        return vehicleData;
    }
}

export default XmlParserService;