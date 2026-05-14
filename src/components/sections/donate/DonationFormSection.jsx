import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Container from "../../common/Container";
import PayPalForm from "./subcomponents/PayPalForm";
import IndiaPaymentForm from "./subcomponents/IndiaPaymentForm";
import "../../../styles/donate/donation-page.css";

const DonationFormSection = () => {
  const navigate = useNavigate();
  // =========================
  // International / PayPal Form
  // =========================
  const [intlFormData, setIntlFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    zip: "",
    amount: "1",
    comment: "",
    isAnonymous: false,
    hideAmount: false,
    donationType: "one-time",
  });

  const [intlLoading, setIntlLoading] = useState(false);
  const [intlSelectedAmount, setIntlSelectedAmount] = useState("50");
  const [intlIsCustomAmount, setIntlIsCustomAmount] = useState(false);

  // =========================
  // India Form
  // =========================
  const [indiaFormData, setIndiaFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    zip: "",
    amount: "1000",
    comment: "",
    isAnonymous: false,
    hideAmount: false,
    donationType: "one-time",
    transactionId: "",
    paymentScreenshot: null,
    paymentMethod: "india-manual",
  });

  const [indiaLoading, setIndiaLoading] = useState(false);
  const [indiaSelectedAmount, setIndiaSelectedAmount] = useState("1000");
  const [indiaIsCustomAmount, setIndiaIsCustomAmount] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  // =========================
  // CONFIG
  // =========================
  const PAYPAL_API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/donation/initiate`;
  const INDIA_API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/donation/initiate`;

  const INDIA_BANK_DETAILS = {
    accountName: "Patel Foundation Borsad",
    bankName: "Union Bank of India",
    accountNumber: "174222010002157",
    ifsc: "UBIN0917427",
    branch: "Borsad",
  };

  const intlPresetAmounts = ["1", "5", "10"];
  const indiaPresetAmounts = ["500", "1000", "2500", "5000"];

  // =========================
  // HELPERS
  // =========================
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

  // =========================
  // INTERNATIONAL HANDLERS
  // =========================
  const handleIntlChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setIntlFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    setIntlFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleIntlDonationTypeChange = (type) => {
    setIntlFormData((prev) => ({
      ...prev,
      donationType: type,
    }));
  };

  const handleIntlAmountSelect = (amount) => {
    setIntlSelectedAmount(amount);
    setIntlIsCustomAmount(false);

    setIntlFormData((prev) => ({
      ...prev,
      amount,
    }));
  };

  const handleIntlOtherAmount = () => {
    setIntlSelectedAmount("other");
    setIntlIsCustomAmount(true);

    setIntlFormData((prev) => ({
      ...prev,
      amount: "",
    }));
  };

  const handleIntlSubmit = async (e) => {
  e.preventDefault();

  if (
    !intlFormData.firstName ||
    !intlFormData.lastName ||
    !intlFormData.email ||
    !intlFormData.amount
  ) {
    toast.error("Please fill all required fields (First Name, Last Name, Email, and Amount).");
    return;
  }

  setIntlLoading(true);

  try {
    const payload = {
      name: `${intlFormData.firstName} ${intlFormData.lastName}`.trim(),
      firstName: intlFormData.firstName,
      lastName: intlFormData.lastName,
      email: intlFormData.email.trim(),
      phone: intlFormData.phone.trim(),
      address: intlFormData.address.trim(),
      city: intlFormData.city.trim(),
      state: intlFormData.state.trim(),
      country: intlFormData.country.trim(),
      zip: intlFormData.zip.trim(),
      comment: intlFormData.comment.trim(),
      isAnonymous: intlFormData.isAnonymous,
      hideAmount: intlFormData.hideAmount,
      amount: Number(intlFormData.amount),
      paymentMethod: "PAYPAL",
      source: "INDIA",
    };



    const response = await fetch(PAYPAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.approvalUrl) {
      toast.success("Redirecting to PayPal...");
      window.location.href = result.approvalUrl;
    } else {
      console.error("PayPal API Error:", result);
      toast.error(result.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("International donation form error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIntlLoading(false);
  }
};

  // =========================
  // INDIA HANDLERS
  // =========================
  const handleIndiaChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setIndiaFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    if (name === "paymentScreenshot") {
      setIndiaFormData((prev) => ({
        ...prev,
        paymentScreenshot: files?.[0] || null,
      }));
      return;
    }

    setIndiaFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleIndiaDonationTypeChange = (type) => {
    setIndiaFormData((prev) => ({
      ...prev,
      donationType: type,
    }));
  };

  const handleIndiaAmountSelect = (amount) => {
    setIndiaSelectedAmount(amount);
    setIndiaIsCustomAmount(false);

    setIndiaFormData((prev) => ({
      ...prev,
      amount,
    }));
  };

  const handleIndiaOtherAmount = () => {
    setIndiaSelectedAmount("other");
    setIndiaIsCustomAmount(true);

    setIndiaFormData((prev) => ({
      ...prev,
      amount: "",
    }));
  };

  const handleIndiaSubmit = async (e) => {
    e.preventDefault();

    if (
      !indiaFormData.firstName ||
      !indiaFormData.lastName ||
      !indiaFormData.email ||
      !indiaFormData.amount ||
      !indiaFormData.transactionId
    ) {
      toast.error("Please fill all required fields (First Name, Last Name, Email, Amount, and Transaction ID).");
      return;
    }

    setIndiaLoading(true);

    try {
      const payload = {
        name: `${indiaFormData.firstName} ${indiaFormData.lastName}`.trim(),
        firstName: indiaFormData.firstName,
        lastName: indiaFormData.lastName,
        email: indiaFormData.email.trim(),
        phone: indiaFormData.phone.trim(),
        address: indiaFormData.address.trim(),
        city: indiaFormData.city.trim(),
        state: indiaFormData.state.trim(),
        country: indiaFormData.country.trim(),
        zip: indiaFormData.zip.trim(),
        comment: `${indiaFormData.comment.trim()}${indiaFormData.transactionId ? " | Transaction ID: " + indiaFormData.transactionId : ""}`,
        isAnonymous: indiaFormData.isAnonymous,
        hideAmount: indiaFormData.hideAmount,
        amount: Number(indiaFormData.amount),
        paymentMethod: "BANK_TRANSFER",
        source: "INDIA",
      };



      const response = await fetch(INDIA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        // No toast, redirect to success page
        setIndiaFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          country: "India",
          zip: "",
          amount: "1000",
          comment: "",
          isAnonymous: false,
          hideAmount: false,
          donationType: "one-time",
          transactionId: "",
          paymentScreenshot: null,
          paymentMethod: "india-manual",
        });
        setIndiaSelectedAmount("1000");
        setIndiaIsCustomAmount(false);

        const fileInput = document.getElementById("paymentScreenshot");
        if (fileInput) fileInput.value = "";

        // Redirect to success page
        navigate("/donation-success-india");
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("India donation form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIndiaLoading(false);
    }
  };

  return (
    <section className="donation-form-section donation-form-section-upgraded" id="donation-form">
      <Container>
        <div className="donation-forms-heading-wrap">
          <div className="donation-page-badge">
            <span className="donation-page-badge-dot" />
            Make a Donation
          </div>

          <h2 className="donation-section-title">
            Support our mission through{" "}
            <span className="text-gradient">international or India donations.</span>
          </h2>

          <p className="donation-page-description">
            Choose the donation option that works best for you. International donors can continue securely via PayPal, while India donors can contribute through bank transfer or QR payment and submit their confirmation below.
          </p>
        </div>

        <div className="dual-donation-grid">
          {/* International Donation Form */}
          <PayPalForm
            formData={intlFormData}
            loading={intlLoading}
            selectedAmount={intlSelectedAmount}
            isCustomAmount={intlIsCustomAmount}
            presetAmounts={intlPresetAmounts}
            onChange={handleIntlChange}
            onAmountSelect={handleIntlAmountSelect}
            onOtherSelect={handleIntlOtherAmount}
            onDonationTypeChange={handleIntlDonationTypeChange}
            onSubmit={handleIntlSubmit}
          />

          {/* India Donation Form */}
          <IndiaPaymentForm
            formData={indiaFormData}
            loading={indiaLoading}
            selectedAmount={indiaSelectedAmount}
            isCustomAmount={indiaIsCustomAmount}
            presetAmounts={indiaPresetAmounts}
            bankDetails={INDIA_BANK_DETAILS}
            copiedField={copiedField}
            onCopy={copyToClipboard}
            onChange={handleIndiaChange}
            onAmountSelect={handleIndiaAmountSelect}
            onOtherSelect={handleIndiaOtherAmount}
            onDonationTypeChange={handleIndiaDonationTypeChange}
            onSubmit={handleIndiaSubmit}
          />
        </div>
      </Container>
    </section>
  );
};

export default DonationFormSection;