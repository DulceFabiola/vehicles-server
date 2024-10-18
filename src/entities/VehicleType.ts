import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VehicleData } from './VehicleData';

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    vehicleTypeId!: number;

    @Column()
    vehicleTypeName!: string;

    @ManyToOne(() => VehicleData, vehicleData => vehicleData.vehicleTypes)
    vehicleData!: VehicleData;
}
