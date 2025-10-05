// src/components/AboutHighlights.jsx
import { motion } from "framer-motion";

export default function AboutHighlights() {
  const highlights = [
    {
      title: "Centralized Health Data",
      desc: "Store all your medical records in one secure and structured place.",
    },
    {
      title: "Easy Access",
      desc: "Patients and doctors can quickly view relevant medical details anytime.",
    },
    {
      title: "Data Consistency",
      desc: "Eliminates duplication and loss of records through a unified digital system.",
    },
    {
      title: "Streamlined Communication",
      desc: "Improves coordination between patients and healthcare providers.",
    },
    {
      title: "Future Integration",
      desc: "Designed to support features like QR-based access and smart analytics in upcoming versions.",
    },
    {
      title: "Reliable & Secure",
      desc: "Ensures the confidentiality and integrity of patient information through structured access.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
    >
      {highlights.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md border border-cyan-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-semibold text-cyan-700 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}