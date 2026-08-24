import React from "react";

const AmountSelector = ({
  presetAmounts,
  selectedAmount,
  isCustomAmount,
  customAmountValue,
  onAmountSelect,
  onOtherSelect,
  onCustomAmountChange,
  donationType,
  onDonationTypeChange,
  currency = "USD",
}) => {
  return (
    <div className="donation-form-group">
      <label>Donation Amount</label>

      <div className="donation-type-tabs">
        <button
          type="button"
          className={donationType === "one-time" ? "active" : ""}
          onClick={() => onDonationTypeChange("one-time")}
        >
          One-Time
        </button>
        <button
          type="button"
          className={donationType === "monthly" ? "active" : ""}
          onClick={() => onDonationTypeChange("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          className={donationType === "yearly" ? "active" : ""}
          onClick={() => onDonationTypeChange("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="donation-amount-options">
        {presetAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            className={selectedAmount === amt ? "active" : ""}
            onClick={() => onAmountSelect(amt)}
          >
            <span className="amount-value">{currency === "USD" ? "$" : "₹"}{amt}</span>
            <span className="amount-currency">{currency}</span>
          </button>
        ))}

        <button
          type="button"
          className={selectedAmount === "other" ? "active other-btn" : "other-btn"}
          onClick={onOtherSelect}
        >
          Other
        </button>
      </div>

      {isCustomAmount && (
        <input
          type="text"
          id="customAmount"
          name="amount"
          placeholder="Enter an amount"
          value={customAmountValue}
          onChange={onCustomAmountChange}
          className="custom-amount-input"
        />
      )}

      {!isCustomAmount && customAmountValue && (
        <div className="selected-amount-preview">
          Selected: <strong>{currency === "USD" ? "$" : "₹"}{customAmountValue} {currency}</strong>
        </div>
      )}
    </div>
  );
};

export default AmountSelector;
