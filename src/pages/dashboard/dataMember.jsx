import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingEvents, addTrainingEvent, formatDate, deleteTrainingEvent } from '@/store/actionCreators';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import Swal from 'sweetalert2';

export function DataMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainingEvents = useSelector((state) => state.trainingEvents.trainingEvents);
  const BASE_URL = `http://localhost:3001`
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    tanggal: '',
    link_gambar: null
  });

  useEffect(() => {
    dispatch(fetchTrainingEvents());
  }, [dispatch]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 600 * 1024) { // 600 KB dalam byte
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ukuran file maksimal 600 KB',
      });
      e.target.value = null; // Reset input file
    } else {
      setFormData({ ...formData, link_gambar: file });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog before submitting
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this training event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit!'
    });

    if (result.isConfirmed) {
      try {
        // Dispatch the action to add the training event
        await dispatch(addTrainingEvent(formData));
        // Show success message
        Swal.fire(
          'Success!',
          'The training event has been added.',
          'success'
        );
        toggleModal(); // Close the modal or reset the form
      } catch (error) {
        // Show error message
        Swal.fire(
          'Error!',
          'There was an issue adding the training event. Please try again.',
          'error'
        );
        console.error('Failed to add training event:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await dispatch(deleteTrainingEvent(id));
        Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
      Swal.fire('Error!', 'Failed to delete event.', 'error');
    }
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="red" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="font-bold">
            DATA EVENTS
          </Typography>
          <Button className="ml-auto" color="blue" onClick={toggleModal}>
            Tambah Event
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* Search Input */}
          <div className="relative w-full ml-10 mb-4">
            <i className="absolute fa fa-search text-gray-400 top-5 left-4" />
            <input
              type="text"
              className="bg-white h-14 w-1/2 px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300 mr-2"
              style={{ backgroundColor: '#F0F0F0' }}
              placeholder="Search..."
            />
          </div>

          {/* Modal */}
          {modalOpen && (
            <div id="crud-modal" className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
              <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Tambah Event
                    </h3>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Judul
                        </label>
                        <input
                          value={formData.judul}
                          onChange={handleInputChange}
                          type="text"
                          name="judul"
                          id="judul"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type event title"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="tanggal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Tanggal
                        </label>
                        <input
                          value={formData.tanggal}
                          onChange={handleInputChange}
                          type="date"
                          name="tanggal"
                          id="tanggal"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="link_gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Gambar
                        </label>
                        <input
                          type="file"
                          name="link_gambar"
                          id="link_gambar"
                          onChange={handleFileChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Tambah
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["NO", "JUDUL", "TANGGAL", "GAMBAR", "ACTION"].map((el, index) => (
                    <th key={index} className="border-b border-blue-gray-50 py-3 px-5 text-center">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trainingEvents.map((event, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" style={{ padding: '10px 5px' }}>
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" style={{ padding: '10px 5px' }}>
                      {event.judul}
                    </td>
                    <td className="px-6 py-4 text-center" style={{ padding: '10px 5px' }}>
                      {formatDate(event.tanggal)}
                    </td>
                    <td className="px-6 py-4 text-center" style={{ padding: '10px 5px' }}>
                      <img
                        src={BASE_URL + event.link_gambar}
                        alt="Gambar Event"
                        style={{ width: '200px', height: '100px', margin: '0 auto' }}
                      />
                    </td>
                    <td
                      className="px-6 py-4 text-center"
                      style={{ padding: '10px 5px' }}
                    >
                      <Button
                        color="red"
                        onClick={() => handleDelete(event.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DataMember;
