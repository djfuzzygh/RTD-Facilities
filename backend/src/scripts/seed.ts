import "reflect-metadata"
import { createConnection } from "typeorm"
import { config } from "../config/config"
import { User } from "../models/User"
import { Request } from "../models/Request"

async function seed() {
    try {
        const connection = await createConnection()

        // Create admin user
        const adminUser = User.create({
            id: "admin-id",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin"
        })
        await adminUser.save()

        // Create sample requests
        const sampleRequests = [
            {
                category: "Vehicle",
                description: "Need a car for airport pickup",
                status: "pending",
                priority: "Medium",
                contactPerson: "John Doe",
                createdBy: adminUser.id
            },
            {
                category: "Maintenance",
                description: "AC repair in room 201",
                status: "in_progress",
                priority: "High",
                contactPerson: "Jane Smith",
                createdBy: adminUser.id
            }
        ]

        for (const request of sampleRequests) {
            await Request.create(request).save()
        }

        console.log("Seed completed successfully")
        await connection.close()
    } catch (error) {
        console.error("Error seeding database:", error)
        process.exit(1)
    }
}

seed() 