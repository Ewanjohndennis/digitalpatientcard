import { motion } from "framer-motion";
import RotatingText from "@/components/rotatetext";

export default function AboutSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-transparent">
      {/* RotatingText before the heading */}
<div className="flex items-center justify-center gap-2 mb-8">
  <span className="text-4xl md:text-5xl font-bold text-cyan-800">
    Smart
  </span>
  <RotatingText
    texts={['Health', 'Record', 'Access']}
    mainClassName="px-4 md:px-5 bg-cyan-400 text-black rounded-4xl text-4xl md:text-4xl font-bold flex items-center"
    staggerFrom={"last"}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-120%" }}
    staggerDuration={0.025}
    splitLevelClassName="overflow-hidden"
    transition={{ type: "spring", damping: 30, stiffness: 400 }}
    rotationInterval={2000}
  />
</div>
      {/* Floating animation for About heading */}
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-cyan-800 mb-6"
      >
        About the Project
      </motion.h2>

      {/* Floating description text */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-3xl text-lg md:text-xl text-gray-700 text-center leading-relaxed"
      >
        This project introduces a <span className="font-semibold text-cyan-700">Smart Health Record System</span>,
        designed to securely store, manage, and instantly access medical details through a simple QR-based approach.
        It ensures quick retrieval in emergencies, smooth record-sharing with healthcare providers, and an overall
        modern solution for digital health management.
      </motion.p>
    </section>
  );
}
