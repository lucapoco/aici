import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Add input validation for password length
    if (name === 'password' && value.length > 100) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering with:', formData);
    navigate('/dashboard');
  };
  
  // Simplified password strength calculation
  const passwordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    if (password.length > 100) return 0;
    
    let strength = 0;
    
    // Combined regex test for better performance
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    if (hasLength) strength += 1;
    if (hasUpperCase) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSpecial) strength += 1;
    
    return strength;
  };
  
  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };
  
  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start your recovery journey with us today
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 rounded-xl shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  maxLength={100}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeOff className="h-5 w-5" /> : 
                    <Eye className="h-5 w-5" />
                  }
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div className={`h-2 rounded-full ${getStrengthColor()}`} style={{ width: `${passwordStrength() * 25}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500">{getStrengthText()}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center text-xs">
                      <CheckCircle className={`h-3 w-3 mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={formData.password.length >= 8 ? 'text-gray-700' : 'text-gray-400'}>At least 8 characters</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <CheckCircle className={`h-3 w-3 mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={/[A-Z]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>Uppercase letter</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <CheckCircle className={`h-3 w-3 mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={/[0-9]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>Number</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <CheckCircle className={`h-3 w-3 mr-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={/[^A-Za-z0-9]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;