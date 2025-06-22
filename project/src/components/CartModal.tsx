import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    onClose();
    onProceedToCheckout();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Your cart is empty</h3>
              <p className="text-slate-600 mb-6">Add some shoes to get started!</p>
              <button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.product.id}-${item.size}-${index}`} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{item.product.name}</h3>
                      <p className="text-sm text-slate-600">Size: {item.size}</p>
                      <p className="text-lg font-bold text-orange-500">${item.product.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-white transition-colors duration-200"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-lg font-semibold text-slate-800 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-white transition-colors duration-200"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-slate-800">Total:</span>
                  <span className="text-2xl font-bold text-orange-500">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={onClose}
                    className="flex-1 border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-slate-50"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handleProceedToCheckout}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;