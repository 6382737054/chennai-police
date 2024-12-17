import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Define credentials and their user types
    const credentials = {
      user: {
        email: 'klabs@gmail.com',
        password: '1234',
        userType: 'user'
      },
      admin: {
        email: 'admin@gmail.com',
        password: '1234admin',
        userType: 'admin'
      }
    };
  
    if (isLogin) {
      // Check for user credentials
      if (email === credentials.user.email && password === credentials.user.password) {
        setLoading(false);
        setError('');
        setIsAuthenticated(true);
        // Store both auth status and user type
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', credentials.user.userType);
        navigate('/home');
      }
      // Check for admin credentials
      else if (email === credentials.admin.email && password === credentials.admin.password) {
        setLoading(false);
        setError('');
        setIsAuthenticated(true);
        // Store both auth status and user type
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', credentials.admin.userType);
        navigate('/home');
      }
      else {
        setLoading(false);
        setError('Invalid credentials');
      }
    } else {
      setLoading(false);
      setError('');
      setIsLogin(true);
    }
  };
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-auto md:overflow-hidden bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-black shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <img 
              src="/Images/logo.png"
              alt="Police Logo"
              className="h-14 object-contain transition-transform duration-300 hover:scale-[1.02]"
            />
            <div className="border-l border-white/30 pl-4">
              <h1 className="text-white text-lg font-semibold">
                Greater Chennai Police
              </h1>
              <p className="text-white/80 text-sm">
                Traffic Division
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 h-[calc(100vh-76px)] flex items-start md:items-center pt-6 md:pt-0">
        <div className="w-full flex flex-col md:flex-row gap-6 items-center">
          {/* Left Section - Form */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <h2 className="text-xl font-semibold text-black mb-2">
              {isLogin ? 'Login to Portal' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {isLogin ? 'Please enter your credentials to continue' : 'Enter your details to create an account'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉️
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:border-black focus:bg-white outline-none transition-all duration-200 hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:border-black focus:bg-white outline-none transition-all duration-200 hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-gray-500">Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-black hover:text-gray-700 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {error && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center animate-fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 bg-black text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:bg-gray-800 hover:shadow-lg active:scale-[0.99]
                  ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Create account')}
              </button>

              <p className="text-center text-sm text-gray-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-black font-medium underline hover:text-gray-700 transition-colors duration-200"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </form>
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-[55%] h-[200px] md:h-[440px] md:ml-4">
            <img 
              src="/Images/login.png"
              alt="Chennai Police"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-[1.02]"
              loading="eager"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;