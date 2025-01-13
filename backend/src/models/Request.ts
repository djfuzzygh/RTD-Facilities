import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  category: 'Vehicle' | 'Flight' | 'Maintenance' | 'General'

  @Column()
  description: string

  @Column()
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress'

  @Column()
  priority: 'Low' | 'Medium' | 'High'

  @Column()
  contactPerson: string

  @Column()
  assignedTo?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 