import { Link, useLocation } from 'react-router-dom';
/**
 * Komponen kartu proyek untuk halaman portofolio.
 * Menampilkan judul, deskripsi singkat, tags, dan gambar pratinjau.
 * Kartu menggunakan gradien berdasarkan warna utama project.
 * Pada hover, kartu terangkat sedikit dan bayangannya bertambah.
 *
 * @param {Object} project - Data proyek untuk ditampilkan
 * @param {boolean} isFullWidth - Apakah kartu ditampilkan dengan lebar penuh (col-span-2)
 */
export default function ProjectCard({ project, isFullWidth = false }) {
  const location = useLocation();
  const fromPage = location.pathname === '/' ? 'home' : 'portfolio';
  /*
   * Desain ulang kartu proyek agar lebih sederhana sesuai referensi:
   * hanya menampilkan nama aplikasi, deskripsi singkat, baris tags, dan
   * mockup gambar. Tanpa logo dan tanpa area gradien. Kartu memiliki
   * latar belakang terang dengan bayangan halus dan animasi hover.
   */
  return (
    <Link
      to={`/portfolio/${project.id}`}
      state={{ from: fromPage }} // Mengirim state "asal" halaman
      className="block rounded-3xl overflow-hidden shadow-md dark:shadow-lg group-hover:shadow-xl group cursor-pointer transform transition-transform duration-300 hover:-translate-y-2"
      style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
    >
      {/*
        Layout kartu: untuk full-width, gunakan layout side-by-side di desktop
        untuk menampilkan konten dan gambar secara optimal
      */}
      <div
        className={`rounded-3xl bg-[#FAFAFA] transition-shadow duration-300 flex ${
          isFullWidth ? 'flex-col md:flex-row' : 'flex-col'
        }`}
      >
        {/* Content Section */}
        <div
          className={`pb-6 p-6 ${isFullWidth ? 'md:w-2/5 md:flex md:flex-col md:justify-center' : ''}`}
        >
          {/* Header: Nama Projek di kiri, Tahun & Role di kanan banget */}
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg md:text-2xl font-bold text-black">
              {project.appName}
            </h3>
            <span className="text-[12px] md:text-sm text-gray-500 font-medium whitespace-nowrap ml-4">
              {project.year || '2025'} • {project.role || 'Product Design'}
            </span>
          </div>
          {/* Deskripsi singkat */}
          <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-600  leading-relaxed">
            {project.description}
          </p>
          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => {
              // Tag 'Live' diberi warna hijau, tag lainnya berwarna abu muda
              const isLive =
                tag.toLowerCase() === 'live' || tag.toLowerCase() === 'figma';
              const tagClasses = isLive
                ? 'bg-[#2A9F47] text-white'
                : 'bg-[#f2efef] text-gray-600';
              return (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tagClasses}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* Image Section: untuk full-width, gambar lebih besar dan menggunakan aspect-ratio */}
        <div
          className={`w-full overflow-hidden ${
            isFullWidth
              ? 'md:w-3/5 h-72 md:h-auto md:min-h-[400px]'
              : 'mt-6 h-96'
          }`}
        >
          <img
            src={project.image}
            alt={project.appName}
            className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
              isFullWidth
                ? 'object-cover object-top md:rounded-r-3xl'
                : 'object-cover object-center'
            }`}
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
}
