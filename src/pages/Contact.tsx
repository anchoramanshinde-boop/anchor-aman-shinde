import { type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../components/SEO";
import { PHONE, PHONE_HREF, EMAIL, whatsappLink } from "../data/site";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
} as const;

export default function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Thanks! Your message has been sent — we'll get back to you shortly.");
    event.currentTarget.reset();
  };

  return (
    <div className="relative min-h-screen bg-[#181511] text-white px-6 md:px-16 py-20 overflow-hidden">
      <SEO
        title="Book a Wedding Anchor in Delhi"
        description="Book the best wedding anchor in Delhi for your event. Call or WhatsApp Anchor Aman Shinde to check availability and get a quote for weddings, corporate events and destination weddings."
        path="/contact"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-lg h-72 bg-yellow-500/5 rounded-full blur-3xl" />

      <motion.div {...fadeUp} className="relative max-w-6xl mx-auto text-center mb-16">
        <h3 className="text-yellow-500 text-sm font-semibold uppercase mb-2">Contact Us</h3>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Let's Plan Your Event</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Have a date in mind or just exploring options? Send a few details and we'll get back to
          you shortly.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* CONTACT INFO */}
        <motion.div {...fadeUp} className="md:col-span-2 space-y-6">
          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
            <Phone className="text-yellow-500 shrink-0" size={22} />
            <div>
              <p className="text-sm text-gray-400">Call or WhatsApp</p>
              <a href={PHONE_HREF} className="font-semibold hover:text-yellow-500 transition">
                {PHONE}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
            <Mail className="text-yellow-500 shrink-0" size={22} />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold hover:text-yellow-500 transition"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
            <MapPin className="text-yellow-500 shrink-0" size={22} />
            <div>
              <p className="text-sm text-gray-400">Based in</p>
              <p className="font-semibold">Delhi · Available Pan India</p>
            </div>
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 hover:scale-105 transition"
          >
            <FaWhatsapp size={20} />
            Message on WhatsApp
          </a>
        </motion.div>

        {/* FORM */}
        <motion.form {...fadeUp} onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 rounded-xl px-4 py-3 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 rounded-xl px-4 py-3 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell us about your event — date, city, and what you have in mind"
              className="w-full bg-white/5 border border-white/10 focus:border-yellow-500 rounded-xl px-4 py-3 outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 hover:scale-[1.02] transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
}
