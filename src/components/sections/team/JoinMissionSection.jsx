import { useState } from "react";
import {
  FiArrowUpRight,
  FiHeart,
  FiUsers,
  FiShield,
} from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/volunteer/join-mission-section.css";

const benefits = [
  {
    id: 1,
    icon: <FiHeart />,
    title: "Serve with Purpose",
    description:
      "Contribute your time, support, or expertise toward meaningful community upliftment and child-focused impact.",
  },
  {
    id: 2,
    icon: <FiUsers />,
    title: "Join a Caring Network",
    description:
      "Become part of a mission-driven community built on compassion, trust, and shared responsibility.",
  },
  {
    id: 3,
    icon: <FiShield />,
    title: "Support with Confidence",
    description:
      "Engage with a foundation committed to integrity, transparency, and thoughtful service.",
  },
];

const JoinMissionSection = ({
  badge = "Get Involved",
  title = "Join our mission and help create meaningful impact.",
  description = "Whether you want to volunteer, offer advisory support, collaborate, or simply connect with our cause, we welcome people who believe in compassionate and purposeful community service.",
  submitLabel = "Submit Your Interest",
  compact = false,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interestType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState(""); // success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Please enter your full name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.interestType.trim()) return "Please select your interest type.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMessage("");
    setResponseType("");

    const validationError = validateForm();
    if (validationError) {
      setResponseMessage(validationError);
      setResponseType("error");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.fullName,
        email: formData.email,
        type: 'volunteer',
        subject: formData.interestType,
        message: `Phone: ${formData.phone}\n\n${formData.message}`,
        source: "INDIA"
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (result.success) {
        setResponseMessage("Submission received! We will be in touch shortly.");
        setResponseType("success");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          interestType: "",
          message: "",
        });
      } else {
        setResponseMessage(result.message || "Something went wrong. Please try again.");
        setResponseType("error");
      }
    } catch (error) {
      setResponseMessage("Unable to submit your request right now. Please try again later.");
      setResponseType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`join-mission-section ${compact ? "compact" : ""}`}>
      <Container>
        <div className="join-mission-shell">
          {/* Left Content */}
          <div className="join-mission-content">
            <div className="join-mission-badge">
              <span className="join-mission-badge-dot" />
              {badge}
            </div>

            <h2 className="join-mission-title">{title}</h2>

            <p className="join-mission-description">{description}</p>

            <div className="join-mission-benefits">
              {benefits.map((item) => (
                <div key={item.id} className="join-mission-benefit-card">
                  <div className="join-mission-benefit-icon">{item.icon}</div>
                  <div>
                    <h3 className="join-mission-benefit-title">{item.title}</h3>
                    <p className="join-mission-benefit-description">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="join-mission-note">
              We’re always open to compassionate individuals, advisors,
              volunteers, and supporters who want to help us build stronger
              communities through service.
            </div>
          </div>

          {/* Right Form */}
          <div className="join-mission-form-wrap">
            <div className="join-mission-form-card">
              <div className="join-mission-form-top">
                <p className="join-mission-form-label">Interest Form</p>
                <h3 className="join-mission-form-title">Let’s Connect</h3>
              </div>

              <form className="join-mission-form" onSubmit={handleSubmit}>
                <div className="join-mission-form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="join-mission-form-row">
                  <div className="join-mission-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="join-mission-form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="join-mission-form-group">
                  <label htmlFor="interestType">I’m Interested In</label>
                  <select
                    id="interestType"
                    name="interestType"
                    value={formData.interestType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Advisory Support">Advisory Support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>

                <div className="join-mission-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us how you’d like to support or get involved..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {responseMessage && (
                  <div
                    style={{
                      marginBottom: "16px",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: "600",
                      background: responseType === "success" ? "#ECFDF5" : "#FEF2F2",
                      color: responseType === "success" ? "#065F46" : "#991B1B",
                      border: responseType === "success" ? "1px solid #A7F3D0" : "1px solid #FECACA",
                    }}
                  >
                    {responseMessage}
                  </div>
                )}

                <button type="submit" className="join-mission-submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : submitLabel} <FiArrowUpRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JoinMissionSection;