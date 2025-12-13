import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { nanoid } from "nanoid";

// Esse decoretor transforma essa classe em uma tabela
// O "nullablew permite que o usuario saia e volte quando quiser"
@Entity()
export class Registration {
    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    generateId() {
        this.id = nanoid(10); // gera 10 caracteres
    }

    //step 1: identificação
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    email: string;

    //step 2: Documento
    @Column({ nullable: true })
    document: string;

    //step 3: Contato
    @Column({ nullable: true })
    phone: string;

    //step4: Endereço
    @Column({ nullable: true })
    cep: string;

    @Column({ nullable: true })
    street: string;

    @Column({ nullable: true })
    neighborhood: string;

    @Column({ nullable: true })
    number: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    startedAt: Date;

    @Column({ type: 'timestamptz', nullable: true })
    finishedAt?: Date | null;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
