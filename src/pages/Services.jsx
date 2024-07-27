import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "../components/article-card";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Steps } from "../components/Steps";
import { fetchServices } from "../store/actionCreators";

const Services = () => {

    const dispatch = useDispatch();

    const services = useSelector((state) => state.services.services);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    };

    const filteredArticles = services.filter(article => {
        const matchesFilter = filterBy ? article.judul.includes(filterBy) : true;
        const matchesSearchTerm = article.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearchTerm;
    });

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    console.log(services);
    return (
        <section className="container mx-auto px-8 py-20">
            <Typography variant="h3" color="black" className="mb-6 font-black text-center">
                LAYANAN PRODUK
            </Typography>
            <div className="flex items-center justify-between mb-4">
                <div className="relative ml-2 mr-8 mt-2 mb-4">
                    <i className="absolute fa fa-search text-gray-400 top-3 left-4" />
                    <input
                        type="text"
                        className="bg-white h-10 px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300"
                        name=""
                        style={{ backgroundColor: '#F0F0F0' }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="ml-4">
                    <select
                        value={filterBy}
                        onChange={handleFilterChange}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                        <option value="">Semua Bidang</option>
                        <option value="Bidang Pembangkit Tenaga Listrik :">Bidang Pembangkit Tenaga Listrik</option>
                        <option value="Bidang Instalasi Pemanfaatan Tenaga Listrik:">Bidang Instalasi Pemanfaatan Tenaga Listrik</option>
                        <option value="Bidang Distribusi Tenaga Listrik:">Bidang Distribusi Tenaga Listrik</option>
                    </select>
                </div>
            </div>
            <div className="grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2">
                {filteredArticles.map((props, idx) => (
                    <ArticleCard key={idx} {...props} />
                ))}
            </div>
            <Typography variant="h3" color="black" className="mb-6 font-black text-center">
                JENJANG KUALIFIKASI
                TENAGA TEKNIK KETENAGALISTRIKAN
            </Typography>
            <Steps />
        </section>
    );
}

export default Services;
