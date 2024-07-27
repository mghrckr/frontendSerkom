import { fetchTrainingEvents, formatDate } from "@/store/actionCreators";
import Navbar from "../components/Navbar";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const UserHome = () => {
    const flagPage = 'home'
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const trainingEvents = useSelector((state) => state.trainingEvents.trainingEvents);
    const oldestItem = trainingEvents.reduce((earliest, item) => {
        return new Date(item.tanggal) < new Date(earliest.tanggal) ? item : earliest;
    }, trainingEvents[0]);

    console.log(oldestItem);
    useEffect(() => {
        dispatch(fetchTrainingEvents());
    }, [dispatch]);
    return (
        <>
            <Navbar flag={flagPage} />
            <div className="relative min-h-screen w-full bg-[url('/img/event.jpeg')] bg-cover bg-no-repeat">
                <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
                <div className="grid min-h-screen px-8">
                    <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
                        <Typography variant="h3" color="white" className="mb-2">
                            KEGIATAN SERTIFIKASI KOMPETENSI
                        </Typography>
                        <Typography variant="h1" color="white" className="lg:max-w-3xl">
                            {oldestItem?.judul}
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
                        >
                            {formatDate(oldestItem?.tanggal)}
                        </Typography>
                        <div className="flex items-center gap-4">
                            <Button variant="gradient" color="white" onClick={() => {
                                navigate('/contain/eventPelatihan')
                            }}>
                                DAFTAR
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}

export default UserHome