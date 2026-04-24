import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mechanic Pro API",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Vehicle: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        brand: { type: "string" },
                        model: { type: "string" },
                        plate: { type: "string" },
                        owner: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                CreateVehicle: {
                    type: "object",
                    properties: {
                        brand: { type: "string" },
                        model: { type: "string" },
                        plate: { type: "string" },
                        ownerId: { type: "string" },
                    },
                },
                UpdateVehicle: {
                    type: "object",
                    properties: {
                        brand: { type: "string" },
                        model: { type: "string" },
                        plate: { type: "string" },
                        ownerId: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts", "./docs/routes/*.ts"],
});