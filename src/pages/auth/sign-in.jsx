import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/actionCreators';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const SignIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

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
            window.location.reload()
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
                username
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
              type="submit"
              className="mb-2 w-full shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
              style={{ backgroundColor: 'green' }}
              onClick={() => {
                navigate('/auth/sign-up');
              }}
            >
              Register
            </button>
            <p className="text-xs text-gray-600 sm:text-center">
              We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
