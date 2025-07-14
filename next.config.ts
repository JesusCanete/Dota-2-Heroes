import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "static.wikia.nocookie.net", // Asegúrate de poner aquí el dominio real que usas para las imágenes
    ],
  },
};

export default nextConfig;
