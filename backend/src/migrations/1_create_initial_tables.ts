import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateInitialTables1709123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users table
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "role",
                    type: "varchar",
                    default: "'user'"
                },
                {
                    name: "created_at",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }), true)

        // Requests table
        await queryRunner.createTable(new Table({
            name: "requests",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "category",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "text"
                },
                {
                    name: "status",
                    type: "varchar",
                    default: "'pending'"
                },
                {
                    name: "priority",
                    type: "varchar"
                },
                {
                    name: "contact_person",
                    type: "varchar"
                },
                {
                    name: "attachment_url",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "created_by",
                    type: "varchar"
                },
                {
                    name: "assigned_to",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["created_by"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"]
                },
                {
                    columnNames: ["assigned_to"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"]
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("requests")
        await queryRunner.dropTable("users")
    }
} 