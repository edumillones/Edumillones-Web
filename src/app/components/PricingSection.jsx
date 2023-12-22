import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const PricingSection = () => {
  return (
    <section
      id="paquetes"
      className="min-h-screen w-full py-16 bg-gray-850 dark:bg-gray-850 flex items-center justify-center"
    >
      <div className="container bg-blackpx-4 md:px-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Elige el Plan que se Adapte a tus Necesidades
        </h2>
        <div className="grid bg-blackgrid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          {/* Plan Starter */}
          <div className="flex flex-col p-6 bg-black shadow-lg rounded-lg justify-between border border-white">
            <div>
              <h3 className="text-2xl font-bold text-center text-white dark:text-white">
                Plan Starter
              </h3>
              <div className="mt-4 text-center text-gray-400 dark:text-gray-500">
                <span className="text-4xl font-bold text-gray-300">360 PEN</span> / único pago
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Diseño y configuración de Inicio, Catálogo, Contacto, Producto y Carrito de Compras.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Diseño responsive (PC, celular y tablet)
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Pasarela de pago integrada 100% segura.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Manejo de Inventario, Gestión de hasta 50 productos.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Envíos nacionales, configuración de productos para envíos dentro del país.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Indexado en Google; optimización inicial para motores de búsqueda.
                </li>
                <li className="flex items-center">
                <div className="icon-container bg-yellow-500 rounded-full mr-2 p-1">
                    <FaStar className="text-white text-lg dark:text-white" />
                  </div>
                  Entrega en 5-6 días habiles, previa evaluación.
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-800 hover:bg-gray-100 h-10 px-4 py-2 w-full">
                Comenzar
              </a>
              
            </div>
          </div>

          <div className="relative flex flex-col p-6 bg-black shadow-lg rounded-lg justify-between border border-purple-500">
            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Popular
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center text-white  ">
                Plan Business
              </h3>
              <div className="mt-4 text-center text-gray-400 dark:text-gray-500">
                <span className="text-4xl font-bold text-gray-300">500 PEN</span> / único pago
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <div className="icon-container bg-yellow-500 rounded-full mr-2 p-1">
                    <FaStar className="text-white text-lg dark:text-white" />
                  </div>
                  Incluye todas las características del Plan Starter y añade:
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Manejo de Inventario ampliado, Gestión de hasta 100 productos, cada producto con variaciones (tamaño, color, tipo).
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Páginas Principales Personalizadas, Diseño y configuración de Inicio, Catálogo, Contacto, Producto y Carrito de Compras.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Envíos Internacionales: Configuración para envíos internacionales.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Funcionalidades Adicionales: Sistema de reseñas de productos, Integración de monedas extranjeras dentro de la pasarela de pagos.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Funcionalidades de Marketing: Integración con redes sociales y blog integrado.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  SEO Mejorado: Optimización SEO intermedia.
                </li>
                <li className="flex items-center">
                <div className="icon-container bg-yellow-500 rounded-full mr-2 p-1">
                    <FaStar className="text-white text-lg dark:text-white" />
                  </div>
                  Entrega en 5-6 días habiles, previa evaluación.
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-white hover:bg-gray-100 h-10 px-4 py-2 w-full bg-gradient-to-r from-pink-500 to-purple-500">
                Comenzar
              </a>
            </div>
          </div>

          <div className="flex flex-col p-6 bg-black shadow-lg rounded-lg justify-between border border-white">
            <div>
              <h3 className="text-2xl font-bold text-center text-white">
                Plan Premium
              </h3>
              <div className="mt-4 text-center text-gray-400 dark:text-gray-500">
                <span className="text-4xl font-bold text-gray-300">1300 PEN</span> / único pago
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                <div className="icon-container bg-yellow-500 rounded-full mr-2 p-1">
                    <FaStar className="text-white text-lg dark:text-white" />
                  </div>
                  Incluye todas las características del Plan Business y añade:
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Posicionamiento de Élite en Google; optimización avanzada para destacar entre los primeros motores de búsqueda.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Soporte y Consultoría VIP: Asesoría y soporte técnico avanzado para una experiencia sin preocupaciones.
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Manejo de Inventario Ampliado: Gestión de hasta 500 productos, cada producto con variaciones detalladas (tamaño, color, tipo).
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Diseño Exclusivo y Programación Avanzada: Pop-ups, ventanas emergentes, banners interactivos, video banners, ¡una experiencia visual impactante!
                </li>
                <li className="flex items-center">
                  <div className="icon-container bg-green-500 rounded-full mr-2 p-1">
                    <FaCheck className="text-white text-lg dark:text-white" />
                  </div>
                  Análisis Profundo de Datos: Descubre tus productos más vendidos, realiza un seguimiento de las visitas en tiempo real con ubicación geográfica, identifica tendencias de compra, y más.
                </li>
                <li className="flex items-center">
                <div className="icon-container bg-yellow-500 rounded-full mr-2 p-1">
                    <FaStar className="text-white text-lg dark:text-white" />
                  </div>
                  Entrega estimada previa evaluación, adaptada a tus necesidades específicas.
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-800 hover:bg-gray-100 h-10 px-4 py-2 w-full">
                Comenzar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
