import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FiCopy,
  FiCheckCircle,
  FiLoader,
  FiArrowUpRight,
  FiInfo,
} from "react-icons/fi";
import Container from "../../common/Container";

const RakshaBandhanFormSection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "1100",
  });

  const [selectedAmount, setSelectedAmount] = useState("1100");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  // =========================
  // EMAIL CONFIG (Web3Forms)
  // No backend involved — submissions go straight to email.
  // Get your free access key at https://web3forms.com (takes ~30 seconds,
  // no login needed) and paste it below.
  // =========================
  const WEB3FORMS_ACCESS_KEY = "af7f5bfb-8337-4246-95ca-ec94b8708a84";
  const WEB3FORMS_URL = "https://api.web3forms.com/submit";

  const BANK_DETAILS = {
    accountName: "Patel Foundation Borsad",
    bankName: "Union Bank of India",
    accountNumber: "174222010002157",
    ifsc: "UBIN0917427",
    branch: "Borsad",
  };

  const presetAmounts = [
    { value: "501", label: "Shagun" },
    { value: "1100", label: "Popular" },
    { value: "2100", label: "Blessing" },
    { value: "5100", label: "Protector" },
  ];

  const copyToClipboard = async (value, fieldName) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Unable to copy. Please copy manually.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, amount: numericValue }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setIsCustomAmount(false);
    setFormData((prev) => ({ ...prev, amount }));
  };

  const handleOtherAmount = () => {
    setSelectedAmount("other");
    setIsCustomAmount(true);
    setFormData((prev) => ({ ...prev, amount: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.amount) {
      toast.error("Please fill in your name, phone number, and amount.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `🎗️ Raksha Bandhan Donation — ${formData.name.trim()} (₹${formData.amount})`,
        from_name: "Patel Foundation Website",
        message:
          `NEW RAKSHA BANDHAN DONATION SUBMISSION\n` +
          `========================================\n\n` +
          `Donor Name   : ${formData.name.trim()}\n` +
          `Phone Number : ${formData.phone.trim()}\n` +
          `Email        : ${formData.email.trim() || "Not provided"}\n` +
          `Amount       : ₹${formData.amount}\n` +
          `Campaign     : Raksha Bandhan\n` +
          `Submitted On : ${new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}\n\n` +
          `----------------------------------------\n` +
          `Next Step: Verify the payment against bank/UPI records, then follow up with the donor to confirm and thank them.`,
      };

      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", email: "", phone: "", amount: "1100" });
        setSelectedAmount("1100");
        setIsCustomAmount(false);
        navigate("/donation-success-india");
      } else {
        console.error("Web3Forms error:", result);
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Raksha Bandhan donation form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rb-form-section" id="rb-donation-form">
      <Container>
        <div className="rb-form-heading-wrap">
          <div className="donation-page-badge">
            <span className="donation-page-badge-dot" />
            Donate Now
          </div>
          <h2 className="donation-section-title">
            Scan, Pay &amp; Share Your Details —{" "}
            <span className="text-gradient">We'll Take It From There</span>
          </h2>
          <p className="donation-page-description">
            Scan the QR code or use the bank details below to donate directly.
            Then share your name, phone, and amount so we can confirm your
            contribution and send you a thank-you & receipt.
          </p>
        </div>

        <div className="rb-form-shell">
          {/* Payment Info Card */}
          <div className="rb-payment-card">
            <div className="rb-payment-pill">Pay via UPI / Bank Transfer</div>
            <h3>Scan QR to Donate</h3>
            <p className="rb-card-sub">
              Use any UPI app to scan and pay instantly, or transfer directly
              using the bank details below.
            </p>

            <div className="rb-qr-wrap">
              <img
                src="/images/donate/india-donation-qr.webp"
                alt="Patel Foundation Raksha Bandhan Donation QR Code"
              />
            </div>

            <div className="rb-bank-list">
              <div className="rb-bank-row">
                <span>Account Name</span>
                <div className="rb-bank-copy-wrap">
                  <strong>{BANK_DETAILS.accountName}</strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BANK_DETAILS.accountName, "accountName")}
                  >
                    {copiedField === "accountName" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="rb-bank-row">
                <span>Bank Name</span>
                <div className="rb-bank-copy-wrap">
                  <strong>{BANK_DETAILS.bankName}</strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BANK_DETAILS.bankName, "bankName")}
                  >
                    {copiedField === "bankName" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="rb-bank-row">
                <span>Account Number</span>
                <div className="rb-bank-copy-wrap">
                  <strong>{BANK_DETAILS.accountNumber}</strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BANK_DETAILS.accountNumber, "accountNumber")}
                  >
                    {copiedField === "accountNumber" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="rb-bank-row">
                <span>IFSC Code</span>
                <div className="rb-bank-copy-wrap">
                  <strong>{BANK_DETAILS.ifsc}</strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BANK_DETAILS.ifsc, "ifsc")}
                  >
                    {copiedField === "ifsc" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>

              <div className="rb-bank-row">
                <span>Branch</span>
                <div className="rb-bank-copy-wrap">
                  <strong>{BANK_DETAILS.branch}</strong>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BANK_DETAILS.branch, "branch")}
                  >
                    {copiedField === "branch" ? <FiCheckCircle /> : <FiCopy />}
                  </button>
                </div>
              </div>
            </div>

            <div className="rb-payment-note">
              <FiInfo />
              <span>
                After paying, please fill the form to share your details —
                this helps us confirm your donation and send you a receipt.
              </span>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className={`rb-lead-card ${loading ? "is-loading" : ""}`}>
            <div className="rb-payment-pill">Share Your Details</div>
            <h3>Confirm Your Donation</h3>
            <p className="rb-card-sub">
              Just your name, phone, email, and amount — we'll reach out to
              confirm and thank you personally.
            </p>

            <form className="rb-lead-form" onSubmit={handleSubmit}>
              <div className="rb-form-group">
                <label htmlFor="rbName">Full Name</label>
                <input
                  type="text"
                  id="rbName"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rb-form-group">
                <label htmlFor="rbPhone">Phone Number</label>
                <input
                  type="tel"
                  id="rbPhone"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rb-form-group">
                <label htmlFor="rbEmail">Email Address (Optional)</label>
                <input
                  type="email"
                  id="rbEmail"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="rb-form-group">
                <label>Donation Amount</label>

                <div className="rb-amount-options">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt.value}
                      type="button"
                      className={selectedAmount === amt.value ? "active" : ""}
                      onClick={() => handleAmountSelect(amt.value)}
                    >
                      <span className="rb-amount-value">₹{amt.value}</span>
                      <span className="rb-amount-label">{amt.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className={selectedAmount === "other" ? "active" : ""}
                  style={{
                    width: "100%",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "10px",
                    background: selectedAmount === "other" ? undefined : "#fff",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontFamily: "inherit",
                  }}
                  onClick={handleOtherAmount}
                >
                  Enter a different amount
                </button>

                {isCustomAmount && (
                  <input
                    type="text"
                    name="amount"
                    placeholder="Enter amount in ₹"
                    value={formData.amount}
                    onChange={handleChange}
                    className="rb-custom-amount-input"
                  />
                )}
              </div>

              <button type="submit" className="rb-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <FiLoader className="icon-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    I've Donated — Submit My Details <FiArrowUpRight />
                  </>
                )}
              </button>

              <p className="rb-form-microcopy">
                Your information is kept private and used only to confirm your
                donation and issue your receipt.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RakshaBandhanFormSection;