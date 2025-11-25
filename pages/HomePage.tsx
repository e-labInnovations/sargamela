import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Trophy,
  Table,
  Radio,
  Tv,
  FileText,
  Download,
} from "lucide-react";
import { MobileScoreboard } from "../components/mobile/MobileScoreboard";
import { MobilePivotTable } from "../components/mobile/MobilePivotTable";
import { MobileNews } from "../components/mobile/MobileNews";
import {
  useAllCategoriesData,
  useScoreboardMadrasas,
  useGeneralData,
} from "../hooks/useSheetData";
import { URGENT_FLASH_NEWS, TICKER_NEWS } from "../constants";

type Section = "home" | "scoreboard" | "categories" | "news";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch data
  const categoriesData = useAllCategoriesData();
  const { madrasas } = useScoreboardMadrasas();
  const { data: generalData } = useGeneralData(60 * 1000);

  const flashNewsContent = generalData?.flashNews?.trim() || URGENT_FLASH_NEWS;
  const scrollNewsContent = generalData?.scrollNews || TICKER_NEWS;
  const programStatus = generalData?.programStatus || "Completed";
  const adImageUrl = generalData?.adImageUrl?.trim() || "";

  const categories = [
    { name: "Kids", data: categoriesData.kids.data },
    { name: "Children", data: categoriesData.children.data },
    { name: "Sub Juniors", data: categoriesData.subJuniors.data },
    { name: "Juniors", data: categoriesData.juniors.data },
    { name: "Seniors", data: categoriesData.seniors.data },
  ].filter((cat) => cat.data);

  // Sync URL with active section
  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/home") {
      setActiveSection("home");
    } else if (path === "/scores" || path === "/scoreboard") {
      setActiveSection("scoreboard");
    } else if (path === "/details" || path === "/categories") {
      setActiveSection("categories");
    } else if (path === "/news") {
      setActiveSection("news");
    }
  }, [location.pathname]);

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);

    // Update URL based on section
    const pathMap: Record<Section, string> = {
      home: "/",
      scoreboard: "/scores",
      categories: "/details",
      news: "/news",
    };
    navigate(pathMap[section]);

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-16">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="h-1 bg-gradient-to-r from-news-red via-news-gold to-news-red"></div>

        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/icon.png"
              alt="Madrasa Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-malayalam font-bold text-news-black leading-tight">
                സർഗ്ഗമേള 2025
              </h1>
              <div className="flex items-center gap-1 text-xs">
                <div
                  className={`w-2 h-2 rounded-full ${
                    programStatus === "Live"
                      ? "bg-green-500 animate-pulse"
                      : programStatus === "Upcoming"
                      ? "bg-yellow-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                ></div>
                <span
                  className={
                    programStatus === "Live"
                      ? "text-green-600 font-bold"
                      : programStatus === "Upcoming"
                      ? "text-yellow-600 font-bold"
                      : "text-gray-500"
                  }
                >
                  {programStatus}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-news-black" />
            ) : (
              <Menu className="w-6 h-6 text-news-black" />
            )}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto bg-slate-50 border-t border-gray-200 scrollbar-hide">
          <button
            onClick={() => scrollToSection("home")}
            className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeSection === "home"
                ? "bg-news-red text-white border-b-2 border-news-gold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => scrollToSection("scoreboard")}
            className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeSection === "scoreboard"
                ? "bg-news-red text-white border-b-2 border-news-gold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Scores</span>
          </button>
          <button
            onClick={() => scrollToSection("categories")}
            className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeSection === "categories"
                ? "bg-news-red text-white border-b-2 border-news-gold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button
            onClick={() => scrollToSection("news")}
            className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeSection === "news"
                ? "bg-news-red text-white border-b-2 border-news-gold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>News</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[110px] left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-200 max-h-[calc(100vh-110px)] overflow-y-auto"
          >
            <div className="p-4 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 px-2 font-bold">
                  Navigation
                </p>

                <button
                  onClick={() => scrollToSection("home")}
                  className={`w-full px-4 py-3 rounded-lg font-display font-bold text-sm flex items-center gap-3 transition-all ${
                    activeSection === "home"
                      ? "bg-news-red text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => scrollToSection("scoreboard")}
                  className={`w-full px-4 py-3 rounded-lg font-display font-bold text-sm flex items-center gap-3 transition-all ${
                    activeSection === "scoreboard"
                      ? "bg-news-red text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Scores</span>
                </button>

                <button
                  onClick={() => scrollToSection("categories")}
                  className={`w-full px-4 py-3 rounded-lg font-display font-bold text-sm flex items-center gap-3 transition-all ${
                    activeSection === "categories"
                      ? "bg-news-red text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Table className="w-5 h-5" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => scrollToSection("news")}
                  className={`w-full px-4 py-3 rounded-lg font-display font-bold text-sm flex items-center gap-3 transition-all ${
                    activeSection === "news"
                      ? "bg-news-red text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Radio className="w-5 h-5" />
                  <span>News</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 px-2 font-bold">
                  Other Links
                </p>
              </div>

              {/* Big Screen Display Link */}
              <Link to="/live" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-news-red to-news-dark text-white px-4 py-3 rounded-lg font-display font-bold text-sm flex items-center justify-between gap-3 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3">
                    <Tv className="w-5 h-5" />
                    <span>Big Screen Display</span>
                  </div>
                  <span className="text-xs opacity-80">For Venue</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pb-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Home Section */}
          {activeSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Hero Banner */}
              <div className="relative bg-gradient-to-br from-news-dark via-black to-news-black px-4 py-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-news-red rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-news-gold rounded-full filter blur-3xl opacity-30"></div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 text-center"
                >
                  {/* Logo Images */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <motion.img
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src="/images/icon.png"
                      alt="Madrasa Logo"
                      className="w-16 h-16 object-contain"
                    />
                    <motion.img
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src="/images/KNM Logo.png"
                      alt="KNM Education Board"
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  {/* Sargamela Art */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-6"
                  >
                    <img
                      src="/images/sargamela-art.png"
                      alt="സർഗ്ഗമേള"
                      className="w-64 h-auto mx-auto"
                    />
                  </motion.div>

                  <div className="text-4xl font-malayalam font-bold text-white mb-3">
                    <div className="text-news-gold">2025</div>
                  </div>
                  <div className="h-1 w-24 bg-news-gold mx-auto mt-4 mb-6"></div>
                  <p className="text-white text-opacity-80 font-malayalam text-lg">
                    മദ്രസ കലോത്സവം - 2025
                  </p>
                </motion.div>
              </div>

              {/* Quick Stats */}
              <div className="px-4 grid grid-cols-3 gap-3">
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <Trophy className="w-6 h-6 text-news-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-news-red">
                    {madrasas.length}
                  </div>
                  <div className="text-xs text-gray-600 font-bold">
                    Madrasas
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <Table className="w-6 h-6 text-news-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-news-red">
                    {categories.length}
                  </div>
                  <div className="text-xs text-gray-600 font-bold">
                    Categories
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <Radio className="w-6 h-6 text-news-gold mx-auto mb-2" />
                  <div
                    className={`text-2xl font-bold ${
                      programStatus === "Live"
                        ? "text-green-600 animate-pulse"
                        : programStatus === "Upcoming"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {programStatus}
                  </div>
                  <div className="text-xs text-gray-600 font-bold">Status</div>
                </div>
              </div>

              {/* Programme Schedule Downloads */}
              <div className="px-4 py-6">
                <h3 className="text-xl font-display font-bold text-news-black mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-news-gold" />
                  Programme Schedule
                </h3>
                <div className="space-y-3">
                  {/* Stage Programme */}
                  <a
                    href="/files/KNM MADRASA SARGAMELA STAGE PROGRAMME.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-gradient-to-r from-news-red to-news-dark text-white rounded-lg shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all">
                      <div className="flex items-center gap-3">
                        <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-base">
                            Stage Programme
                          </div>
                          <div className="text-xs opacity-80">
                            View Competition Schedule
                          </div>
                        </div>
                      </div>
                      <Download className="w-5 h-5" />
                    </div>
                  </a>

                  {/* Off Stage Programme */}
                  <a
                    href="/files/KNM MADRASA SARGAMELA  OFF STAGE PROGRAMME.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all">
                      <div className="flex items-center gap-3">
                        <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-base">
                            Off Stage Programme
                          </div>
                          <div className="text-xs opacity-80">
                            View Activities Schedule
                          </div>
                        </div>
                      </div>
                      <Download className="w-5 h-5" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Quick Preview - Top 3 */}
              <div className="px-4">
                <h3 className="text-xl font-display font-bold text-news-black mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-news-gold" />
                  Top 3 Leaders
                </h3>
                <div className="space-y-2">
                  {madrasas
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3)
                    .map((madrasa, index) => (
                      <div
                        key={madrasa.id}
                        className={`bg-white rounded-lg shadow p-4 flex items-center justify-between ${
                          index === 0
                            ? "ring-2 ring-news-gold"
                            : "border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`text-2xl font-bold ${
                              index === 0
                                ? "text-news-red"
                                : index === 1
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            #{index + 1}
                          </div>
                          <div className="font-malayalam font-bold text-lg">
                            {madrasa.name}
                          </div>
                        </div>
                        <div className="text-2xl font-mono font-bold text-news-red">
                          {madrasa.score}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* News Preview */}
              {(flashNewsContent ||
                (scrollNewsContent && scrollNewsContent.length > 0)) && (
                <MobileNews
                  flashNews={flashNewsContent}
                  scrollNews={scrollNewsContent}
                />
              )}

              {/* Advertisement Section */}
              {adImageUrl && adImageUrl.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="px-4 py-6"
                >
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden border-4 border-news-gold">
                    <img
                      src={adImageUrl}
                      alt="Advertisement"
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Scoreboard Section */}
          {activeSection === "scoreboard" && (
            <motion.div
              key="scoreboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MobileScoreboard madrasas={madrasas} />
            </motion.div>
          )}

          {/* Categories Section */}
          {activeSection === "categories" && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {categories.map((category, index) => (
                <MobilePivotTable
                  key={category.name}
                  data={category.data!}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {/* News Section */}
          {activeSection === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MobileNews
                flashNews={flashNewsContent}
                scrollNews={scrollNewsContent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 py-3 px-4 shadow-lg z-40 ${
          programStatus === "Live"
            ? "bg-news-gold"
            : programStatus === "Upcoming"
            ? "bg-yellow-400"
            : "bg-gray-300"
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-news-black">
          <div
            className={`w-2 h-2 rounded-full ${
              programStatus === "Live" || programStatus === "Upcoming"
                ? "bg-news-red animate-pulse"
                : "bg-gray-600"
            }`}
          ></div>
          <span className="text-sm font-bold uppercase tracking-wide">
            {programStatus === "Live"
              ? "Live Updates"
              : programStatus === "Upcoming"
              ? "Event Upcoming"
              : "Event Completed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
