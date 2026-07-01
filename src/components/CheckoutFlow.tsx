import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, CheckCircle2, Lock, Smartphone, RefreshCw, Send, AlertCircle, ShoppingCart } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutFlowProps {
  cart: CartItem[];
  total: number;
  onClearCart: () => void;
  onClose: () => void;
}

export default function CheckoutFlow({ cart, total, onClearCart, onClose }: CheckoutFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info, 2: OTP, 3: Success Receipt
  
  // Form States
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // OTP States
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);

  // Completed Order State
  const [generatedOrder, setGeneratedOrder] = useState<OrderDetails | null>(null);

  // Timer for OTP resend countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!address.trim()) {
      setFormError('Please enter your delivery address in Alluru.');
      return;
    }
    if (address.toLowerCase().indexOf('alluru') === -1 && address.toLowerCase().indexOf('aluru') === -1) {
      // Just a warning or auto-append to guarantee fresh local delivery
      setAddress((prev) => prev + ', Alluru');
    }
    
    // Simple Indian mobile format validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for order delivery.');
      return;
    }

    // Move to step 2 (OTP Verification)
    setStep(2);
    setResendTimer(59);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setIsVerifying(true);

    setTimeout(() => {
      // Accept '123456' as standard sandboxed key
      if (otpCode === '123456' || otpCode.trim() === '910080') {
        const orderId = `CU-OD-${Math.floor(100000 + Math.random() * 900000)}`;
        const details: OrderDetails = {
          orderId,
          customerName: name,
          phone: phone,
          email: email || undefined,
          deliveryAddress: address,
          items: [...cart],
          total: total,
          deliveryOption: 'Cash on Delivery',
          timestamp: new Date().toLocaleString()
        };

        setGeneratedOrder(details);
        setStep(3);
      } else {
        setOtpError('Invalid 6-digit code. Please enter 123456 to pass verification.');
      }
      setIsVerifying(false);
    }, 900);
  };

  const handleResendCode = () => {
    setResendTimer(59);
    setOtpCode('');
    setOtpError('');
    // Trigger virtual alert for friendly guidance
  };

  const handleOpenWhatsApp = () => {
    if (!generatedOrder) return;

    const businessPhone = "919100805905"; // Proprietor's real mobile line

    // Generate neat text receipt with eco-themed layout
    const itemSummary = generatedOrder.items
      .map((item, index) => `${index + 1}. *${item.product.name}* (${item.product.size})\n   Qty: ${item.quantity} x ₹${item.product.price} = *₹${item.product.price * item.quantity}*`)
      .join('\n\n');

    const whatsappMessage = `🌊 *NEW CU WATER ORDER RECEIVED* 🌊
---------------------------------
*Order Ref:* ${generatedOrder.orderId}
*Timestamp:* ${generatedOrder.timestamp}

👤 *CUSTOMER DETAILS:*
*Name:* ${generatedOrder.customerName}
*Phone:* ${generatedOrder.phone}
${generatedOrder.email ? `*Email:* ${generatedOrder.email}\n` : ''}*Delivery Address:* ${generatedOrder.deliveryAddress}

📦 *ITEMS ORDERED:*
${itemSummary}

---------------------------------
💰 *TOTAL AMOUNT:* *₹${generatedOrder.total}*
💵 *PAYMENT METHOD:* *CASH ON DELIVERY (COD)*
🚚 *DELIVERY RANGE:* Alluru Local Express

💬 *Notes/Preferences:* ${notes ? notes : 'None'}
---------------------------------
_Please confirm my order and start delivery soon. Thank you for choosing CU WATER Smart Hydration!_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const waURL = `https://wa.me/${businessPhone}?text=${encodedMessage}`;
    
    // Clear and close, and open WA
    onClearCart();
    window.open(waURL, '_blank');
    onClose();
  };

  return (
    <div className="w-full max-w-lg bg-white/95 rounded-[2.5rem] border border-sky-100 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative glass wave blur top background */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-sky-400 to-emerald-500" />
      
      {/* Step header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-sky-100/60">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-bold text-xs">
            {step}
          </span>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {step === 1 && 'Delivery Address & Details'}
              {step === 2 && 'Secure OTP Authentication'}
              {step === 3 && 'Cash on Delivery Receipt'}
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {step === 1 && 'Step 1 of 3'}
              {step === 2 && 'Step 2 of 3'}
              {step === 3 && 'Order Confirmed'}
            </p>
          </div>
        </div>
        
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-full transition-all">
          Cancel
        </button>
      </div>

      {step === 1 && (
        <form onSubmit={handleInfoSubmit} className="space-y-4">
          <div className="text-center sm:text-left mb-2">
            <h4 className="text-lg font-extrabold text-slate-900">Where shall we deliver?</h4>
            <p className="text-xs text-slate-500 font-medium">
              We provide free rapid delivery within <span className="text-sky-600 font-bold">Alluru</span> local limits.
            </p>
          </div>

          {formError && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Upendra Varma"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Delivery Address (Alluru Local Only) *</label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Near Ramalayam Temple, Main Street, Alluru, Nellore District, Andhra Pradesh"
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mobile Phone *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">+91</span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9100805905"
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. upendravarma@icloud.com"
                className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Special Instructions (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Leave near gate, call on arrival, wholesale request"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
            />
          </div>

          {/* Pricing breakdown summary */}
          <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/60 text-xs font-medium text-slate-700 space-y-2">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Delivery Charges:</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-sky-100 pt-2">
              <span>Grand Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-13 mt-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
          >
            <span>Proceed to Mobile Verification</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <div className="text-center">
            <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-7 h-7 text-sky-600" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">Verify your Number</h4>
            <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto mt-1">
              A secure 6-digit confirmation code was virtually dispatched to <span className="text-slate-800 font-bold">+91 {phone}</span>.
            </p>
          </div>

          {otpError && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-xl text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{otpError}</span>
            </div>
          )}

          {/* Demo Sandbox Alert Help Box */}
          <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl text-xs font-medium text-emerald-800 flex items-start gap-2">
            <span className="text-base">💡</span>
            <div>
              <p className="font-bold">Developer Preview Sandbox</p>
              <p className="opacity-90">Please enter the passcode <span className="font-extrabold underline text-emerald-950">123456</span> to pass order verification successfully!</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center mb-2">
              Enter 6-Digit Verification Passcode
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 123456"
              className="w-full h-14 rounded-2xl border-2 border-slate-200 text-center text-2xl font-extrabold tracking-[0.4em] focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-normal placeholder:text-base"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold px-1">
            {resendTimer > 0 ? (
              <span className="text-slate-500">
                Resend code in <span className="text-sky-600 font-bold">{resendTimer}s</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sky-600 hover:text-sky-700 flex items-center gap-1 focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Resend Code
              </button>
            )}
            
            <span className="text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Secure COD Verification
            </span>
          </div>

          <button
            type="submit"
            disabled={isVerifying || otpCode.length !== 6}
            className={`w-full h-13 mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
              isVerifying || otpCode.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.01]'
            }`}
          >
            {isVerifying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Verifying and compiling order...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Confirm Order</span>
              </>
            )}
          </button>
        </form>
      )}

      {step === 3 && generatedOrder && (
        <div className="space-y-5 text-slate-800">
          <div className="text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h4 className="text-lg font-extrabold text-slate-900">COD Order Pre-Approved!</h4>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Ref: <span className="text-sky-600 font-extrabold">{generatedOrder.orderId}</span> • Verified successfully.
            </p>
          </div>

          {/* Checkout review box */}
          <div className="border border-sky-100 rounded-2xl bg-sky-50/30 overflow-hidden divide-y divide-sky-100/60 text-xs">
            {/* Header info */}
            <div className="p-3.5 bg-sky-100/30 font-bold flex justify-between items-center text-slate-700">
              <span>Order Summary</span>
              <span>Cash on Delivery</span>
            </div>
            
            {/* List items */}
            <div className="p-3.5 space-y-2.5 max-h-32 overflow-y-auto">
              {generatedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 font-medium">
                  <span>
                    {item.product.name} ({item.product.size}) <span className="text-slate-400 font-bold">x{item.quantity}</span>
                  </span>
                  <span className="font-bold">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="p-3.5 text-slate-600 font-medium space-y-1">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Deliver To:</div>
              <p className="font-bold text-slate-800">{generatedOrder.customerName} ({generatedOrder.phone})</p>
              <p>{generatedOrder.deliveryAddress}</p>
            </div>

            {/* Total */}
            <div className="p-3.5 bg-sky-100/10 flex justify-between items-center text-sm font-extrabold text-slate-900">
              <span>Grand Total:</span>
              <span className="text-sky-600 text-base">₹{generatedOrder.total}</span>
            </div>
          </div>

          {/* Action guidance */}
          <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-2xl text-[11px] font-medium text-amber-800 space-y-1">
            <p className="font-extrabold">🚀 CRITICAL NEXT STEP:</p>
            <p className="opacity-90 leading-relaxed">
              Clicking the button below will instantly prepare your order receipt and redirect you to our official WhatsApp helpline at <span className="font-bold text-slate-900">+91 9100805905</span>. Just tap 'Send' to dispatch your order.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
          >
            <Send className="w-4 h-4 fill-current" />
            <span>Complete Order via WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  );
}
