import React from 'react';
import { Shield, Heart, Truck, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Ultimate Comfort",
      description: "Engineered with premium materials and advanced cushioning technology for all-day comfort."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Style",
      description: "Timeless designs that complement any outfit, from casual to professional settings."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Built to Last",
      description: "Crafted with high-quality materials and reinforced construction for exceptional durability."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "Enjoy complimentary shipping on all orders with fast, reliable delivery worldwide."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Why Choose SoleStyle?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We're committed to delivering exceptional quality and service in every pair of shoes we create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-orange-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300">
                <div className="text-orange-500 flex items-center justify-center h-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;