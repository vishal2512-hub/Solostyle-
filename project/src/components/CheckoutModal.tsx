import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerInfo, OrderData } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+₹/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}₹/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create order
    const order: OrderData = {
      id: `ORD-₹{Date.now()}`,
      items: cartItems,
      customerInfo: formData,
      total: getTotalPrice(),
      orderDate: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('shoeOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('shoeOrders', JSON.stringify(existingOrders));

    setOrderData(order);
    setStep('confirmation');
    clearCart();
  };

  const handleClose = () => {
    setStep('form');
    setOrderData(null);
    setFormData({ fullName: '', email: '', phone: '', address: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {step === 'form' ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">Checkout</h2>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Order Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Summary</h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  {cartItems.map((item, index) => (
                    <div key={`₹{item.product.id}-₹{item.size}-₹{index}`} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-slate-800">{item.product.name}</span>
                        <span className="text-slate-600 ml-2">(Size: {item.size}, Qty: {item.quantity})</span>
                      </div>
                      <span className="font-semibold text-slate-800">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Total:</span>
                    <span className="text-xl font-bold text-orange-500">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Customer Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ₹{
                        errors.fullName
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-slate-200 focus:border-orange-500'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ₹{
                        errors.email
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-slate-200 focus:border-orange-500'
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ₹{
                      errors.phone
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none resize-none ₹{
                      errors.address
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your complete shipping address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Place Order</span>
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          /* Order Confirmation */
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Order Confirmed!</h2>
            <p className="text-lg text-slate-600 mb-6">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
            
            {orderData && (
              <div className="bg-slate-50 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-semibold text-slate-800 mb-3">Order Details:</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Order ID:</span> {orderData.id}</p>
                  <p><span className="font-medium">Total:</span> ₹{orderData.total.toFixed(2)}</p>
                  <p><span className="font-medium">Email:</span> {orderData.customerInfo.email}</p>
                  <p><span className="font-medium">Phone:</span> {orderData.customerInfo.phone}</p>
                </div>
              </div>
            )}
            
            <button
              onClick={handleClose}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;