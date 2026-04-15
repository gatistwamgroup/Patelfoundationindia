import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/contact/contact-page.css";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    interest: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // success | error

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/inquiries`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while typing
    if (statusMessage) {
      setStatusMessage("");
      setStatusType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.interest.trim() ||
      !formData.message.trim()
    ) {
      setStatusMessage("All fields are required");
      setStatusType("error");
      return;
    }

    setLoading(true);
    setStatusMessage("");
    setStatusType("");

    try {
      // Map to backend Inquiry model
      const payload = {
        name: formData.name,
        email: formData.email,
        type: 'contact',
        subject: `${formData.interest.toUpperCase()}: ${formData.subject}`,
        message: `Phone: ${formData.phone}\n\n${formData.message}`,
        source: "INDIA"
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      
      let result;
      try {
        result = JSON.parse(rawText);
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (result.success) {
        setStatusMessage("Thank you! Your message has been received.");
        setStatusType("success");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          interest: "",
          message: "",
        });
      } else {
        setStatusMessage(result.message || "Something went wrong. Please try again.");
        setStatusType("error");
      }
    } catch (error) {
      setStatusMessage("Server error. Please try again later.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form-section">
      <Container>
        <div className="contact-form-shell">
          {/* Left Side */}
          <div className="contact-form-content">
            <div className="contact-page-badge">
              <span className="contact-page-badge-dot" />
              Send a Message
            </div>

            <h2 className="contact-page-title">
              Start a conversation that could{" "}
              <span className="text-gradient">create real impact.</span>
            </h2>

            <p className="contact-page-description">
              Reach out for donations, partnerships, volunteering, media
              inquiries, or any general questions. We value every sincere
              message and look forward to connecting with you.
            </p>

            <div className="contact-form-points">
              <div className="contact-form-point">Donor & partnership inquiries</div>
              <div className="contact-form-point">Volunteer opportunities</div>
              <div className="contact-form-point">Community initiative coordination</div>
              <div className="contact-form-point">General support & information</div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="interest">Inquiry Type</label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="donation">Donation Support</option>
                  <option value="partnership">Partnership / Collaboration</option>
                  <option value="volunteer">Volunteer Interest</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div className="contact-form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell us how you'd like to connect or support..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {statusMessage && (
                <div
                  className={`contact-form-status ${
                    statusType === "success" ? "success" : "error"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"} <FiArrowUpRight />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactFormSection;