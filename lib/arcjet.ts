// lib/arcjet.ts

import arcjet, { tokenBucket } from "@arcjet/next";

// Se exporta 'aj' para que cualquier archivo lo pueda importar.
export const aj = arcjet({ 
  // Asegúrate de que esta clave de entorno esté configurada en Vercel
  key: process.env.ARCJET_KEY!, 
  rules: [
    // El límite de tasa que definiste
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"],
      refillRate: 5,
      interval: 86400, // 24 horas
      capacity: 30,
    }),
  ],
});

// ¡No debe haber ninguna función de ruta (GET, POST, etc.) aquí!