
import React, { useState, useEffect } from 'react';
import { 
  Car,
  FileText, 
  UserCircle,
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  Shield,
  Mail,
  Users,
  ClipboardCheck,
  Calendar
} from 'lucide-react';
import jsPDF from 'jspdf';

const HomePage = () => {
  const [expandedFormIndex, setExpandedFormIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('user');
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    const type = localStorage.getItem('userType') || 'user';
    setUserType(type);
    setFilteredRegistrations(userType === 'admin' ? adminData.allRegistrations : userRegistrations);
  }, [userType]);

  useEffect(() => {
    const filtered = (userType === 'admin' ? adminData.allRegistrations : userRegistrations)
      .filter(reg => 
        reg.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredRegistrations(filtered);
  }, [searchTerm]);

  const adminData = {
    totalUsers: 150,
    totalVehicles: 180,
    activeRegistrations: 165,
    pendingApprovals: 15,
    recentActivity: "15 new registrations today",
    allRegistrations: [
      {
        id: 1,
        name: "John Doe",
        vehicleNumber: "TN33BX1415",
        type: "Four Wheeler",
        manufacturer: "Toyota",
        model: "Camry",
        licenseNumber: "TN5020220001234",
        email: "john@example.com",
        mobile: "9876543210",
        emergencyContact: "9876543211",
        registrationDate: "2024-03-15",
        status: "Active",
        address: "123 Main Street, Chennai"
      },
      {
        id: 2,
        name: "Prasannaa",
        vehicleNumber: "TN33BX1415",
        type: "Four Wheeler",
        manufacturer: "BMW",
        model: "X8",
        licenseNumber: "TN5020220001234",
        email: "john@example.com",
        mobile: "9876543210",
        emergencyContact: "9876543211",
        registrationDate: "2024-03-15",
        status: "Active",
        address: "123 Main Street, Chennai"
      },
      {
        id: 3,
        name: "Jane Smith",
        vehicleNumber: "TN33CY1789",
        type: "Two Wheeler",
        manufacturer: "Honda",
        model: "Activa",
        licenseNumber: "TN5020220005678",
        email: "jane@example.com",
        mobile: "9876543220",
        emergencyContact: "9876543221",
        registrationDate: "2024-03-10",
        status: "Active",
        address: "456 Park Road, Chennai"
      },
      {
        id: 4,
        name: "Ravi",
        vehicleNumber: "TN33CY4477",
        type: "Two Wheeler",
        manufacturer: "BMW",
        model: "320D",
        licenseNumber: "TN5020220005678",
        email: "jane@example.com",
        mobile: "9876543220",
        emergencyContact: "9876543221",
        registrationDate: "2024-03-10",
        status: "Active",
        address: "456 Park Road, Chennai"
      },
      {
        id: 5,
        name: "Vijay",
        vehicleNumber: "TN33CY4477",
        type: "Two Wheeler",
        manufacturer: "BMW",
        model: "X1",
        licenseNumber: "TN5020220005678",
        email: "jane@example.com",
        mobile: "9876543220",
        emergencyContact: "9876543221",
        registrationDate: "2024-03-10",
        status: "Active",
        address: "456 Park Road, Chennai"
      },
      {
        id: 6,
        name: "Charan",
        vehicleNumber: "TN33CY4477",
        type: "Two Wheeler",
        manufacturer: "Tvs",
        model: "Star city",
        licenseNumber: "TN5020220005678",
        email: "jane@example.com",
        mobile: "9876543220",
        emergencyContact: "9876543221",
        registrationDate: "2024-03-10",
        status: "Active",
        address: "456 Park Road, Chennai"
      },

    ]
  };

  const userRegistrations = [
    {
      id: 1,
      name: "User1",
      vehicleNumber: "TN33BX1415",
      type: "Four Wheeler",
      manufacturer: "Toyota",
      model: "Camry",
      licenseNumber: "TN5020220001234",
      email: "john@example.com",
      mobile: "9876543210",
      emergencyContact: "9876543211",
      registrationDate: "2024-03-15",
      status: "Active",
      address: "123 Main Street, Chennai"
    },
    {
        id: 1,
        name: "Prasanna",
        vehicleNumber: "TN33BX1415",
        type: "Four Wheeler",
        manufacturer: "Rolls Royce",
        model: "Ghost",
        licenseNumber: "TN5020220001234",
        email: "john@example.com",
        mobile: "9876543210",
        emergencyContact: "9876543211",
        registrationDate: "2024-03-15",
        status: "Active",
        address: "123 Main Street, Chennai"
      },
      {
        id: 1,
        name: "Mughilan",
        vehicleNumber: "TN33BX4444",
        type: "Four Wheeler",
        manufacturer: "Maruti",
        model: "800",
        licenseNumber: "TN5020220001234",
        email: "john@example.com",
        mobile: "9876543210",
        emergencyContact: "9876543211",
        registrationDate: "2024-03-15",
        status: "Active",
        address: "123 Main Street, Chennai"
      }
  ];

  const userDetails = {
    name: userType === 'admin' ? "Administrator" : "User",
    licenseNumber: "TN5020220001234",
    address: "123 Main Street, Chennai, Tamil Nadu",
    email: "john@example.com",
    mobile: "9876543210",
    emergencyContact: "9876543211"
  };

  const toggleFormDetails = (index) => {
    setExpandedFormIndex(expandedFormIndex === index ? -1 : index);
  };

  const downloadFormData = (form) => {
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

    // Owner Details
    pdf.setFontSize(14);
    pdf.text('Owner Information:', 20, 60);
    
    pdf.setFontSize(11);
    pdf.text('Name:', 25, 70);
    pdf.text(`${form.name}`, 80, 70);
    
    pdf.text('License Number:', 25, 80);
    pdf.text(`${form.licenseNumber}`, 80, 80);
    
    pdf.text('Mobile:', 25, 90);
    pdf.text(`${form.mobile}`, 80, 90);
    
    pdf.text('Email:', 25, 100);
    pdf.text(`${form.email}`, 80, 100);
    
    pdf.text('Emergency Contact:', 25, 110);
    pdf.text(`${form.emergencyContact}`, 80, 110);
    
    pdf.text('Address:', 25, 120);
    pdf.text(`${form.address}`, 80, 120);

    // Vehicle Details
    pdf.setFontSize(14);
    pdf.text('Vehicle Information:', 20, 140);
    
    pdf.setFontSize(11);
    pdf.text('Vehicle Number:', 25, 150);
    pdf.text(`${form.vehicleNumber}`, 80, 150);
    
    pdf.text('Vehicle Type:', 25, 160);
    pdf.text(`${form.type}`, 80, 160);
    
    pdf.text('Manufacturer:', 25, 170);
    pdf.text(`${form.manufacturer}`, 80, 170);
    
    pdf.text('Model:', 25, 180);
    pdf.text(`${form.model}`, 80, 180);
    
    // Footer
    pdf.setFontSize(8);
    pdf.text('This is an electronically generated document.', 20, 280);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 285);
    
    pdf.save(`${form.vehicleNumber}_registration.pdf`);
  };

  const renderAdminStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Users size={24} className="text-blue-600" />
          <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            Total
          </span>
        </div>
        <p className="text-gray-600 text-sm">Total Users</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-800">{adminData.totalUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Car size={24} className="text-green-600" />
          <span className="text-sm bg-green-50 text-green-600 px-2 py-1 rounded-full">
            Total
          </span>
        </div>
        <p className="text-gray-600 text-sm">Total Vehicles</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-800">{adminData.totalVehicles}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <ClipboardCheck size={24} className="text-purple-600" />
          <span className="text-sm bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <p className="text-gray-600 text-sm">Active Registrations</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-800">{adminData.activeRegistrations}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Calendar size={24} className="text-indigo-600" />
          <span className="text-sm bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
            Pending
          </span>
        </div>
        <p className="text-gray-600 text-sm">Pending Approvals</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-lg font-bold text-gray-800">{adminData.pendingApprovals}</p>
        </div>
      </div>
    </div>
  );

  const renderUserStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Car size={24} className="text-blue-600" />
          <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
            Total
          </span>
        </div>
        <p className="text-gray-600 text-sm">Registered Vehicles</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-800">{userRegistrations.length}</p>
        </div>
      </div>
      
      {/* Keep existing user stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Shield size={24} className="text-green-600" />
          <span className="text-sm bg-green-50 text-green-600 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <p className="text-gray-600 text-sm">Registration Status</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-800">Valid</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <UserCircle size={24} className="text-purple-600" />
          <FileText size={20} className="text-purple-600" />
        </div>
        <p className="text-gray-600 text-sm">License Status</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-800">Active</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <Mail size={24} className="text-indigo-600" />
          <span className="text-sm bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
            Contact
          </span>
        </div>
        <p className="text-gray-600 text-sm">Emergency Contact</p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-lg font-bold text-gray-800">{userDetails.emergencyContact}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 py-8 rounded-t-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, {userDetails.name}
              </h1>
              <p className="text-gray-300 mt-1">
                {userType === 'admin' ? 'Manage all vehicle registrations' : 'Manage your vehicle registrations and details'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={userType === 'admin' ? "Search all vehicles..." : "Search your vehicles..."}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Section */}
        {userType === 'admin' ? renderAdminStats() : renderUserStats()}

        {/* Vehicle Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {userType === 'admin' ? 'Recent Registered Vehicles' : 'Your Vehicles'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRegistrations.map((vehicle, index) => (
              <div 
                key={vehicle.id} 
                className="border border-gray-100 rounded-xl p-6 hover:border-gray-300 transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{vehicle.vehicleNumber}</h3>
                    <p className="text-gray-600">{vehicle.manufacturer} {vehicle.model}</p>
                  </div>
                  <button
                    onClick={() => downloadFormData(vehicle)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <Download size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                    {vehicle.type}
                  </span>
                  {userType === 'admin' && (
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      vehicle.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {vehicle.status}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleFormDetails(index)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all text-gray-700"
                >
                  {expandedFormIndex === index ? (
                    <>
                      <ChevronUp size={18} />
                      <span className="font-medium">Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} />
                      <span className="font-medium">View Details</span>
                    </>
                  )}
                </button>

                {expandedFormIndex === index && (
                  <div className="mt-4 space-y-3 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">Owner Name</span>
                        <p className="font-medium text-gray-800">{vehicle.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Email</span>
                        <p className="font-medium text-gray-800">{vehicle.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Mobile</span>
                        <p className="font-medium text-gray-800">{vehicle.mobile}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Emergency Contact</span>
                        <p className="font-medium text-gray-800">{vehicle.emergencyContact}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">License Number</span>
                        <p className="font-medium text-gray-800">{vehicle.licenseNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Registration Date</span>
                        <p className="font-medium text-gray-800">{vehicle.registrationDate}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Information - Only show for regular users */}
        {userType !== 'admin' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Full Name</p>
                <p className="font-semibold text-gray-800">{userDetails.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">License Number</p>
                <p className="font-semibold text-gray-800">{userDetails.licenseNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email Address</p>
                <p className="font-semibold text-gray-800">{userDetails.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Mobile Number</p>
                <p className="font-semibold text-gray-800">{userDetails.mobile}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-600 text-sm mb-1">Address</p>
                <p className="font-semibold text-gray-800">{userDetails.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;