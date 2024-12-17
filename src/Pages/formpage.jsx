import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const FormPage = () => {
  const [showQR, setShowQR] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const qrRef = useRef(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    email: '',
    mobile: '',
    address: '',
    dob: '',
    
    emergencyContact: '',
    vehicleNumber: '',
    vehicleType: '',
    manufacturer: '',
    model: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
    }
    
    if (!/^\d{10}$/.test(formData.emergencyContact)) {
      newErrors.emergencyContact = 'Emergency contact must be exactly 10 digits';
    }
    
    if (!/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(formData.vehicleNumber)) {
      newErrors.vehicleNumber = 'Invalid vehicle number format (e.g., TN33BX1415)';
    }

    // if (!/^[A-Z]{2}[0-9]{13}$/.test(formData.licenseNumber)) {
    //   newErrors.licenseNumber = 'Invalid license number format';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowQR(true);
    }
  };

  const handleNext = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'vehicleNumber') {
      formattedValue = value.toUpperCase();
    }
    if (name === 'mobile' || name === 'emergencyContact') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    if (name === 'licenseNumber') {
      formattedValue = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const generateQRContent = () => {
    const qrData = {
      name: formData.name,
      licenseNumber: formData.licenseNumber,
      email: formData.email,
      mobile: formData.mobile,
      vehicleNumber: formData.vehicleNumber,
      vehicleType: formData.vehicleType,
      manufacturer: formData.manufacturer,
      model: formData.model
    };
    
    return JSON.stringify(qrData);
  };
  const downloadQRWithDetails = () => {
    const canvas = document.createElement("canvas");
    const svg = qrRef.current.querySelector('svg');
    
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      const pdf = new jsPDF();
      
      // Add logo
      pdf.addImage("/Images/logo.png", "PNG", 20, 15, 30, 30);
      
      // Header
      pdf.setFontSize(22);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Greater Chennai Police', 60, 30);
      
      pdf.setFontSize(16);
      pdf.text('Vehicle Registration Certificate', 60, 40);
      
      // Add horizontal line
      pdf.setLineWidth(0.5);
      pdf.line(20, 45, 190, 45);
      
      // Owner Details Section
      pdf.setFontSize(14);
      pdf.setTextColor(0, 51, 102);  // Dark blue color
      pdf.text('Owner Information', 20, 60);
      
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Name:', 25, 70);
      pdf.text(`${formData.name}`, 80, 70);
      
      pdf.text('License Number:', 25, 80);
      pdf.text(`${formData.licenseNumber}`, 80, 80);
      
      pdf.text('Mobile:', 25, 90);
      pdf.text(`${formData.mobile}`, 80, 90);
      
      pdf.text('Email:', 25, 100);
      pdf.text(`${formData.email}`, 80, 100);
      
      pdf.text('Emergency Contact:', 25, 110);
      pdf.text(`${formData.emergencyContact}`, 80, 110);
      
      pdf.text('Address:', 25, 120);
      pdf.text(`${formData.address}`, 80, 120);
      
      // Vehicle Details Section
      pdf.setFontSize(14);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Vehicle Information', 20, 140);
      
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Vehicle Number:', 25, 150);
      pdf.text(`${formData.vehicleNumber}`, 80, 150);
      
      pdf.text('Vehicle Type:', 25, 160);
      pdf.text(`${formData.vehicleType}`, 80, 160);
      
      pdf.text('Manufacturer:', 25, 170);
      pdf.text(`${formData.manufacturer}`, 80, 170);
      
      pdf.text('Model:', 25, 180);
      pdf.text(`${formData.model}`, 80, 180);
      
      // Add QR Code
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const qrImageData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(qrImageData, 'JPEG', 130, 140, 60, 60);
      
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text('This is an electronically generated document.', 20, 280);
      pdf.text('Scan QR code for digital verification.', 20, 285);
      
      pdf.save(`${formData.vehicleNumber}_registration.pdf`);
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  const inputClasses = "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const errorClasses = "text-red-500 text-xs mt-1";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vehicle Registration Form</h1>
        
        {!showQR ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-medium mb-4 text-gray-700 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                  {errors.licenseNumber && (
                    <p className={errorClasses}>{errors.licenseNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                  {errors.mobile && (
                    <p className={errorClasses}>{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                  {errors.emergencyContact && (
                    <p className={errorClasses}>{errors.emergencyContact}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-medium mb-4 text-gray-700 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                Vehicle Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                  {errors.vehicleNumber && (
                    <p className={errorClasses}>{errors.vehicleNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="two-wheeler">Two Wheeler</option>
                    <option value="three-wheeler">Three Wheeler</option>
                    <option value="four-wheeler">Four Wheeler</option>
                    <option value="heavy">Heavy Vehicle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer Name
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Generate QR Code
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Registration Complete!</h2>
              <p className="text-gray-600 mt-2">Your QR code has been generated successfully</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex flex-col items-center justify-center">
                <div ref={qrRef} className="bg-white p-4 rounded-lg shadow-sm flex justify-center">
                <QRCodeSVG
  value={generateQRContent()}
  size={250}
  level="M"  // Changed from "H" to "M" for better readability
  includeMargin={true}
  bgColor="#FFFFFF"
  fgColor="#000000"
  className="shadow-sm"
/>
                </div>
                
                <button
                  onClick={downloadQRWithDetails}
                  className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md w-full"
                >
                  <Download size={20} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {showSuccessMessage && (
              <div className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-center gap-2">
                <CheckCircle size={20} />
                <span>Redirecting to dashboard...</span>
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-6 w-full px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;