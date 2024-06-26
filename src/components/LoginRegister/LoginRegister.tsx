// - React -
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// - Constants -
import { backgroundImage } from '../../constants/ImagesConstants';
// - Components -
import Button from '../CustomButton/Button';

const LoginRegister: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [roles, setRole] = useState(0);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = { email, password, roles };
      const response = await fetch('http://localhost:5214/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userDataJson = await response.json();
      localStorage.setItem('loggedInUserData', JSON.stringify(userDataJson));
      navigate('/teach-room');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = { email, password, firstName, lastName, roles };
      const response = await fetch('http://localhost:5214/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setIsLogin(true);
      setErrorMessage('Registration successful. Please log in.');

      localStorage.setItem('loggedInUserData', JSON.stringify(userData));
      navigate('/teach-room');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="font-quicksand">
      <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          {isLogin ? (
            <>
              <h1 className="text-2xl font-bold text-bluePurple uppercase mb-4 text-center">Login</h1>
              <form className="flex flex-col items-center" onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <button type="submit" className="bg-bluePurple text-white py-2 px-4 rounded-lg hover:bg-galaxy transition-colors duration-300">Login</button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-bluePurple uppercase mb-4 text-center">Register</h1>
              <form className="flex flex-col items-center" onSubmit={handleRegisterSubmit}>
                <div className="mb-4">
                  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <select value={roles.toString()} onChange={(e) => {
                    const selectedRole = e.target.value === '1' ? 1 : 0; 
                    setRole(selectedRole);
                }} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3 mb-4">
                    <option value="0">Teacher</option>
                    <option value="1">Parent</option>
                </select>

                <button type="submit" className="bg-bluePurple text-white py-2 px-4 rounded-lg hover:bg-galaxy transition-colors duration-300">Register</button>
              </form>
            </>
          )}
          <div className="mt-4 flex justify-center">
            <button className="text-black hover:text-galaxy ease-in-out duration-300" onClick={handleToggleForm}>
              {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
            </button>
          </div>
          {errorMessage && <p className="text-galaxy mt-2 text-center">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;