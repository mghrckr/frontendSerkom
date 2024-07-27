import { Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { fetchPortfolio } from "@/store/actionCreators";
const BASE_URL = `http://localhost:3001`

const Portofolio = () => {
    const dispatch = useDispatch();

    const portfolio = useSelector((state) => state.portfolio.portfolio);

    const imageUrls = [
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ];

    useEffect(() => {
        dispatch(fetchPortfolio());
    }, [dispatch]);

    console.log(portfolio);
    return (
        <>
            <div style={{ marginTop: '150px' }}>
                <Typography variant="h3" color="black" className="mb-6 font-black text-center">
                    PORTOFOLIO
                </Typography>

                <Typography
                    variant="h3"
                    color="black"
                    className="font-black mb-2 text-left mt-4"
                >
                    BIDANG PEMBANGKIT TENAGA LISTRIK
                </Typography>
                <div className="h-1 ml-auto duration-300 origin-left transform bg-red-500 scale-x-30 group-hover:scale-x-100 mb-4" />
                <div className="grid max-w-screen-lg gap-8 row-gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:mx-auto">
                    {portfolio
                        .filter(port => port.bidang === 'Bidang Pembangkit Tenaga Listrik')
                        .map((port, index) => (
                            <img
                                key={index}
                                className="object-cover w-full h-56 rounded shadow-lg"
                                src={BASE_URL + port.link_gambar}
                                alt=""
                            />
                        ))
                    }
                </div>
                <Typography
                    variant="h3"
                    color="black"
                    className="font-black mb-2 text-left mt-4"
                >
                    BIDANG INSTALASI PEMANFAATAN TENAGA LISTRIK
                </Typography>
                <div className="h-1 ml-auto duration-300 origin-left transform bg-red-500 scale-x-30 group-hover:scale-x-100 mb-4" />
                <div className="grid max-w-screen-lg gap-8 row-gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:mx-auto">
                    {portfolio
                        .filter(port => port.bidang === 'Bidang Instalasi Pemanfaatan Tenaga Listrik')
                        .map((port, index) => (
                            <img
                                key={index}
                                className="object-cover w-full h-56 rounded shadow-lg"
                                src={BASE_URL + port.link_gambar}
                                alt=""
                            />
                        ))
                    }
                </div>
                <Typography
                    variant="h3"
                    color="black"
                    className="font-black mb-2 text-left mt-4"
                >
                    BIDANG DISTRIBUSI TENAGA LISTRIK
                </Typography>
                <div className="h-1 ml-auto duration-300 origin-left transform bg-red-500 scale-x-30 group-hover:scale-x-100 mb-4" />
                <div className="grid max-w-screen-lg gap-8 row-gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:mx-auto">
                    {portfolio
                        .filter(port => port.bidang === 'Bidang Distribusi Tenaga Listrik')
                        .map((port, index) => (
                            <img
                                key={index}
                                className="object-cover w-full h-56 rounded shadow-lg"
                                src={BASE_URL + port.link_gambar}
                                alt=""
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Portofolio