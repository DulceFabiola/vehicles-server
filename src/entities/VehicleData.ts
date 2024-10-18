import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VehicleType } from './VehicleType';

@Entity()
export class VehicleData {
    @PrimaryGeneratedColumn()
    id!: number;  

    @Column()
    makeId!: number;

    @Column()
    makeName!: string;

    @OneToMany(() => VehicleType, vehicleType => vehicleType.vehicleData)
    vehicleTypes!: VehicleType[];
}
