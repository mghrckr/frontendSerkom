import { Typography } from "@material-tailwind/react";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainingEvents, formatDate } from "../store/actionCreators";
import { useNavigate } from 'react-router-dom';

const EventPelatihan = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const BASE_URL = `http://localhost:3001`
    const userId = parseInt(localStorage.getItem('id'), 10);
    const access_token = localStorage.getItem('access_token')
    const trainingEvents = useSelector((state) => state.trainingEvents.trainingEvents);

    useEffect(() => {
        dispatch(fetchTrainingEvents());
    }, [dispatch]);

    const handleNavigate = async (userId, trainingEventId) => {
        try {
            if (access_token) {
                navigate(`/auth/formPeserta?userId=${userId}&trainingEventId=${trainingEventId}`);
            } else {
                navigate('/auth/sign-in');
            }
        } catch (error) {
            console.error('Error checking token:', error);
            navigate('/auth/sign-in');
        }
    };

    return (
        <div style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Typography variant="h3" color="black" className="mb-6 font-black text-center">
                EVENT PELATIHAN
            </Typography>
            {trainingEvents.map((item, index) => (
                <a
                    href="#"
                    aria-label="View Item"
                    key={index}
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(userId, item.id);
                    }}
                >
                    <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl mb-5">
                        <img
                            className="object-cover w-full h-56 md:h-64 xl:h-80"
                            src={BASE_URL + item.link_gambar}
                            alt={`Event ${index + 1}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 px-6 py-4 bg-black bg-opacity-75">
                            <p className="text-xl font-medium tracking-wide text-white text-center">
                                {item.judul} ( {formatDate(item.tanggal)} )
                            </p>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    )
}

export default EventPelatihan;
