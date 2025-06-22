import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import ProductModal from './ProductModal';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Classic Runner",
      price: 129,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Running",
      description: "Perfect for daily runs and athletic activities. Features advanced cushioning technology and breathable mesh upper.",
      sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
      id: 2,
      name: "Urban Walker",
      price: 149,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Casual",
      description: "Stylish and comfortable for everyday wear. Premium leather construction with modern design elements.",
      sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
      id: 3,
      name: "Elite Sport",
      price: 199,
      image: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Athletic",
      description: "High-performance athletic shoe designed for serious athletes. Superior support and energy return technology.",
      sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
      id: 4,
      name: "Business Pro",
      price: 179,
      image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Formal",
      description: "Professional dress shoe perfect for business settings. Genuine leather with classic styling and comfort features.",
      sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
      id: 5,
      name: "Adventure Trek",
      price: 169,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Outdoor",
      description: "Rugged outdoor shoe built for hiking and adventure. Waterproof construction with superior grip and durability.",
      sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
      id: 6,
      name: "Street Style",
      price: 139,
      image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Lifestyle",
      description: "Trendy lifestyle sneaker with contemporary design. Perfect blend of comfort and street-ready style.",
      sizes: ["7", "8", "9", "10", "11", "12"]
    }
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section id="shop" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Popular Products
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our best-selling shoes that customers love for their quality, comfort, and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleProductClick(product)}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-500">
                      ₹{product.price}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleProductClick(product)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center group"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Products;