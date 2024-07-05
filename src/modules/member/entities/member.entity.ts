import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}