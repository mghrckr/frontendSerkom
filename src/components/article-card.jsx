import React from "react";
const BASE_URL = `http://localhost:3001`

export function ArticleCard({ link_gambar, judul, deskripsi }) {
  return (
    <>
      <a
        href="#"
        aria-label="View Item"
        className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
      >
        <div className="flex flex-col h-full">
          <img
            src={BASE_URL+link_gambar}
            className="object-cover w-full h-48"
            alt=""
          />
          <div className="flex-grow border border-t-0 rounded-b">
            <div className="p-5">
              <h6 className="mb-2 font-semibold leading-5">
                {judul}
              </h6>
              <p className="text-sm text-gray-900">
                {deskripsi}
              </p>
            </div>
          </div>
        </div>
      </a>

    </>
  );
}

export default ArticleCard;
