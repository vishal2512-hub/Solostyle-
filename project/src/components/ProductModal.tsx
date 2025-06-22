import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart(product, selectedSize, quantity);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setSelectedSize('');
      setQuantity(1);
    }, 1500);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Added to Cart!</h3>
            <p className="text-slate-600">
              {product.name} has been added to your cart successfully.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">Product Details</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="space-y-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="bg-orange-100 rounded-lg p-3">
                    <span className="text-orange-600 font-medium text-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                      {product.name}
                    </h1>
                    <p className="text-3xl font-bold text-orange-500">
                      ${product.price}
                    </p>
                  </div>

                  <p className="text-slate-600 leading-relaxed">
                    {product.description || `Experience premium comfort and style with the ${product.name}. Crafted with high-quality materials and designed for all-day wear, these shoes are perfect for any occasion.`}
                  </p>

                  {/* Size Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Select Size
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                            selectedSize === size
                              ? 'border-orange-500 bg-orange-50 text-orange-600'
                              : 'border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={decrementQuantity}
                        className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-xl font-semibold text-slate-800 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;