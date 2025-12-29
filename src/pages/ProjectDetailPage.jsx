// src/pages/ProjectDetailPage.jsx
import { useParams, Link, useLocation } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';
import portfolioProjects from '../data/portfolioProjects.js';
import projectDetails from '../data/projectDetails.js';
import Reveal from '../components/Reveal';
import Sidebar from '../components/Sidebar';

/**
 * Komponen InfoRow - Enhanced with better styling
 */
const InfoRow = ({ label, children }) => (
  <div className="flex flex-col md:flex-row border-b border-gray-100 py-5 last:border-b-0">
    <span className="w-full md:w-1/4 font-medium text-gray-500 mb-2 md:mb-0 text-sm uppercase tracking-wide">
      {label}
    </span>
    <div className="w-full md:w-3/4 text-gray-800">{children}</div>
  </div>
);

/**
 * Komponen Problems/Solutions Card - Enhanced with better styling
 */
const ProblemSolutionCard = ({
  number,
  title,
  description,
  isDarkMode = false,
}) => (
  <div
    className={`p-6 rounded-2xl h-full transition-all duration-300 hover:scale-[1.02] ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-lg'
        : 'bg-white text-black border border-gray-200 shadow-sm hover:shadow-md'
    }`}
  >
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${
      isDarkMode ? 'bg-white/10' : 'bg-gray-100'
    }`}>
      <span
        className={`text-sm font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-700'
        }`}
      >
        {number}
      </span>
    </div>
    <h4 className="text-lg font-semibold mb-3">{title}</h4>
    <p
      className={`text-sm leading-relaxed ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}
    >
      {description}
    </p>
  </div>
);

/**
 * Halaman Detail Proyek
 */
