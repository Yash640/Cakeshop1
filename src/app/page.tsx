'use client';

import ImageGallery from '@/components/ImageGallery';
import OrderModal from '@/components/OrderModal';
import { useState } from 'react';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    price: string;
    description?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState<Array<{
    id: string;
    name: string;
    price: number;
    description?: string;
    quantity: number;
  }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUpiOpen, setIsUpiOpen] = useState(false);

  const handleItemClick = (name: string, price: string, description?: string) => {
    setSelectedItem({ name, price, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const addToCart = (name: string, price: string, description?: string) => {
    const priceNumber = parseInt(price.replace('₹ ', ''));
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === name 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: Date.now().toString(),
        name,
        price: priceNumber,
        description,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    const orderItems = cart.map(item => 
      `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');
    
    const total = getCartTotal();
    const message = `Hi! I would like to place an order:\n\n${orderItems}\n\nTotal: ₹${total}\n\nPlease confirm availability and delivery details.`;
    
    return encodeURIComponent(message);
  };

  const upiVpa = 'manasvidhokale-1@oksbi';
  const upiPayeeName = 'Manasvi Dhokale';
  const upiNote = 'Sweet Dreams Order';

  const buildUpiLink = () => {
    const amount = getCartTotal();
    const params = new URLSearchParams({
      pa: upiVpa, // VPA
      pn: upiPayeeName,
      tn: upiNote,
      am: amount.toString(),
      cu: 'INR'
    });
    return `upi://pay?${params.toString()}`;
  };

  const qrSrc = () => {
    const link = buildUpiLink();
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=240x240`;
  };

  const appIntentLink = (packageName: string) => {
    const upi = encodeURIComponent(buildUpiLink());
    // Android intent URL; on non-Android it will just use the href target if supported
    return `intent://${upi.replace('upi%3A%2F%2Fpay%3F', 'pay%3F')}#Intent;scheme=upi;package=${packageName};end`;
  };

  const isIOS = () => {
    if (typeof navigator === 'undefined') return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Copied to clipboard');
    }
  };

  const renderQuantityButton = (name: string, price: string, description: string, cardColor: string) => {
    const cartItem = cart.find(item => item.name === name);
    
    if (cartItem) {
      return (
        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
            style={{borderColor: cardColor, color: cardColor}}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className="fw-semibold" style={{color: cardColor, minWidth: '20px', textAlign: 'center'}}>
            {cartItem.quantity}
          </span>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
            style={{borderColor: cardColor, color: cardColor}}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      );
    } else {
      return (
        <button 
          className="btn btn-sm"
          onClick={() => addToCart(name, price, description)}
          style={{backgroundColor: cardColor, borderColor: cardColor, color: 'white'}}
        >
          <i className="fas fa-plus me-1"></i>Add
        </button>
      );
    }
  };
  const galleryImages = [
    {
      src: '/images/cake1.jpg',
      alt: 'Luxury Chocolate Delight',
      title: 'Luxury Chocolate Delight',
      description: 'Rich chocolate cake with gold accents and premium decorations',
      fallbackClass: 'cake-bg-1'
    },
    {
      src: '/images/cake2.jpg',
      alt: 'Oreo Birthday Special',
      title: 'Oreo Birthday Special',
      description: 'Creamy Oreo cake with chocolate crumbs and birthday celebration',
      fallbackClass: 'cake-bg-2'
    },
    {
      src: '/images/cake3.jpg',
      alt: 'Almond Chocolate Masterpiece',
      title: 'Almond Chocolate Masterpiece',
      description: 'Chocolate cake with almond coating and elegant birthday topper',
      fallbackClass: 'cake-bg-3'
    },
    {
      src: '/images/cake4.jpg',
      alt: 'Golden Luxury Box',
      title: 'Golden Luxury Box',
      description: 'Premium chocolate cake with gold leaf and glitter decorations',
      fallbackClass: 'cake-bg-4'
    },
    {
      src: '/images/cake5.jpg',
      alt: 'Two-Tier Delight',
      title: 'Two-Tier Delight',
      description: 'Elegant two-tier cake with chocolate drizzle and almond coating',
      fallbackClass: 'cake-bg-5'
    }
  ];
  return (
    <main>
      {/* Hero Section with Image Overlay */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-bg position-absolute w-100 h-100"></div>
        <div className="hero-overlay position-absolute w-100 h-100"></div>
        <div className="container position-relative" style={{zIndex: 2}}>
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-8 mx-auto text-center text-white">
              <h1 className="display-2 fw-bold mb-4 hero-title">
                Where Sweet Dreams Come True
              </h1>
              <p className="lead mb-5 hero-subtitle">
                Indulge in our handcrafted masterpieces — from decadent chocolate truffles to 
                fresh berry delights, each creation tells a story of passion and perfection.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="#menu" className="btn btn-light btn-lg px-4 py-3">Explore Menu</a>
                <a href="#stall-products" className="btn btn-lg px-4 py-3 btn-stall-highlight">🔥 Stall Products</a>
                <a href="#order" className="btn btn-outline-light btn-lg px-4 py-3">Order Now</a>
                <button 
                  className="btn btn-warning btn-lg px-4 py-3 position-relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Cart
                  {getCartItemCount() > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {getCartItemCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stall Products Section */}
      <section id="stall-products" className="py-5 bg-body-tertiary">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Stall Products</h2>
            <p className="lead text-muted">Items available at our stall</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-danger text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🍫</span>
                    Chocolates & Brownies
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Oreo Chocolate Mousse Shots</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 99</span>
                          {renderQuantityButton('Oreo Chocolate Mousse Shots', '₹ 99', '', '#ef4444')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Choco Lava Cake</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 120</span>
                          {renderQuantityButton('Choco Lava Cake', '₹ 120', '', '#ef4444')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Chip Brownie</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 90</span>
                          {renderQuantityButton('Chocolate Chip Brownie', '₹ 90', '', '#ef4444')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-success text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🍮</span>
                    Glass Cakes & Pastries
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Glass Cake (Red Velvet)</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 160</span>
                          {renderQuantityButton('Glass Cake (Red Velvet)', '₹ 160', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Glass Cake (KitKat)</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 160</span>
                          {renderQuantityButton('Glass Cake (KitKat)', '₹ 160', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Glass Cake (Oreo)</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 140</span>
                          {renderQuantityButton('Glass Cake (Oreo)', '₹ 140', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Glass Cake (Chocolate)</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 120</span>
                          {renderQuantityButton('Glass Cake (Chocolate)', '₹ 120', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Red Velvet Pastry</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 180</span>
                          {renderQuantityButton('Red Velvet Pastry', '₹ 180', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Oreo Chocolate Truffle Pastry</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 180</span>
                          {renderQuantityButton('Oreo Chocolate Truffle Pastry', '₹ 180', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Cheesecake Pastry</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 210</span>
                          {renderQuantityButton('Cheesecake Pastry', '₹ 210', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Truffle Pastry</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 180</span>
                          {renderQuantityButton('Chocolate Truffle Pastry', '₹ 180', '', '#04c224')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-info text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🧁</span>
                    Cupcakes & Bowls
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Cupcake Pack of 4</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'}}>₹ 199</span>
                          {renderQuantityButton('Cupcake Pack of 4', '₹ 199', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Cupcake Pack of 6</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'}}>₹ 299</span>
                          {renderQuantityButton('Cupcake Pack of 6', '₹ 299', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Cake Bowl (Classic)</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'}}>₹ 200</span>
                          {renderQuantityButton('Cake Bowl (Classic)', '₹ 200', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Cake Bowl (KitKat)</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'}}>₹ 300</span>
                          {renderQuantityButton('Cake Bowl (KitKat)', '₹ 300', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-warning text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🍬</span>
                    Candies & Packs
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Dry Fruit Chocolate</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 10</span>
                          {renderQuantityButton('Dry Fruit Chocolate', '₹ 10', '', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Coconut Candy Filling</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 10</span>
                          {renderQuantityButton('Coconut Candy Filling', '₹ 10', '', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Pack of 6 Dry Fruit Chocolates</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 199</span>
                          {renderQuantityButton('Pack of 6 Dry Fruit Chocolates', '₹ 199', '', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Pack of 6 Coconut Candies</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 199</span>
                          {renderQuantityButton('Pack of 6 Coconut Candies', '₹ 199', '', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a 
              href={`https://wa.me/917558392001?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-lg"
            >
              <i className="fab fa-whatsapp me-2"></i>Order Selected Stall Items
            </a>
          </div>
        </div>
      </section>

      {/* Beautiful Cake Image Sections */}
      <section className="py-0">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="cake-image-section position-relative overflow-hidden">
              <div className="cake-bg-1 position-absolute w-100 h-100"></div>
              <div className="overlay-dark position-absolute w-100 h-100"></div>
              <div className="container-fluid h-100 d-flex align-items-center">
                <div className="row w-100">
                  <div className="col-lg-8 mx-auto text-center text-white">
                    <h2 className="display-4 fw-bold mb-3 overlay-title">Baked with Love</h2>
                    <p className="lead overlay-subtitle">Every creation is a masterpiece of passion and artistry</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="cake-image-section position-relative overflow-hidden">
              <div className="cake-bg-2 position-absolute w-100 h-100"></div>
              <div className="overlay-dark position-absolute w-100 h-100"></div>
              <div className="container-fluid h-100 d-flex align-items-center">
                <div className="row w-100">
                  <div className="col-lg-8 mx-auto text-center text-white">
                    <h2 className="display-4 fw-bold mb-3 overlay-title">Deliciously Yours</h2>
                    <p className="lead overlay-subtitle">Custom creations for your most precious celebrations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-md-6">
            <div className="cake-image-section position-relative overflow-hidden">
              <div className="cake-bg-3 position-absolute w-100 h-100"></div>
              <div className="overlay-dark position-absolute w-100 h-100"></div>
              <div className="container-fluid h-100 d-flex align-items-center">
                <div className="row w-100">
                  <div className="col-lg-8 mx-auto text-center text-white">
                    <h2 className="display-4 fw-bold mb-3 overlay-title">Endless Cravings</h2>
                    <p className="lead overlay-subtitle">From classic favorites to innovative flavors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="cake-image-section position-relative overflow-hidden">
              <div className="cake-bg-4 position-absolute w-100 h-100"></div>
              <div className="overlay-dark position-absolute w-100 h-100"></div>
              <div className="container-fluid h-100 d-flex align-items-center">
                <div className="row w-100">
                  <div className="col-lg-8 mx-auto text-center text-white">
                    <h2 className="display-4 fw-bold mb-3 overlay-title">Mouth-Watering Delicacies</h2>
                    <p className="lead overlay-subtitle">Finest ingredients, unforgettable experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Delicious Menu</h2>
            <p className="lead text-muted">Freshly baked treats made with love</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-primary text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🍰</span>
                    Chocolate Cakes
                    <small className="ms-auto opacity-75">(1/2 kg)</small>
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Black Forest</h6>
                          <small className="text-muted">Classic chocolate with cherries</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 400</span>
                          {renderQuantityButton('Black Forest', '₹ 400', 'Classic chocolate with cherries', '#e91e63')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Chip</h6>
                          <small className="text-muted">Rich chocolate with chips</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 550</span>
                          {renderQuantityButton('Chocolate Chip', '₹ 550', 'Rich chocolate with chips', '#e91e63')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Oreo</h6>
                          <small className="text-muted">Creamy oreo delight</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 550</span>
                          {renderQuantityButton('Oreo Cake', '₹ 550', 'Creamy oreo delight', '#e91e63')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Truffle</h6>
                          <small className="text-muted">Decadent truffle experience</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 600</span>
                          {renderQuantityButton('Chocolate Truffle Cake', '₹ 600', 'Decadent truffle experience', '#e91e63')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Nutella Truffle</h6>
                          <small className="text-muted">Hazelnut chocolate perfection</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 650</span>
                          {renderQuantityButton('Nutella Truffle Cake', '₹ 650', 'Hazelnut chocolate perfection', '#e91e63')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Ferrero Rocher</h6>
                          <small className="text-muted">Premium hazelnut luxury</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge">₹ 650</span>
                          {renderQuantityButton('Ferrero Rocher Cake', '₹ 650', 'Premium hazelnut luxury', '#e91e63')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-success text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🎂</span>
                    Classic Cakes
                    <small className="ms-auto opacity-75">(1/2 kg)</small>
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Pineapple</h6>
                          <small className="text-muted">Tropical pineapple delight</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>₹ 500</span>
                          {renderQuantityButton('Pineapple Cake', '₹ 500', 'Tropical pineapple delight', '#10b981')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Rasmalai</h6>
                          <small className="text-muted">Traditional Indian dessert</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>₹ 600</span>
                          {renderQuantityButton('Rasmalai Cake', '₹ 600', 'Traditional Indian dessert', '#10b981')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Red Velvet</h6>
                          <small className="text-muted">Classic red velvet elegance</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>₹ 600</span>
                          {renderQuantityButton('Red Velvet Cake', '₹ 600', 'Classic red velvet elegance', '#10b981')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-warning text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🥣</span>
                    Cake Bowls
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Classic Bowl</h6>
                          <small className="text-muted">Simple and delicious</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 200</span>
                          {renderQuantityButton('Classic Cake Bowl', '₹ 200', 'Simple and delicious', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Triple Chocolate Bowl</h6>
                          <small className="text-muted">Three layers of chocolate</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 210</span>
                          {renderQuantityButton('Triple Chocolate Bowl', '₹ 210', 'Three layers of chocolate', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Nutella Bowl</h6>
                          <small className="text-muted">Hazelnut spread heaven</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 230</span>
                          {renderQuantityButton('Nutella Cake Bowl', '₹ 230', 'Hazelnut spread heaven', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">KitKat Bowl</h6>
                          <small className="text-muted">Crunchy kitkat surprise</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 300</span>
                          {renderQuantityButton('KitKat Cake Bowl', '₹ 300', 'Crunchy kitkat surprise', '#f59e0b')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-info text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🧁</span>
                    Cupcakes
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-2">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Coffee</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 100</span>
                          {renderQuantityButton('Coffee Cupcake', '₹ 100', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Chocolate</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 100</span>
                          {renderQuantityButton('Chocolate Cupcake', '₹ 100', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Red Velvet</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 65</span>
                          {renderQuantityButton('Red Velvet Cupcake', '₹ 65', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Pineapple</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 65</span>
                          {renderQuantityButton('Pineapple Cupcake', '₹ 65', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Oreo</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 85</span>
                          {renderQuantityButton('Oreo Cupcake', '₹ 85', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Cookies Cream</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 95</span>
                          {renderQuantityButton('Cookies Cream Cupcake', '₹ 95', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Peanut Butter</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 100</span>
                          {renderQuantityButton('Peanut Butter Cupcake', '₹ 100', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Hazelnut</h6>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 120</span>
                          {renderQuantityButton('Hazelnut Cupcake', '₹ 120', '', '#0ea5e9')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-danger text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🍫</span>
                    Brownies
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Dark Chocolate</h6>
                          <small className="text-muted">Rich and intense</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 90</span>
                          {renderQuantityButton('Dark Chocolate Brownie', '₹ 90', 'Rich and intense', '#ef4444')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Chip</h6>
                          <small className="text-muted">Classic with chips</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 90</span>
                          {renderQuantityButton('Chocolate Chip Brownie', '₹ 90', 'Classic with chips', '#ef4444')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Almond Fudge</h6>
                          <small className="text-muted">Nutty fudge delight</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 100</span>
                          {renderQuantityButton('Almond Fudge Brownie', '₹ 100', 'Nutty fudge delight', '#ef4444')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Walnut Peanut</h6>
                          <small className="text-muted">Crunchy nut combination</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 100</span>
                          {renderQuantityButton('Walnut Peanut Brownie', '₹ 100', 'Crunchy nut combination', '#ef4444')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Butter</h6>
                          <small className="text-muted">Rich buttery goodness</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 100</span>
                          {renderQuantityButton('Butter Brownie', '₹ 100', 'Rich buttery goodness', '#ef4444')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-lg category-card overflow-hidden">
                <div className="card-header bg-gradient-success text-white py-3">
                  <h4 className="card-title mb-0 d-flex align-items-center">
                    <span className="me-2">🍮</span>
                    Glass Cake
                  </h4>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate</h6>
                          <small className="text-muted">Classic chocolate glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 120</span>
                          {renderQuantityButton('Chocolate Glass Cake', '₹ 120', 'Classic chocolate glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Coffee</h6>
                          <small className="text-muted">Rich coffee glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 140</span>
                          {renderQuantityButton('Coffee Glass Cake', '₹ 140', 'Rich coffee glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Oreo</h6>
                          <small className="text-muted">Creamy oreo glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 140</span>
                          {renderQuantityButton('Oreo Glass Cake', '₹ 140', 'Creamy oreo glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Pineapple</h6>
                          <small className="text-muted">Tropical pineapple glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 140</span>
                          {renderQuantityButton('Pineapple Glass Cake', '₹ 140', 'Tropical pineapple glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Kit-Kat</h6>
                          <small className="text-muted">Crunchy kit-kat glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 150</span>
                          {renderQuantityButton('Kit-Kat Glass Cake', '₹ 150', 'Crunchy kit-kat glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Triple Choco</h6>
                          <small className="text-muted">Triple chocolate glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 150</span>
                          {renderQuantityButton('Triple Choco Glass Cake', '₹ 150', 'Triple chocolate glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Rasmalai</h6>
                          <small className="text-muted">Traditional rasmalai glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 160</span>
                          {renderQuantityButton('Rasmalai Glass Cake', '₹ 160', 'Traditional rasmalai glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Red Velvet</h6>
                          <small className="text-muted">Classic red velvet glass cake</small>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="price-badge" style={{background: 'linear-gradient(135deg, #04c224 0%, #495057 100%)'}}>₹ 160</span>
                          {renderQuantityButton('Red Velvet Glass Cake', '₹ 160', 'Classic red velvet glass cake', '#04c224')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Image Gallery Slider */}
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-white">Our Delicious Creations</h2>
            <p className="lead text-light">See the magic we create in our kitchen</p>
          </div>
          
          <ImageGallery images={galleryImages} />
          
          <div className="text-center mt-4">
            <a href="https://wa.me/917558392001" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <i className="fab fa-whatsapp me-2"></i>
              Order Your Custom Cake
            </a>
          </div>
        </div>
      </section>

      {/* Developer and Order Section */}
      <section id="contact" className="py-5 bg-body-tertiary">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-2 text-white">Developer Yash Andhale</h3>
            </div>
            <div className="col-lg-6 text-lg-end">
              <a id="order" className="btn btn-primary btn-lg" href="https://wa.me/917558392001" target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            {/* About Section */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-section">
                <h4 className="fw-bold mb-3 text-warning">
                  <span className="me-2">🍰</span>
                  Sweet Dreams Bakery
                </h4>
                <p className="text-light mb-3">
                  Where every bite tells a story of passion, creativity, and love. 
                  We craft the finest cakes and desserts to make your special moments unforgettable.
                </p>
                <div className="social-links">
                  <h6 className="text-warning mb-3">Follow Us</h6>
                  <div className="d-flex gap-3">
                    <a href="https://www.instagram.com/_.happy_crumbs._" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="social-link instagram">
                      <i className="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a href="#" className="social-link facebook">
                      <i className="fab fa-facebook"></i>
                      <span>Facebook</span>
                    </a>
                    <a href="https://wa.me/917558392001" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                      <i className="fab fa-whatsapp"></i>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-section">
                <h5 className="fw-bold mb-3 text-warning">Quick Links</h5>
                <ul className="list-unstyled footer-links">
                  <li><a href="#menu" className="text-light text-decoration-none">Our Menu</a></li>
                  <li><a href="#order" className="text-light text-decoration-none">Order Now</a></li>
                  <li><a href="#contact" className="text-light text-decoration-none">Contact Us</a></li>
                  <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
                  <li><a href="#" className="text-light text-decoration-none">Gallery</a></li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-section">
                <h5 className="fw-bold mb-3 text-warning">Our Specialties</h5>
                <ul className="list-unstyled footer-links">
                  <li><a href="#" className="text-light text-decoration-none">Chocolate Cakes</a></li>
                  <li><a href="#" className="text-light text-decoration-none">Wedding Cakes</a></li>
                  <li><a href="#" className="text-light text-decoration-none">Birthday Cakes</a></li>
                  <li><a href="#" className="text-light text-decoration-none">Cupcakes</a></li>
                  <li><a href="#" className="text-light text-decoration-none">Custom Orders</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-section">
                <h5 className="fw-bold mb-3 text-warning">Get In Touch</h5>
                <div className="contact-info">
                  <div className="contact-item mb-3">
                    <i className="fas fa-map-marker-alt text-warning me-2"></i>
                    <span className="text-light">Airoli , Navi Mumbai </span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fas fa-phone text-warning me-2"></i>
                    <span className="text-light">+91 7558392001</span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fas fa-envelope text-warning me-2"></i>
                    <span className="text-light">ManasviDhokale@gmail.com</span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fas fa-clock text-warning me-2"></i>
                    <span className="text-light">Mon-Sun: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <hr className="my-4 border-secondary" />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-light">
                © 2024 Sweet Dreams Bakery. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0 text-light">
                Made with <span className="text-danger">❤️</span> by <span className="text-warning">Yash Andhale</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      {selectedItem && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          itemName={selectedItem.name}
          itemPrice={selectedItem.price}
          itemDescription={selectedItem.description}
        />
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="modal show d-block cart-modal" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content cart-modal-content glass">
              <div className="modal-header cart-modal-header text-white">
                <h5 className="modal-title">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Shopping Cart ({getCartItemCount()} items)
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white cart-close" 
                  onClick={() => setIsCartOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                {cart.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">Your cart is empty</h5>
                    <p className="text-muted">Add some delicious items to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="row g-3">
                      {cart.map((item) => (
                        <div key={item.id} className="col-12">
                          <div className="card border-0 shadow-sm cart-item">
                            <div className="card-body p-3 cart-item-body">
                              <div className="row align-items-center">
                                <div className="col-md-6">
                                  <h6 className="mb-1 fw-semibold">{item.name}</h6>
                                  {item.description && (
                                    <small className="text-muted">{item.description}</small>
                                  )}
                                </div>
                                <div className="col-md-3">
                                  <div className="d-flex align-items-center gap-2 cart-qty">
                                    <button 
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>
                                    <span className="fw-semibold">{item.quantity}</span>
                                    <button 
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="col-md-2 text-end">
                                  <span className="fw-semibold text-primary cart-item-price">
                                    ₹{item.price * item.quantity}
                                  </span>
                                </div>
                                <div className="col-md-1 text-end">
                                  <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-light rounded cart-summary">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Total: ₹{getCartTotal()}</h5>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-outline-danger"
                            onClick={clearCart}
                          >
                            <i className="fas fa-trash me-1"></i>Clear Cart
                          </button>
                          <a 
                            href={`https://wa.me/917558392001?text=${generateWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success"
                          >
                            <i className="fab fa-whatsapp me-1"></i>Order Now
                          </a>
                          <button
                            className="btn btn-primary"
                            onClick={() => setIsUpiOpen(true)}
                          >
                            <i className="fas fa-qrcode me-1"></i>Pay via UPI
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPI Modal */}
      {isUpiOpen && (
        <div className="modal show d-block upi-modal" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass upi-modal-content">
              <div className="modal-header bg-gradient-success text-white upi-modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-qrcode me-2"></i>
                  Pay via UPI
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setIsUpiOpen(false)}
                ></button>
              </div>
              <div className="modal-body upi-modal-body">
                <div className="text-center">
                  <div className="upi-qr-frame mx-auto">
                    <img src={qrSrc()} alt="UPI QR" width={240} height={240} className="upi-qr" />
                  </div>
                  <div className="mt-3">
                    <div className="d-inline-flex align-items-center gap-2 p-2 rounded bg-dark border border-secondary upi-id-chip">
                      <span className="text-light small">UPI ID:</span>
                      <strong className="text-white">{upiVpa}</strong>
                      <button className="btn btn-sm btn-outline-light" onClick={() => copyToClipboard(upiVpa)}>
                        Copy
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-center gap-2 flex-wrap upi-actions">
                    <span className="price-badge">₹ {getCartTotal()}</span>
                    <button className="btn btn-sm btn-outline-light" onClick={() => copyToClipboard(getCartTotal().toString())}><i className="far fa-copy me-1"></i>Copy Amount</button>
                    <a href={buildUpiLink()} className="btn btn-primary" rel="noopener noreferrer"><i className="fas fa-external-link-alt me-1"></i>Open Any UPI</a>
                    <a href={isIOS() ? buildUpiLink() : appIntentLink('com.google.android.apps.nbu.paisa.user')} className="btn btn-light upi-app gpay" rel="noopener noreferrer"><i className="fab fa-google me-1"></i>GPay</a>
                    <a href={isIOS() ? buildUpiLink() : appIntentLink('com.phonepe.app')} className="btn btn-light upi-app phonepe" rel="noopener noreferrer">PhonePe</a>
                    <a href={isIOS() ? buildUpiLink() : appIntentLink('net.one97.paytm')} className="btn btn-light upi-app paytm" rel="noopener noreferrer">Paytm</a>
                  </div>
                  <p className="text-muted small mt-3">Note: {upiNote}</p>
                </div>
              </div>
              <div className="modal-footer upi-modal-footer">
                <button className="btn btn-outline-light" onClick={() => setIsUpiOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div 
          className="position-fixed"
          style={{
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <button
            className="btn btn-warning rounded-circle shadow-lg position-relative"
            style={{
              width: '60px',
              height: '60px',
              fontSize: '1.5rem'
            }}
            onClick={() => setIsCartOpen(true)}
          >
            <i className="fas fa-shopping-cart"></i>
            <span 
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{fontSize: '0.7rem'}}
            >
              {getCartItemCount()}
            </span>
          </button>
        </div>
      )}
      </main>
  );
}
