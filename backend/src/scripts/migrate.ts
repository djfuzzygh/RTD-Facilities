import "reflect-metadata"
import { createConnection } from "typeorm"
import { config } from "../config/config"

async function runMigrations() {
    try {
        const connection = await createConnection({
            type: "mssql",
            host: config.database.server,
            database: config.database.name,
            username: config.database.user,
            password: await config.database.getPassword(),
            entities: [__dirname + "/../models/*.ts"],
            migrations: [__dirname + "/../migrations/*.ts"],
            cli: {
                migrationsDir: "src/migrations"
            }
        })

        await connection.runMigrations()
        console.log("Migrations completed successfully")
        await connection.close()
    } catch (error) {
        console.error("Error running migrations:", error)
        process.exit(1)
    }
}

runMigrations() 