// PackageFeatures.jsx
import React from 'react';
import FeatureCard from './FeatureCard.jsx';

const featuresData = [
  {
    title: 'Dominio + Hosting por 1 año',
    description: 'Dominio gratuito y hosting incluido durante el primer año.',
    gradientFrom: 'rgba(59, 130, 246, 1)',
    gradientTo: 'rgba(68, 213, 255, 1)',
  },
  {
    title: 'Garantía de 30 días para el servicio técnico',
    description: 'Soporte técnico garantizado durante los primeros 30 días de servicio.',
    gradientFrom: 'rgba(123, 80, 220, 1)',
    gradientTo: 'rgba(184, 98, 255, 1)',
  },
  {
    title: 'Asesoramiento para manejo de inventario y ventas',
    description: 'Consejos expertos para optimizar tu inventario y aumentar tus ventas.',
    gradientFrom: 'rgba(16, 185, 129, 1)',
    gradientTo: 'rgba(80, 250, 123, 1)',
  },
  {
    title: 'Creación de correo corporativo',
    description: 'Correo corporativo profesional para fortalecer tu presencia en línea.',
    gradientFrom: 'rgba(255, 167, 38, 1)',
    gradientTo: 'rgba(255, 239, 184, 1)',
  },
];

const PackageFeatures = () => {
  return (
    <section className="bg-gray-850 text-white py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Descubre lo que obtienes con cada paquete:</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default PackageFeatures;
