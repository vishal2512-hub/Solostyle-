import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

const ProductCard = ({ 
  product = {
    id: 1,
    name: "Premium Running Shoe",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Running",
    rating: 4.5,
    reviews: 128,
    colors: ["#000000", "#FFFFFF", "#FF6B35"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    isNew: true,
    discount: 25
  },
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  className = ""
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedColor,
        selectedSize
      });
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(product.id, !isFavorite);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300 fill-current" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-₹{i}`} className="h-4 w-4 text-gray-300 fill-current" />
      );
    }

    return stars;
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative ₹{className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            NEW
          </span>
        )}
        {product.discount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 ₹{
          isFavorite 
            ? 'bg-red-500 text-white' 
            : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100'
        }`}
      >
        <Heart className={`h-5 w-5 ₹{isFavorite ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-64 sm:h-72 object-cover transition-transform duration-500 ₹{
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ₹{
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handleViewDetails}
            className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-orange-500 font-medium uppercase tracking-wide">
            {product.category}
          </span>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-800">
            ₹{product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Colors:</p>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ₹{
                  selectedColor === color 
                    ? 'border-gray-800 scale-110' 
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color }}
                title={`Color ₹{index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.slice(0, 6).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ₹{
                  selectedSize === size
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;