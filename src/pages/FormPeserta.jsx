import { addListPeserta, fetchUsers, fetchTrainingEvents } from '@/store/actionCreators';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const jenjangOptions = ['Pelaksana Muda', 'Pelaksana Madya', 'Pelaksana Utama', 'Teknisi Muda', 'Teknisi Madya', 'Teknisi Utama', 'Ahli Muda', 'Ahli Madya', 'Ahli Utama'];
const bidangOptions = ['PEMBANGKIT TENAGA LISTRIK', 'INSTALASI PEMANFAATAN TENAGA LISTRIK', 'DISTRIBUSI TENAGA LISTRIK'];
const subBidangOptions = ['PEMBANGUNAN DAN PEMASANGAN', 'PENGOPERASIAN', 'PEMELIHARAAN', 'PEMERIKSAAN DAN PENGUJIAN', 'KONSULTANSI'];

export const FormPeserta = () => {
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const trainingEventId = searchParams.get('trainingEventId');
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const trainingEvents = useSelector((state) => state.trainingEvents.trainingEvents);
  const selectedUser = users.find((user) => user.id.toString() === userId);
  const selectedTrainingEvent = trainingEvents.find((event) => event.id.toString() === trainingEventId);
  const lastChar = selectedTrainingEvent?.judul.slice(-1);
  const selectedBatch = parseInt(lastChar, 10);
  const [formData, setFormData] = useState({
    UserId: parseInt(userId) || '',
    TrainingEventId: parseInt(trainingEventId) || '',
    Jenjang: '',
    Bidang: '',
    SubBidang: '',
    batch: '',
    form_pp: null,
    Ktp: null,
    Ijazah: null,
    pas_foto: null,
    sk: null,
    foto_kegiatan: null,
  });
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainingEvents());
  }, [dispatch]);
  console.log(selectedTrainingEvent, 'ini batch');
  useEffect(() => {
    if (userId) {
      setFormData((prevData) => ({ ...prevData, UserId: userId }));
    }
    if (trainingEventId) {
      setFormData((prevData) => ({ ...prevData, TrainingEventId: trainingEventId }));
    }
  }, [userId, trainingEventId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeKB = e.target.name === 'form_pp' ? 1000 : 600;

    if (file && file.size > maxSizeKB * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File terlalu besar',
        text: `Ukuran file tidak boleh lebih dari ${maxSizeKB} KB`,
        showConfirmButton: true,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: file });
    }
  };

  const validateForm = () => {
    for (const key of ['UserId', 'TrainingEventId', 'Jenjang', 'Bidang', 'SubBidang', 'batch']) {
      if (!formData[key]) {
        Swal.fire({
          icon: 'error',
          title: 'Form Incomplete',
          text: `Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          showConfirmButton: true,
        });
        return false;
      }
    }

    for (const key of ['form_pp', 'Ktp', 'Ijazah', 'pas_foto', 'sk', 'foto_kegiatan']) {
      if (!formData[key]) {
        Swal.fire({
          icon: 'error',
          title: 'File Missing',
          text: `Please upload the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          showConfirmButton: true,
        });
        return false;
      }
    }

    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const pesertaData = new FormData();
    for (const key in formData) {
      pesertaData.append(key, formData[key]);
    }

    try {
      await dispatch(addListPeserta(pesertaData, userId, trainingEventId));

      Swal.fire({
        icon: 'success',
        title: 'Registered successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
          navigate('/auth/home');
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
        <div className="bg-white rounded shadow-2xl p-4 sm:p-6 max-w-5xl w-full mx-4">
          <img src={`/img/logoSerkom.png`} alt="Your Image"
            style={{ width: '100px', maxWidth: '70%', display: 'block', margin: 'auto' }}
          />
          <form className="grid grid-cols-3 gap-4" onSubmit={handleRegister}>
            <div className="mb-2">
              <label htmlFor="UserId" className="inline-block mb-1 font-medium">
                Nama
              </label>
              <input
                type="text"
                id="UserId"
                name="UserId"
                value={selectedUser ? selectedUser.nama_lengkap : ''}
                readOnly
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-gray-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="TrainingEventId" className="inline-block mb-1 font-medium">
                Nama Event
              </label>
              <input
                type="text"
                id="TrainingEventId"
                name="TrainingEventId"
                value={selectedTrainingEvent ? selectedTrainingEvent.judul : ''}
                readOnly
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-gray-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="Jenjang" className="inline-block mb-1 font-medium">
                Jenjang
              </label>
              <select
                id="Jenjang"
                name="Jenjang"
                value={formData.Jenjang}
                onChange={handleInputChange}
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              >
                <option value="">Pilih Jenjang</option>
                {jenjangOptions.map((jenjang) => (
                  <option key={jenjang} value={jenjang}>
                    {jenjang}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="Bidang" className="inline-block mb-1 font-medium">
                Bidang
              </label>
              <select
                id="Bidang"
                name="Bidang"
                value={formData.Bidang}
                onChange={handleInputChange}
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              >
                <option value="">Pilih Bidang</option>
                {bidangOptions.map((bidang) => (
                  <option key={bidang} value={bidang}>
                    {bidang}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="SubBidang" className="inline-block mb-1 font-medium">
                Sub Bidang
              </label>
              <select
                id="SubBidang"
                name="SubBidang"
                value={formData.SubBidang}
                onChange={handleInputChange}
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              >
                <option value="">Pilih Sub Bidang</option>
                {subBidangOptions.map((subBidang) => (
                  <option key={subBidang} value={subBidang}>
                    {subBidang}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="batch" className="inline-block mb-1 font-medium">
                Batch
              </label>
              <input
                type="text"
                id="batch"
                name="batch"
                // readOnly
                onChange={handleInputChange}
                value={formData.batch}
                className="flex-grow w-full h-10 px-3 mb-2 transition duration-200 bg-white-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="form_pp" className="inline-block mb-1 font-medium">
                Form PP
              </label>
              <input
                type="file"
                id="form_pp"
                name="form_pp"
                onChange={handleFileChange}
                className="w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              />
              <p>
                <strong style={{ color: 'red' }}>*PDF (max 600 kb)</strong>
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="Ktp" className="inline-block mb-1 font-medium">
                KTP
              </label>
              <input
                type="file"
                id="Ktp"
                name="Ktp"
                onChange={handleFileChange}
                className="w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              />
              <p>
                <strong style={{ color: 'red' }}>*PDF (max 600 kb)</strong>
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="Ijazah" className="inline-block mb-1 font-medium">
                Ijazah
              </label>
              <input
                type="file"
                id="Ijazah"
                name="Ijazah"
                onChange={handleFileChange}
                className="w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              />
              <p>
                <strong style={{ color: 'red' }}>*PDF (max 600 kb)</strong>
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="pas_foto" className="inline-block mb-1 font-medium">
                Pas Foto
              </label>
              <input
                type="file"
                id="pas_foto"
                name="pas_foto"
                onChange={handleFileChange}
                className="w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              />
              <p>
                <strong style={{ color: 'red' }}>*3x4 background merah (max 600 kb)</strong>
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="sk" className="inline-block mb-1 font-medium">
                Surat Keterangan (SK)
              </label>
              <input
                type="file"
                id="sk"
                name="sk"
                onChange={handleFileChange}
                className="w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              />
              <p>
                <strong style={{ color: 'red' }}>*PDF (max 600 kb)</strong>
              </p>
            </div>
            <div className="mb-2">
              <label htmlFor="foto_kegiatan" className="inline-block mb-1 font-medium">
                Foto Kegiatan
              </label>
              <input
                type="file"
                id="foto_kegiatan"
                name="foto_kegiatan"
                onChange={handleFileChange}
                className="w-full h-10 px-3 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:border-deep-purple-accent-400"
              />
              <p>
                <strong style={{ color: 'red' }}>*max 600 kb</strong>
              </p>
            </div>
            <div className="col-span-3 text-center">
              <div style={
                {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '10px'
                }
              }>
                <a href="/form.docx" download style={{
                  color: 'blue',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}>Download Form PP 1-4</a>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded shadow-md hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
