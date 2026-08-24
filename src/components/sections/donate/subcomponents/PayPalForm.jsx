import React from "react";
import { FiArrowUpRight, FiLoader } from "react-icons/fi";
import DonorDetailsForm from "./DonorDetailsForm";
import AmountSelector from "./AmountSelector";

const PayPalForm = ({
  formData,
  loading,
  selectedAmount,
  isCustomAmount,
  presetAmounts,
  onChange,
  onAmountSelect,
  onOtherSelect,
  onDonationTypeChange,
  onSubmit,
}) => {
  return (
    <div className={`donation-form-card upgraded-card ${loading ? "is-loading" : ""}`}>
      {loading && (
        <div className="form-loading-overlay">
          <div className="premium-spinner"></div>
          <p>Connecting to PayPal...</p>
        </div>
      )}
      <div className="donation-card-top">
        <div className="donation-method-pill">International Donations</div>
        <h3 className="donation-card-title">Donate via PayPal</h3>
        <p className="donation-card-subtitle">
          Securely support Patel Foundation through PayPal in USD.
        </p>
      </div>

      <form className="donation-form" onSubmit={onSubmit}>
        <DonorDetailsForm 
          formData={formData} 
          onChange={onChange} 
          idPrefix="intl" 
        />

        <AmountSelector
          presetAmounts={presetAmounts}
          selectedAmount={selectedAmount}
          isCustomAmount={isCustomAmount}
          customAmountValue={formData.amount}
          onAmountSelect={onAmountSelect}
          onOtherSelect={onOtherSelect}
          onCustomAmountChange={onChange}
          donationType={formData.donationType}
          onDonationTypeChange={onDonationTypeChange}
          currency="USD"
        />

        <div className="donation-form-group">
          <label htmlFor="intlComment">Comment (Optional)</label>
          <textarea
            id="intlComment"
            name="comment"
            rows="3"
            placeholder="Share if you’d like your donation to support a specific purpose..."
            value={formData.comment}
            onChange={onChange}
          />
        </div>

        <div className="donation-preferences-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={onChange}
            />
            Donate anonymously
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <input
              type="checkbox"
              name="hideAmount"
              checked={formData.hideAmount}
              onChange={onChange}
            />
            Hide my amount
          </label>
        </div>

        <button type="submit" className="donation-submit-btn" disabled={loading}>
          {loading ? (
            <>
              <FiLoader className="icon-spin" /> Processing...
            </>
          ) : (
            <>
              Proceed to PayPal <FiArrowUpRight />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PayPalForm;
