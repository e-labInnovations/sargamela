import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-news-dark via-black to-news-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-news-red rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-news-gold rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Logos */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <motion.img
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="/images/icon.png"
            alt="Madrasa Logo"
            className="w-20 h-20 object-contain"
          />
          <motion.img
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="/images/KNM Logo.png"
            alt="KNM Education Board"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* 404 Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <AlertCircle className="w-24 h-24 text-news-gold mx-auto" />
        </motion.div>

        {/* 404 Number */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-9xl font-display font-bold text-news-gold mb-4"
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-malayalam font-bold text-white mb-3">
            പേജ് കണ്ടെത്താനായില്ല
          </h2>
          <p className="text-xl text-gray-300 font-display">
            Page Not Found
          </p>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-news-gold to-transparent mb-8 mx-auto"
        ></motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-news-red text-white px-8 py-4 rounded-lg font-display font-bold uppercase text-sm flex items-center gap-3 shadow-lg border-2 border-news-gold hover:bg-news-dark transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="bg-gray-700 text-white px-8 py-4 rounded-lg font-display font-bold uppercase text-sm flex items-center gap-3 shadow-lg border-2 border-gray-600 hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <p className="text-gray-500 text-sm">
            സർഗ്ഗമേള 2025 - Madrasa Arts Festival
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Decoration */}
      <div className="fixed bottom-0 w-full h-2 bg-gradient-to-r from-news-red via-news-gold to-news-red"></div>
    </div>
  );
};

export default NotFoundPage;

