import { Rent } from 'src/modules/rent/entities/rent.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique:true, nullable:false})
    code: string;
    
    @Column({nullable:false})
    title: string;
    
    @Column({nullable:false})
    author: string;
    
    @Column({nullable:false, default:0})
    stock: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Rent, rent => rent.book)
    rents: Rent[];
}