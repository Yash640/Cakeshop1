'use client';

import { useState } from 'react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  itemPrice: string;
  itemDescription?: string;
}

export default function OrderModal({ isOpen, onClose, itemName, itemPrice, itemDescription }: OrderModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleWhatsAppOrder = () => {
    const message = `Hi! I would like to order ${quantity} x ${itemName} (${itemPrice} each). ${itemDescription ? `Description: ${itemDescription}` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917558392001?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const totalPrice = parseInt(itemPrice.replace('₹ ', '')) * quantity;

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark border-0" style={{borderRadius: '20px'}}>
          <div className="modal-header border-0">
            <h5 className="modal-title text-white fw-bold">
              <span className="me-2">🍰</span>
              Order {itemName}
            </h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-white">
            <div className="row g-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}>
                  <div>
                    <h6 className="mb-1 fw-semibold text-white">{itemName}</h6>
                    {itemDescription && <small className="text-light">{itemDescription}</small>}
                  </div>
                  <span className="price-badge" style={{background: 'linear-gradient(135deg, #d63384 0%, #e83e8c 100%)'}}>
                    {itemPrice}
                  </span>
                </div>
              </div>
              
              <div className="col-12">
                <label className="form-label text-white fw-semibold">Quantity</label>
                <div className="d-flex align-items-center gap-3">
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="text-white fw-bold fs-5">{quantity}</span>
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center p-3 rounded-3" style={{backgroundColor: 'rgba(214, 51, 132, 0.2)'}}>
                  <span className="fw-bold text-white">Total Price:</span>
                  <span className="fw-bold text-white fs-5">₹ {totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button 
              type="button" 
              className="btn btn-secondary me-2" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-success"
              onClick={handleWhatsAppOrder}
            >
              <i className="fab fa-whatsapp me-2"></i>
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
