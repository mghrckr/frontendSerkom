import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingEvents, fetchListPeserta, fetchUsers, deleteListPeserta } from '@/store/actionCreators';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export function DataKomisi() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const trainingEvents = useSelector((state) => state.trainingEvents.trainingEvents);
  const listPeserta = useSelector((state) => state.listPeserta.listPeserta);
  const BASE_URL = `http://localhost:3001`;
  const [selectedEvent, setSelectedEvent] = useState('');
  const [filteredListPeserta, setFilteredListPeserta] = useState(listPeserta);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainingEvents());
    dispatch(fetchListPeserta());
  }, [dispatch]);

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
        await dispatch(deleteListPeserta(id));
        Swal.fire('Deleted!', 'Your LIST has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete LIST:', error);
      Swal.fire('Error!', 'Failed to delete LIST.', 'error');
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      setFilteredListPeserta(listPeserta.filter(peserta => peserta.TrainingEventId === parseInt(selectedEvent)));
    } else {
      setFilteredListPeserta(listPeserta);
    }
  }, [selectedEvent, listPeserta]);

  const getUserNameById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.nama_lengkap : 'Unknown';
  };

  const getEventTitleById = (eventId) => {
    const event = trainingEvents.find(event => event.id === eventId);
    return event ? event.judul : 'Unknown Event';
  };

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const downloadFilesForRow = async (peserta) => {
    const zip = new JSZip();
    const fileUrls = [
      peserta.form_pp,
      peserta.Ktp,
      peserta.sk,
      peserta.Ijazah,
      peserta.pas_foto,
      peserta.foto_kegiatan,
    ];

    for (const fileUrl of fileUrls) {
      if (fileUrl) {
        try {
          const response = await fetch(BASE_URL + fileUrl);
          const blob = await response.blob();
          const fileName = fileUrl.split('/').pop(); // Extract file name from URL
          zip.file(fileName, blob);
        } catch (error) {
          console.error(`Failed to fetch file: ${fileUrl}`, error);
        }
      }
    }

    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${getUserNameById(peserta.UserId)}_files.zip`);
    });
  };

  const exportToExcel = () => {
    const data = filteredListPeserta.map(peserta => ({
      NAMA: getUserNameById(peserta.UserId),
      EVENT: getEventTitleById(peserta.TrainingEventId),
      JENJANG: peserta.Jenjang,
      BIDANG: peserta.Bidang,
      SUB_BIDANG: peserta.SubBidang,
      FORM_PP: BASE_URL + peserta.form_pp,
      KTP: BASE_URL + peserta.Ktp,
      SK: BASE_URL + peserta.sk,
      IJAZAH: BASE_URL + peserta.Ijazah,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Peserta');
    XLSX.writeFile(workbook, 'peserta_data.xlsx');
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="red" className="mb-8 p-6">
          <Typography variant="h6" color="white" className="font-bold">
            LIST PESERTA
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* Event Dropdown */}
          <div className="relative w-full ml-10 mb-4">
            <label htmlFor="event-filter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter by Event
            </label>
            <select
              id="event-filter"
              className="bg-white h-14 w-1/2 px-4 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300 mr-2"
              onChange={handleEventChange}
              value={selectedEvent}
            >
              <option value="">All Events</option>
              {trainingEvents.map(event => (
                <option key={event.id} value={event.id}>
                  {event.judul}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <div className="mb-4 ml-10">
            <Button color="green" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>

          {/* Table */}
          <table className="w-full min-w-[800px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {["NAMA", "EVENT", "JENJANG", "BIDANG", "SUB BIDANG", "FORM PP,KTP,SK,IJAZAH", "ACTION"].map((el, index) => (
                  <th key={index} className="border-b border-blue-gray-50 py-3 px-5 text-center">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredListPeserta.map((peserta, index) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" style={{ padding: '10px 5px' }}>
                    {getUserNameById(peserta.UserId)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center" style={{ padding: '10px 5px' }}>
                    {getEventTitleById(peserta.TrainingEventId)}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ padding: '10px 5px' }}>
                    {peserta.Jenjang}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ padding: '10px 5px' }}>
                    {peserta.Bidang}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ padding: '10px 5px' }}>
                    {peserta.SubBidang}
                  </td>
                  <td className="px-6 py-4 text-center" style={{ padding: '10px 5px' }}>
                    <Button color="blue" onClick={() => downloadFilesForRow(peserta)}>
                      Download All Files
                    </Button>
                  </td>
                  <td
                    className="px-6 py-4 text-center"
                    style={{ padding: '10px 5px' }}
                  >
                    <Button
                      color="red"
                      onClick={() => handleDelete(peserta.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default DataKomisi;
