import React from "react";

const DonorDetailsForm = ({ formData, onChange, idPrefix }) => {
  return (
    <>
      <div className="donation-form-grid">
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}FirstName`}>First Name</label>
          <input
            type="text"
            id={`${idPrefix}FirstName`}
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={onChange}
          />
        </div>
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}LastName`}>Last Name</label>
          <input
            type="text"
            id={`${idPrefix}LastName`}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="donation-form-grid">
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}Email`}>Email Address</label>
          <input
            type="email"
            id={`${idPrefix}Email`}
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}Phone`}>Phone Number (Optional)</label>
          <input
            type="text"
            id={`${idPrefix}Phone`}
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="donation-form-group">
        <label htmlFor={`${idPrefix}Address`}>Street Address (Optional)</label>
        <textarea
          id={`${idPrefix}Address`}
          name="address"
          rows="2"
          placeholder="Street Address"
          value={formData.address}
          onChange={onChange}
        />
      </div>

      <div className="donation-form-grid">
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}City`}>City (Optional)</label>
          <input
            type="text"
            id={`${idPrefix}City`}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={onChange}
          />
        </div>
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}State`}>State (Optional)</label>
          <input
            type="text"
            id={`${idPrefix}State`}
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="donation-form-grid">
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}Country`}>Country (Optional)</label>
          <input
            type="text"
            id={`${idPrefix}Country`}
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={onChange}
          />
        </div>
        <div className="donation-form-group">
          <label htmlFor={`${idPrefix}Zip`}>ZIP Code (Optional)</label>
          <input
            type="text"
            id={`${idPrefix}Zip`}
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default DonorDetailsForm;