export default function ProjectDetailPage() {
  const { id } = useParams();
  const location = useLocation(); // Inisialisasi useLocation
  const isFromHome = location.state?.from === 'home';
  const backPath = isFromHome ? '/' : '/portfolio';
  const backLabel = isFromHome ? 'Home' : 'Portfolio';
  const portfolioProject = portfolioProjects.find((p) => p.id === id);
  const detail = projectDetails[id];

  if (!portfolioProject || !detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 text-gray-600 mt-[92px]">
        <h2 className="text-3xl font-semibold mb-4">Project not found</h2>
        <Link
          to={backPath}
          className="text-black underline flex items-center gap-1"
        >
          <HiChevronLeft /> Back to {backLabel}
        </Link>
      </div>
    );
  }
  // --- FUNGSI HELPER BARU UNTUK GRID DINAMIS ---
  // Fungsi ini akan mengembalikan kelas grid yang benar berdasarkan jumlah item
  const getGridColsClass = (count) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'; // Default jika 4 atau lebih
  };

  // Grid khusus untuk Components & Icons dengan lebih banyak kolom
  const getComponentsGridClass = (count) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'; // Default jika 4 atau lebih
  };

  const designSystemGridClass = getComponentsGridClass(
    detail.designSystemImages.length
  );
  const logoGridClass = getGridColsClass(detail.logoImages.length);

  return (
    <main
      className="w-full max-w-7xl mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-4 gap-12 mt-[92px]"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      {/* === Sidebar Kiri === */}
      <aside className="lg:col-span-1 lg:sticky lg:top-1/2 lg:-translate-y-1/2 self-start">
        <Sidebar />
        {/* Navigasi Dinamis dengan Icon Chevron */}
        <Link
          to={backPath}
          className="mt-8 flex items-center gap-1 text-[14px] text-gray-500 hover:text-black transition-colors"
        >
          <HiChevronLeft className="text-lg" />
          <span>Back to {backLabel}</span>
        </Link>
      </aside>

      {/* === Konten Kanan === */}
      <section className="lg:col-span-3 space-y-16">
        {/* Gambar Hero */}
        <Reveal>
          <div className="w-full h-auto md:h-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
            <img
              src={portfolioProject.image}
              alt={portfolioProject.appName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Reveal>

        {/* Project Title & Tags */}
        <Reveal>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {portfolioProject.appName}
            </h1>
            <div className="flex flex-wrap gap-2">
              {portfolioProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* --- Overview --- */}
        <Reveal>
          <article id="overview" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gray-900 rounded-full"></span>
              Overview
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <InfoRow label="Description">
                <p className="text-base text-gray-700 leading-relaxed">
                  {detail.overview}
                </p>
              </InfoRow>
              <InfoRow label="Team">
                {/* --- TOMBOL TIM INTERAKTIF --- */}
                <div className="flex -space-x-2">
                  {detail.team.map((member, i) => (
                    <a
                      key={i}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        title={member.name}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover transition-transform duration-300 group-hover:scale-110 shadow-sm"
                      />
                      {/* Kartu Nama saat Hover */}
                      <span
                        className="
                          absolute w-max max-w-xs left-1/2 top-full mt-2 -translate-x-1/2 
                          bg-gray-900 text-white rounded-lg shadow-lg px-3 py-2 text-sm
                          opacity-0 transition-opacity duration-200 
                          pointer-events-none group-hover:opacity-100 z-10
                        "
                      >
                        {member.name}
                      </span>
                    </a>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="My Role">
                <div className="flex flex-wrap gap-2">
                  {detail.role.map((r, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {r}
                    </span>
                  ))}
                </div>
              </InfoRow>
              <InfoRow label="Timeline">
                <p className="font-medium">{detail.timeline}</p>
              </InfoRow>
            </div>
          </article>
        </Reveal>

        {/* --- Bagian Problems --- */}
        <Reveal>
          <article id="problems" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-red-500 rounded-full"></span>
              Problems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {detail.problems.map((item, i) => (
                <ProblemSolutionCard
                  key={i}
                  number={`0${i + 1}`}
                  title={item.title}
                  description={item.description}
                  isDarkMode={true}
                />
              ))}
            </div>
          </article>
        </Reveal>

        {/* --- Bagian Solutions --- */}
        <Reveal>
          <article id="solutions" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-green-500 rounded-full"></span>
              Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {detail.solutions.map((item, i) => (
                <ProblemSolutionCard
                  key={i}
                  number={`0${i + 1}`}
                  title={item.title}
                  description={item.description}
                  isDarkMode={false}
                />
              ))}
            </div>
          </article>
        </Reveal>

        {/* --- Design System --- */}
        <Reveal>
          <article id="design-system" className="scroll-mt-24 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-purple-500 rounded-full"></span>
              Design System
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Color Palette */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Color Palette</h3>
                  <div className="flex flex-wrap gap-4">
                    {detail.colors.map((color) => (
                      <div key={color.hex} className="text-center">
                        <div
                          className="w-16 h-16 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-110 duration-200"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="text-xs font-mono mt-2 text-gray-600">{color.hex}</p>
                        <p className="text-xs text-gray-500">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Typography */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Typography</h3>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p
                      className="text-5xl font-bold mb-2 text-gray-900"
                      style={{ fontFamily: detail.typography.fontFamily }}
                    >
                      Aa
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      {detail.typography.fontFamily}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {detail.typography.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* === Components & Icons Grid === */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Components & Icons</h3>
                <div className={`grid ${designSystemGridClass} gap-4`}>
                  {detail.designSystemImages.map((imgSrc, i) => (
                    <div
                      key={i}
                      className="group relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300 aspect-[4/3]"
                    >
                      <img
                        src={imgSrc}
                        alt={`Design System ${i + 1}`}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* --- Logo --- */}
        <Reveal>
          <article id="logo" className="scroll-mt-24 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-yellow-500 rounded-full"></span>
              Logo
            </h2>

            {/* Logo Grid */}
            <div className={`grid ${logoGridClass} gap-6`}>
              {detail.logoImages.map((logo) => (
                <div
                  key={logo.label}
                  className="flex flex-col items-center group"
                >
                  <div
                    className={`flex justify-center items-center w-full aspect-square rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${
                      logo.label.includes('Dark')
                        ? 'bg-gray-900'
                        : 'bg-white border border-gray-100'
                    }`}
                    style={{ minHeight: '200px' }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.label}
                      className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-600 text-center">
                    {logo.label}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        {/* --- Design Result (Bento Grid) --- */}
        <Reveal>
          <article id="design-result" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
              Design Result
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[600px]">
              <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={detail.bentoImages[0]}
                  alt="Design 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={detail.bentoImages[1]}
                  alt="Design 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={detail.bentoImages[2]}
                  alt="Design 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </article>
        </Reveal>

        {/* --- Prototype --- */}
        <Reveal>
          <article id="prototype" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-teal-500 rounded-full"></span>
              Prototype
            </h2>
            {/* Wrapper untuk iframe prototype */}
            <div className="w-full overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
              <iframe
                className="border-0"
                width="100%"
                height="650"
                src={detail.figmaLink}
                allowFullScreen
              ></iframe>
            </div>
          </article>
        </Reveal>
      </section>
    </main>
  );
}
