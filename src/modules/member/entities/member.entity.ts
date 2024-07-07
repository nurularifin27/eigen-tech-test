import { Rent } from 'src/modules/rent/entities/rent.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique:true, nullable:false})
    code: string;
    
    @Column({nullable:false})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Rent, rent => rent.member)
    rents: Rent[];
}