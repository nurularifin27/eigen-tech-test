import { Book } from 'src/modules/book/entities/book.entity';
import { Member } from 'src/modules/member/entities/member.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    code: string;

    @ManyToOne(() => Book, book => book.rents, { eager:true })
    book: Book;

    @ManyToOne(() => Member, member => member.rents, { eager: true })
    member: Member;

    @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE'  })
    rentDate: Date;

    @Column({ type: 'date', nullable: true })
    returnDate: Date;

    @Column({ nullable: false, default: false })
    isLate: boolean;

    @Column({ type: 'enum', enum: ['borrowed', 'returned'], default: 'borrowed'})
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
