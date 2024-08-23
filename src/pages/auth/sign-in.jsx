import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, resetPassword } from '@/store/actionCreators';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const SignIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await dispatch(loginUser(email, password));
      const token = localStorage.getItem('access_token');
      if (token) {
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/contain/eventPelatihan');
          setTimeout(() => {
            window.location.reload();
          }, 200);
        });
      } else {
        throw new Error('Access token is missing');
      }
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Email or password is incorrect. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  const handlePasswordReset = async () => {
    const success = await dispatch(resetPassword(resetEmail, newPassword));
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="relative h-screen">
      <img
        src="/img/pembangunan-3.jpg"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded shadow-2xl p-7 sm:p-10 max-w-lg w-full">
          <img src={`/img/logoSerkom.png`} alt="Your Image"
            style={{ width: '100px', maxWidth: '70%', display: 'block', margin: 'auto' }}
          />
          <form className="text-left" onSubmit={handleLogin}>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="email"
                className="inline-block mb-1 font-medium"
              >
                Username
              </label>
              <input
                placeholder="example@mail.com"
                required
                type="text"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="password"
                className="inline-block mb-1 font-medium text-left"
              >
                Password
              </label>
              <input
                placeholder="********"
                required
                type="password"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline text-left"
                id="password"
                name="password"
              />
            </div>
            <div className="mt-4 mb-2 sm:mb-4">
              <button
                type="submit"
                className="w-full shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                style={{ backgroundColor: 'red' }}
              >
                Login
              </button>
            </div>
            <hr className="my-6 border-2" />
            <button
              type="button"
              className="mb-2 w-full shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
              style={{ backgroundColor: 'green' }}
              onClick={() => navigate('/auth/sign-up')}
            >
              Register
            </button>
            <button
              type="button"
              className="w-full text-sm text-blue-600 mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Forgot Password?
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="resetEmail"
                className="w-full px-4 py-2 border rounded-lg"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                className="w-full px-4 py-2 border rounded-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handlePasswordReset}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
