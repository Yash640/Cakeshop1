export default function Home() {
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
                <a href="#order" className="btn btn-outline-light btn-lg px-4 py-3">Order Now</a>
              </div>
            </div>
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
                        <span className="price-badge">₹ 400</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Chip</h6>
                          <small className="text-muted">Rich chocolate with chips</small>
                        </div>
                        <span className="price-badge">₹ 550</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Oreo</h6>
                          <small className="text-muted">Creamy oreo delight</small>
                        </div>
                        <span className="price-badge">₹ 550</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Truffle</h6>
                          <small className="text-muted">Decadent truffle experience</small>
                        </div>
                        <span className="price-badge">₹ 600</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Nutella Truffle</h6>
                          <small className="text-muted">Hazelnut chocolate perfection</small>
                        </div>
                        <span className="price-badge">₹ 650</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Ferrero Rocher</h6>
                          <small className="text-muted">Premium hazelnut luxury</small>
                        </div>
                        <span className="price-badge">₹ 650</span>
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
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>₹ 500</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Rasmalai</h6>
                          <small className="text-muted">Traditional Indian dessert</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>₹ 600</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Red Velvet</h6>
                          <small className="text-muted">Classic red velvet elegance</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>₹ 600</span>
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
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 200</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Triple Chocolate Bowl</h6>
                          <small className="text-muted">Three layers of chocolate</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 210</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Nutella Bowl</h6>
                          <small className="text-muted">Hazelnut spread heaven</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 230</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">KitKat Bowl</h6>
                          <small className="text-muted">Crunchy kitkat surprise</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000'}}>₹ 300</span>
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
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Coffee</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 100</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Chocolate</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 100</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Red Velvet</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 65</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Pineapple</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 65</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Oreo</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 85</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Cookies Cream</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 95</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Peanut Butter</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 100</span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-0 fw-semibold small">Hazelnut</h6>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', fontSize: '0.8rem', padding: '6px 12px'}}>₹ 120</span>
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
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 90</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Chocolate Chip</h6>
                          <small className="text-muted">Classic with chips</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 90</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Almond Fudge</h6>
                          <small className="text-muted">Nutty fudge delight</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 100</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Walnut Peanut</h6>
                          <small className="text-muted">Crunchy nut combination</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 100</span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light menu-item">
                        <div>
                          <h6 className="mb-1 fw-semibold">Butter</h6>
                          <small className="text-muted">Rich buttery goodness</small>
                        </div>
                        <span className="price-badge" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>₹ 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-5 bg-body-tertiary">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-2">Developer Yash Andhale </h3>
            </div>
            <div className="col-lg-6 text-lg-end">
              <a id="order" className="btn btn-primary btn-lg" href="#">Order on WhatsApp</a>
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
                    <a href="#" className="social-link whatsapp">
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
                    <span className="text-light">Your City, State 12345</span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fas fa-phone text-warning me-2"></i>
                    <span className="text-light">+91 98765 43210</span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fas fa-envelope text-warning me-2"></i>
                    <span className="text-light">info@sweetdreamsbakery.com</span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fas fa-clock text-warning me-2"></i>
                    <span className="text-light">Mon-Sun: 8:00 AM - 10:00 PM</span>
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
      </main>
  );
}
