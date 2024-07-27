import React, { useState, useEffect } from 'react';
import {
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { FeatureCard } from "../components/feature-card";
import {
  Typography,
} from "@material-tailwind/react";
import Footer from '../components/Footer';
import NavbarAboutUs from '../components/NavbarAboutUs';

const AboutUs = () => {
  const featuresData = [
    {
      color: "gray",
      title: "LEGALITAS",
      icon: ChatBubbleBottomCenterTextIcon,
      description:
        "Akta Pendirian oleh Notaris M.A. Erry Hendriyanti, SH., M.Kn. dengan Nomor 01 Tanggal 21 September 2022",
    },
    {
      color: "gray",
      title: "LEGALITAS",
      icon: ChatBubbleBottomCenterTextIcon,
      description:
        "Nomor Pokok Wajib Pajak (NPWP) 61.140.840.2-014.000 PT Sertifikasi Kompetensi Indonesia",
    },
    {
      color: "gray",
      title: "LEGALITAS",
      icon: ChatBubbleBottomCenterTextIcon,
      description:
        "Pengesahan Pendirian PT.Serkomindo melalui Keputusan Menteri Hukum dan Hak Asasi Manusia Republik Indonesia. Nomor AHU-0065705.AH.01.01.Tahun 2022",
    },
    {
      color: "gray",
      title: "LEGALITAS",
      icon: ChatBubbleBottomCenterTextIcon,
      description:
        "Nomor Induk Berusaha (NIB) : 2409220036582 dengan KBLI 74322 (Aktivitas Sertifikasi Personel Independen) yang diterbitkan oleh Menteri Investasi/ Kepala Badan Koordinasi Penanaman Modal",
    },
  ];
  const flagPage = 'aboutus'
  const ResponsiveMarginDiv = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1024);
      };

      // Set initial screen size
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Clean up event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      <div
        className="w-full px-4 text-center lg:w-8/12 lg:ml-auto lg:mr-auto"
        style={{ marginTop: isSmallScreen ? '600px' : '0px' }}
      >
        {children}
      </div>
    );
  };
  return (
    <>
      <NavbarAboutUs />
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/event.jpeg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center ">
            <ResponsiveMarginDiv>
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                TENTANG KAMI
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Berdasarkan Undang-undang Nomor 30 Tahun 2009
                tentang Ketenagalistrikan; Peraturan Pemerintah
                Nomor 14 Tahun 2012 tentang Kegiatan Usaha
                Penyediaan Tenaga Listrik; dan Peraturan Menteri
                ESDM No.38 Tahun 2018 tentang Tata Cara Akreditasi
                dan Sertifikasi Ketenagalistrikan.
                Maka, Kami dari PT. Sertifikasi Kompetensi Indonesia
                (SERKOMINDO) sebagai salah satu Lembaga Sertifikasi
                Kompetensi (LSK) di bawah naungan Direktorat
                Jenderal Ketenagalistrikan (DJK) Kementerian ESDM,
                diberi hak untuk melakukan Sertifikasi Kompetensi
                terhadap Tenaga Teknik Ketenagalistrikan di
                Indonesia.
                Tujuan dari Sertifikasi Kompetensi dalam usaha
                ketenagalistrikan agar memenuhi ketentuan Keselamatan
                Ketenagalistrikan (K2) untuk mewujudkan kondisi
                instalasi tenaga listrik yang aman, andal, dan ramah
                lingkungan.
              </Typography>
            </ResponsiveMarginDiv>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-3 h-3 text-white",
                })}
                description={description}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
              <svg className="text-blue-900 w-7 h-7" viewBox="0 0 24 24">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  points="8,5 8,1 16,1 16,5"
                  strokeLinejoin="round"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  points="9,15 1,15 1,5 23,5 23,15 15,15"
                  strokeLinejoin="round"
                />
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  points="22,18 22,23 2,23 2,18"
                  strokeLinejoin="round"
                />
                <rect
                  x="9"
                  y="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  width="6"
                  height="4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="max-w-xl mb-6">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                NILAI MUTU
                <br className="hidden md:block" />
                KAMI YAITU{' '}
                <span className="inline-block text-red-500">
                  SINAR
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg text-justify">
                Kami adalah perusahaan yang berkomitmen kuat terhadap nilai mutu dalam setiap aspek bisnis kami. Dengan fokus pada kualitas sebagai landasan utama, kami membangun reputasi sebagai pemimpin industri dalam memberikan produk dan layanan yang luar biasa.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center -mx-4 lg:pl-8">
            <div className="flex flex-col items-end px-3">
              <img
                className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                src="/img/pembangunan-2.jpg"
                alt=""
              />
              <img
                className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                src="/img/konsultansi-3.jpg"
                alt=""
              />
            </div>
            <div className="px-3">
              <img
                className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                src="/img/pemeliharaan-2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* Sinergi */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <svg className="text-blue-900 w-7 h-7 mb-2" viewBox="0 0 24 24">
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="8,5 8,1 16,1 16,5" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="9,15 1,15 1,5 23,5 23,15 15,15" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="22,18 22,23 2,23 2,18" strokeLinejoin="round" />
              <rect x="9" y="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" width="6" height="4" strokeLinejoin="round" />
            </svg>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-2">Sinergi</Typography>
            <Typography variant="body1" color="blue-gray">
              Menggabungkan kekuatan individu untuk mencapai hasil yang lebih besar dan lebih baik melalui kolaborasi dan kerja sama tim.
            </Typography>
          </div>

          {/* Integritas */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <svg className="text-blue-900 w-7 h-7 mb-2" viewBox="0 0 24 24">
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="8,5 8,1 16,1 16,5" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="9,15 1,15 1,5 23,5 23,15 15,15" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="22,18 22,23 2,23 2,18" strokeLinejoin="round" />
              <rect x="9" y="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" width="6" height="4" strokeLinejoin="round" />
            </svg>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-2">Integritas</Typography>
            <Typography variant="body1" color="blue-gray">
              Menjunjung tinggi kejujuran dan moral yang kuat dalam setiap tindakan dan keputusan yang diambil.
            </Typography>
          </div>

          {/* Normatif */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <svg className="text-blue-900 w-7 h-7 mb-2" viewBox="0 0 24 24">
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="8,5 8,1 16,1 16,5" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="9,15 1,15 1,5 23,5 23,15 15,15" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="22,18 22,23 2,23 2,18" strokeLinejoin="round" />
              <rect x="9" y="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" width="6" height="4" strokeLinejoin="round" />
            </svg>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-2">Normatif</Typography>
            <Typography variant="body1" color="blue-gray">
              Mengikuti dan mematuhi standar, aturan, dan regulasi yang berlaku untuk menjaga profesionalisme dan akuntabilitas.
            </Typography>
          </div>

          {/* Andal */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <svg className="text-blue-900 w-7 h-7 mb-2" viewBox="0 0 24 24">
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="8,5 8,1 16,1 16,5" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="9,15 1,15 1,5 23,5 23,15 15,15" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="22,18 22,23 2,23 2,18" strokeLinejoin="round" />
              <rect x="9" y="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" width="6" height="4" strokeLinejoin="round" />
            </svg>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-2">Andal</Typography>
            <Typography variant="body1" color="blue-gray">
              Memberikan hasil yang konsisten dan dapat diandalkan dengan kualitas yang tinggi dalam setiap pekerjaan yang dilakukan.
            </Typography>
          </div>

          {/* Responsif */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <svg className="text-blue-900 w-7 h-7 mb-2" viewBox="0 0 24 24">
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="8,5 8,1 16,1 16,5" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="9,15 1,15 1,5 23,5 23,15 15,15" strokeLinejoin="round" />
              <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="22,18 22,23 2,23 2,18" strokeLinejoin="round" />
              <rect x="9" y="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" width="6" height="4" strokeLinejoin="round" />
            </svg>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-2">Responsif</Typography>
            <Typography variant="body1" color="blue-gray">
              Cepat dan efektif dalam merespon kebutuhan dan masalah yang muncul, dengan fleksibilitas dan kecepatan tindakan yang tinggi.
            </Typography>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
};

export default AboutUs;
