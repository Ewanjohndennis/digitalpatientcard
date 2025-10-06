import { motion } from "framer-motion";
import RotatingText from "@/components/rotatetext";
import AboutHighlights from "@/components/AboutHighlights"; // ← new import

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-transparent">
      {/* Rotating heading */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-4xl md:text-5xl font-bold text-cyan-800">Smart</span>
        <RotatingText
          texts={["Health", "Record", "Access"]}
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

      {/* About heading */}
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl text-center font-bold text-cyan-800 mb-6"
      >
        About Digital Patient Card
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-3xl text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-12"
      >
        The <span className="font-semibold text-cyan-700">Digital Patient Card (DPC) </span> 
        is a digital health record management system that allows patients and doctors 
        to manage medical information in a single, unified platform. 
        It helps eliminate paperwork, reduce errors, and make healthcare data more 
        accessible, reliable, and organized — anytime, anywhere.
      </motion.p>

      {/* ✅ Modular Highlights Component */}
      <AboutHighlights />

      {/* Closing Line */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 max-w-2xl text-center text-gray-700 text-lg"
      >
        <span className="font-semibold text-cyan-700">Digital Patient Card </span> 
         is more than just an app — it’s a step toward smarter, safer, and more connected healthcare.
      </motion.p>
    </section>
  );
}
