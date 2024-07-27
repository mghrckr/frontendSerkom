import { registerUser } from '@/store/actionCreators';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (event) => {
    event.preventDefault();

    const userData = {
      nama_lengkap: event.target.nama_lengkap.value,
      email: event.target.email.value,
      nomor_hp: event.target.nomor_hp.value,
      password: event.target.password.value,
      tanggal_lahir: event.target.tanggal_lahir.value,
      jenis_kelamin: event.target.jenis_kelamin.value,
      role: 'user',
    };

    try {
      await dispatch(registerUser(userData));

      Swal.fire({
        icon: 'success',
        title: 'Registered successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
          navigate('/auth/sign-in');
        }, 200);
      });
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
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
        <div className="bg-white rounded shadow-2xl p-4 sm:p-6 max-w-sm w-full mx-2">
          <img src={`/img/logoSerkom.png`} alt="Your Image"
            style={{ width: '100px', maxWidth: '70%', display: 'block', margin: 'auto' }}
          />
          <form className="text-left" onSubmit={handleRegister}>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="nama_lengkap"
                className="inline-block mb-1 font-medium"
              >
                Nama Lengkap
              </label>
              <input
                placeholder="Nama Lengkap"
                required
                type="text"
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="nama_lengkap"
                name="nama_lengkap"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="email"
                className="inline-block mb-1 font-medium"
              >
                Email
              </label>
              <input
                placeholder="Email"
                required
                type="email"
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="nomor_hp"
                className="inline-block mb-1 font-medium"
              >
                Nomor HP
              </label>
              <input
                placeholder="Nomor HP"
                required
                type="text"
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="nomor_hp"
                name="nomor_hp"
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
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline text-left"
                id="password"
                name="password"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="tanggal_lahir"
                className="inline-block mb-1 font-medium text-left"
              >
                Tanggal Lahir
              </label>
              <input
                required
                type="date"
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline text-left"
                id="tanggal_lahir"
                name="tanggal_lahir"
              />
            </div>
            <div className="mb-1 sm:mb-2">
              <label className="inline-block mb-1 font-medium text-left">
                Jenis Kelamin
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="jenis_kelamin"
                  value="male"
                  className="mr-2"
                />
                <label htmlFor="male" className="mr-4">Laki-laki</label>
                <input
                  type="radio"
                  id="female"
                  name="jenis_kelamin"
                  value="female"
                  className="mr-2"
                />
                <label htmlFor="female">Perempuan</label>
              </div>
            </div>
            <button
              type="submit"
              className="mb-2 w-full shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
              style={{ backgroundColor: 'green' }}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
