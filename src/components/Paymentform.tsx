import React, { useState } from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
}

interface AmountOption {
  amount: number;
  bonus: number;
  isHit?: boolean;
}

interface PaymentFormProps {
  onSubmit: (paymentMethod: string, amount: number) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('visa');
  const [selectedAmount, setSelectedAmount] = useState<number>(3000);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponBonus, setCouponBonus] = useState<number>(0);
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);

  const calculateTotalBonus = (amount: number): number => {
    const selectedOption = amountOptions.find(opt => opt.amount === amount);
    return selectedOption ? selectedOption.bonus + couponBonus : couponBonus;
  };

  const calculateTotalAmount = (): number => {
    const baseAmount = selectedAmount;
    const totalBonus = calculateTotalBonus(selectedAmount);
    return baseAmount * (1 + totalBonus / 100);
  };

  const handleCouponSubmit = () => {
    // Simulate coupon validation
    if (couponCode.toLowerCase() === 'extra10') {
      setCouponBonus(10);
      setShowCouponInput(false);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleDeposit = () => {
    onSubmit(selectedMethod, calculateTotalAmount());
  };

  const availablePaymentMethods: PaymentMethod[] = [
    { id: 'visa', name: 'VISA', logo: '/visa.svg' },
    { id: 'mastercard', name: 'MasterCard', logo: '/mastercard.svg' },
    { id: 'maestro', name: 'Maestro', logo: '/maestro.svg' },
    { id: 'amex', name: 'American Express', logo: '/amex.svg' },
    { id: 'discover', name: 'Discover', logo: '/discover.svg' },
    { id: 'jcb', name: 'JCB', logo: '/jcb.svg' },
    { id: 'paypal', name: 'PayPal', logo: '/paypal.svg' },
    { id: 'epayments', name: 'E-Payments', logo: '/epayments.svg' },
  ];

  const selectedPaymentMethod = availablePaymentMethods.find(method => method.id === selectedMethod);

  const paymentMethods: PaymentMethod[] = [
    { id: 'visa', name: 'VISA', logo: '/visa.svg' },
    { id: 'mastercard', name: 'MasterCard', logo: '/mastercard.svg' },
    { id: 'maestro', name: 'Maestro', logo: '/maestro.svg' },
    { id: 'amex', name: 'American Express', logo: '/amex.svg' },
    { id: 'discover', name: 'Discover', logo: '/discover.svg' },
    { id: 'jcb', name: 'JCB', logo: '/jcb.svg' },
    { id: 'paypal', name: 'PayPal', logo: '/paypal.svg' },
    { id: 'epayments', name: 'E-Payments', logo: '/epayments.svg' },
  ];

  const amountOptions: AmountOption[] = [
    { amount: 3000, bonus: 70, isHit: true },
    { amount: 1000, bonus: 60 },
    { amount: 500, bonus: 50 },
    { amount: 50, bonus: 20 },
  ];

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="p-6 bg-[#1a1f2e] text-white rounded-lg max-w-6xl w-full">
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-6">
            {/* Payment Methods Section */}
        <div>
          <h2 className="text-xl mb-4">Services</h2>
          <div className="grid grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg flex flex-col items-center justify-center ${
                  selectedMethod === method.id
                    ? 'bg-[#2a3142] border-2 border-blue-500'
                    : 'bg-[#212736] hover:bg-[#2a3142] border-2 border-transparent'
                }`}
              >
                <img src={method.logo} alt={method.name} className="h-8 mb-2" />
                <span className="text-sm text-gray-400">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Section */}
        <div>
          <h2 className="text-xl mb-4">Amount</h2>
          <div className="grid grid-cols-4 gap-4">
            {amountOptions.map((option) => (
              <button
                key={option.amount}
                onClick={() => setSelectedAmount(option.amount)}
                className={`p-4 rounded-lg relative ${
                  selectedAmount === option.amount
                    ? 'bg-[#2a3142] border-2 border-blue-500'
                    : 'bg-[#212736] hover:bg-[#2a3142] border-2 border-transparent'
                }`}
              >
                {option.isHit && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-xs px-2 py-1 rounded-full">
                    HIT
                  </span>
                )}
                <div className="text-xl font-bold">${option.amount}</div>
                <div className="text-sm text-gray-400">Bonus +{option.bonus}%</div>
              </button>
            ))}
          </div>
        </div>

        {/* Bonus Section */}
        <div>
          <h2 className="text-xl mb-4">Bonus</h2>
          {!showCouponInput ? (
            <button 
              onClick={() => setShowCouponInput(true)}
              className="w-full p-4 bg-[#212736] hover:bg-[#2a3142] rounded-lg flex items-center justify-center space-x-2"
            >
              <span className="text-blue-500">+</span>
              <span>Add Coupon</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 p-4 bg-[#212736] rounded-lg text-white"
              />
              <button
                onClick={handleCouponSubmit}
                className="px-6 bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Apply
              </button>
            </div>
          )}
          {couponBonus > 0 && (
            <div className="mt-2 text-green-500">Extra {couponBonus}% bonus applied!</div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-[#212736] rounded-lg p-6 h-fit sticky top-6">
          <h2 className="text-xl mb-4">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">To Deposit</span>
              <span>${selectedAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Account Status</span>
              <span className="flex items-center">
                Pro
                <span className="ml-2 text-gray-400">ⓘ</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method</span>
              <span>{selectedPaymentMethod?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Bonus</span>
              <span>+{calculateTotalBonus(selectedAmount)}%</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-gray-400">To Pay</span>
              <span>${calculateTotalAmount().toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={handleDeposit}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Deposit
          </button>

          {/* Security Indicators */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2">🔒</span>
              Funds Are Safeguarded By European Banks
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2">🛡️</span>
              Additional Level Of Payment Security
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2">🔐</span>
              2048-Bit Strong SSL Security
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PaymentForm;