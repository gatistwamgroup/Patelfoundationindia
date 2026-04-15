import React from "react";
import { FiArrowUpRight, FiCopy, FiCheckCircle } from "react-icons/fi";
import DonorDetailsForm from "./DonorDetailsForm";
import AmountSelector from "./AmountSelector";

const IndiaPaymentForm = ({
  formData,
  loading,
  selectedAmount,
  isCustomAmount,
  presetAmounts,
  bankDetails,
  copiedField,
  onCopy,
  onChange,
  onAmountSelect,
  onOtherSelect,
  onDonationTypeChange,
  onSubmit,
}) => {
  return (
    <div className="donation-form-card upgraded-card">
      <div className="donation-card-top">
        <div className="donation-method-pill donation-method-pill-india">India Donations</div>
        <h3 className="donation-card-title">Bank Transfer / QR Payment</h3>
        <p className="donation-card-subtitle">
          Donate in INR using bank transfer or scan the QR code, then submit your payment confirmation.
        </p>
      </div>

      {/* India Payment Info */}
      <div className="india-payment-info-box">
        <div className="india-payment-grid">
          <div className="india-bank-card">
            <h4 className="india-info-title">Bank Details</h4>

            <div className="india-info-list">
              <div className="india-info-row">
                <span>Account Name</span>
                <div className="india-copy-wrap">
                  <strong>{bankDetails.accountName}</strong>
                  <button type="button" onClick={() => onCopy(bankDetails.accountName, "accountName")}>
                    {copiedField === "accountName" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="india-info-row">
                <span>Bank Name</span>
                <div className="india-copy-wrap">
                  <strong>{bankDetails.bankName}</strong>
                  <button type="button" onClick={() => onCopy(bankDetails.bankName, "bankName")}>
                    {copiedField === "bankName" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="india-info-row">
                <span>Account Number</span>
                <div className="india-copy-wrap">
                  <strong>{bankDetails.accountNumber}</strong>
                  <button type="button" onClick={() => onCopy(bankDetails.accountNumber, "accountNumber")}>
                    {copiedField === "accountNumber" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="india-info-row">
                <span>IFSC Code</span>
                <div className="india-copy-wrap">
                  <strong>{bankDetails.ifsc}</strong>
                  <button type="button" onClick={() => onCopy(bankDetails.ifsc, "ifsc")}>
                    {copiedField === "ifsc" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="india-info-row">
                <span>Branch</span>
                <div className="india-copy-wrap">
                  <strong>{bankDetails.branch}</strong>
                  <button type="button" onClick={() => onCopy(bankDetails.branch, "branch")}>
                    {copiedField === "branch" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="india-qr-card">
            <h4 className="india-info-title">Scan QR to Donate</h4>
            <div className="india-qr-wrap">
              <img
                src="/images/donate/india-donation-qr.jpg"
                alt="India Donation QR Code"
                className="india-qr-image"
              />
            </div>
            <p className="india-qr-note">
              After payment, please enter your transaction reference (UTR / Ref No.) and submit the confirmation form below.
            </p>
          </div>
        </div>
      </div>

      <form className="donation-form" onSubmit={onSubmit}>
        <DonorDetailsForm 
          formData={formData} 
          onChange={onChange} 
          idPrefix="india" 
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
          currency="INR"
        />

        <div className="donation-form-group">
          <label htmlFor="indiaTransactionId">Transaction ID (UTR / Ref No.)</label>
          <input
            type="text"
            id="indiaTransactionId"
            name="transactionId"
            placeholder="Enter your payment reference"
            value={formData.transactionId}
            onChange={onChange}
            required
          />
        </div>

        <div className="donation-form-group">
          <label htmlFor="indiaComment">Comment (Optional)</label>
          <textarea
            id="indiaComment"
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
          {loading ? "Submitting..." : "Submit Confirmation"} <FiArrowUpRight />
        </button>
      </form>
    </div>
  );
};

export default IndiaPaymentForm;
