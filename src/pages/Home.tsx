import { useState, useEffect, useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PartyPopper,
  Handshake,
  Clock,
  Trophy,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Quote,
  Mic,
  Heart,
  Star,
  Landmark,
  Globe,
  MapPin,
} from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import SEO from "../components/SEO";
import WhyAmanContent from "../components/WhyAmanContent";
import { SOCIALS } from "../data/site";
import aboutImage from "../assets/about.webp";

const heroImage = "/main-photo.jpeg";

const socialLinks = [
  {
    icon: FaInstagram,
    name: "Instagram",
    handle: "@anchor_shinde",
    cta: "Follow",
    href: SOCIALS.instagram,
    hoverText: "group-hover:text-pink-400",
  },
  {
    icon: FaYoutube,
    name: "YouTube",
    handle: "@anchorfromdelhi",
    cta: "Subscribe",
    href: SOCIALS.youtube,
    hoverText: "group-hover:text-red-500",
  },
];

// Placeholder client quotes — replace with real testimonials.
const testimonials = [
  {
    quote:
      "Aman had every guest — from my 8-year-old cousin to my 80-year-old grandfather — laughing and dancing. He read the room perfectly and never once crossed a line.",
    name: "Priya & Karan Mehta",
    context: "Wedding & Sangeet · Delhi",
  },
  {
    quote:
      "We were worried our Haldi would drag. Aman kept the energy up and ran his Wheel of Fortune game — it became everyone's favourite part of the wedding.",
    name: "Ananya Sharma",
    context: "Haldi & Mehendi · Gwalior",
  },
  {
    quote:
      "He hosted our annual meet for 400 people. Professional, perfectly timed, switched effortlessly between Hindi and English. Leadership asked for him again next year.",
    name: "Rohit Nair",
    context: "Corporate Annual Meet · Gurugram",
  },
  {
    quote:
      "The Varmala presented as Shiv-Shakti Milan gave me goosebumps. Our families still talk about it — he turned a 10-minute ritual into the moment of the night.",
    name: "Sneha & Aditya",
    context: "Destination Wedding · Udaipur",
  },
  {
    quote:
      "A vendor cancelled last minute and the schedule fell apart. Aman improvised for 40 minutes and not one guest realised anything had gone wrong.",
    name: "Meghna Kapoor",
    context: "Wedding Reception · Indore",
  },
  {
    quote:
      "Booked him for our college fest. High energy, great crowd control, kept 2,000 students engaged for hours. Easily the best host we've had.",
    name: "Student Council",
    context: "Cultural Fest · Bhopal",
  },
];

const serviceAreas = [
  {
    city: "Delhi & Delhi NCR",
    blurb:
      "A trusted anchor and emcee across Delhi NCR — from banquet weddings and sangeet nights to corporate annual meets and product launches.",
  },
  {
    city: "Gwalior",
    blurb:
      "An experienced wedding host for Gwalior and nearby cities, covering haldi, mehendi, varmala ceremonies and full wedding-day stage flow.",
  },
  {
    city: "Indore & Madhya Pradesh",
    blurb:
      "Hosting weddings and corporate shows across Indore, Bhopal, Ujjain, Jabalpur and the wider Madhya Pradesh region.",
  },
];

export default function Home() {
  const cards = [
    {
      id: 1,
      icon: Mic,
      subtitle: "Corporate & Brand Shows",
      description: `• Annual Meets & Award Ceremonies
• Product Launches & Brand Activations
• Dealers’ & Distributors’ Meets
• Conferences & Business Summits
• Team Building Activities & Office Celebrations
• Family Days, Gala Nights & Employee Engagements
• Virtual Corporate Hostings`,
    },
    {
      id: 2,
      icon: Heart,
      subtitle: "Weddings & Social Celebrations",
      description: `• Sangeet & Cocktail Nights
• Wedding & Reception Ceremonies
• Haldi, Mehndi & Pool Parties
• Engagements, Birthdays & Anniversaries
• Destination Weddings & Intimate Gatherings
• Festive Celebrations (Navratri, Diwali, Holi)
• Virtual Weddings & Live Stream Hosting`,
    },
    {
      id: 3,
      icon: Star,
      subtitle: "Celebrity & Entertainment Shows",
      description: `• Celebrity & Film Promotions
• Live Concerts & Musical Nights
• Star Nights & Award Shows
• Comedy & Entertainment Events
• Reality Show Launches & Media Events
• Fan Meets & Influencer Engagements`,
    },
    {
      id: 4,
      icon: Landmark,
      subtitle: "Public & Government Events",
      description: `• Government Campaigns & Cultural Programs
• Social Awareness Drives (Swachh Bharat, Beti Bachao)
• Youth Festivals & Educational Events
• National Celebrations & Parades
• Political Rallies & Public Connect Programs`,
    },
    {
      id: 5,
      icon: Globe,
      subtitle: "Special & International Events",
      description: `• International Shows (Dubai, Singapore & Beyond)
• Marathons, Sports Leagues & Public Gatherings
• Mall Events, New Year Bashes & Dandiya Nights
• Award Galas & Luxury Lifestyle Events
• Virtual Global Events`,
    },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const centeredScrollLeft = (track: HTMLDivElement, card: HTMLElement) => {
    const raw = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    return Math.min(Math.max(raw, 0), track.scrollWidth - track.clientWidth);
  };

  const closestCardIndex = () => {
    const track = trackRef.current;
    if (!track) return 0;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs(centeredScrollLeft(track, child as HTMLElement) - track.scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const target = track?.children[index] as HTMLElement | undefined;
    if (!track || !target) return;
    track.scrollTo({ left: centeredScrollLeft(track, target), behavior: "smooth" });
    setActiveCard(index);
  };

  const goToOffset = (offset: number) =>
    scrollToCard(Math.min(Math.max(closestCardIndex() + offset, 0), cards.length - 1));

  const handleTrackScroll = () => setActiveCard(closestCardIndex());

  const [stats, setStats] = useState({ events: 0, clients: 0, years: 0, awards: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  // Smooth count-up easing animation
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 2000;
        const start = performance.now();
        const finalValues = { events: 5000, clients: 5000, years: 17, awards: 25 };

        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = easeOutCubic(progress);
          setStats({
            events: Math.floor(eased * finalValues.events),
            clients: Math.floor(eased * finalValues.clients),
            years: Math.floor(eased * finalValues.years),
            awards: Math.floor(eased * finalValues.awards),
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Thanks! Your message has been sent — we'll get back to you shortly.");
    event.currentTarget.reset();
  };

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, ease: "easeOut" },
  } as const;

  return (
    <div className="bg-gray-50">
      <SEO
        title="Best Wedding Anchor in Delhi | Anchor Aman Shinde"
        description="Best wedding anchor in Delhi with 17+ years of experience. Professional emcee and event host for sangeet, haldi, varmala, corporate events and destination weddings in Delhi, Gwalior & Indore."
        path="/"
      />
      {/* ================= HERO SECTION ================= */}
      <section
  className="relative min-h-screen flex flex-col items-center justify-between bg-cover bg-top sm:bg-center pt-10 pb-20"
  style={{ backgroundImage: `url(${heroImage})` }}
>
  <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30"></div>

  <div className="relative z-10 text-center text-white px-4 animate-[fadeIn_1s_ease-out] [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
    <p className="text-sm md:text-base uppercase tracking-[0.2em] text-yellow-400 mb-4 font-medium">
      Anchor | Wedding Anchor | Entertainer | Emcee
    </p>

    <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
      THE MIC <span className="text-yellow-500">MAGICIAN</span>
    </h1>
  </div>

  <div className="relative z-10 text-center text-white px-4 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
      <Link
        to="/contact"
        className="bg-white/10 backdrop-blur-sm border border-white/50 text-white font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 hover:text-black hover:border-yellow-500 hover:scale-105 transition inline-block"
      >
        Contact Now
      </Link>
      <Link
        to="/services"
        className="border border-white/40 text-white font-semibold px-8 py-3 rounded-md hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 transition inline-block"
      >
        Explore Services
      </Link>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-white/90 uppercase tracking-wide">
      <span>17+ Years Experience</span>
      <span className="text-yellow-500">•</span>
      <span>5000+ Events Hosted</span>
      <span className="text-yellow-500">•</span>
      <span>India · Dubai · Singapore</span>
    </div>

    <Link to="/about" aria-label="Scroll to About Me" className="block w-fit mx-auto mt-8">
      <ChevronDown className="text-yellow-400 animate-bounce" size={32} />
    </Link>
  </div>
</section>


      {/* ================= ABOUT PREVIEW SECTION ================= */}
      <section className="relative flex flex-col md:flex-row items-center justify-center py-20 px-6 md:px-16 bg-white text-gray-800 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />

        <motion.div
          {...fadeUp}
          className="relative md:w-1/2 w-full flex justify-center mb-8 md:mb-0"
        >
          <img
            src={aboutImage}
            alt="Anchor Aman Shinde hosting a wedding event"
            width={900}
            height={1200}
            loading="lazy"
            decoding="async"
            className="rounded-lg shadow-xl ring-1 ring-black/5 w-full max-w-md object-cover"
          />
        </motion.div>

        <motion.div {...fadeUp} className="relative md:w-1/2 w-full md:pl-12">
          <h3 className="text-sm font-semibold text-yellow-500 uppercase mb-2">
            About Anchor Aman Shinde
          </h3>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#201c16]">
            Anchor in Delhi | Top Wedding Anchor in India
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Celebrity Anchor Aman Shinde offers 17+ years of experience,
            specializing in high-profile weddings, corporate galas, and concerts
            across India, Dubai, and Singapore. He is renowned for his magnetic
            stage presence, versatile performance style, and unique ability to
            connect with any audience.
          </p>
          <Link
            to="/about"
            className="bg-yellow-500 hover:bg-yellow-400 hover:scale-105 text-black font-semibold px-6 py-3 rounded-md transition inline-block"
          >
            Read More
          </Link>
        </motion.div>
      </section>

      {/* ================= WHAT MAKES HIM DIFFERENT SECTION ================= */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <WhyAmanContent preview readMoreHref="/why-aman-shinde" />
      </section>

      {/* ================= HOW WE DO IT SECTION ================= */}
      <section className="py-20 bg-linear-to-br from-[#1c1f1c] via-[#242824] to-[#3a3d3a] text-white text-center overflow-hidden">
        <motion.h2 {...fadeUp} className="font-display text-3xl md:text-4xl font-bold mb-2 px-6">
          How We Do It
        </motion.h2>
        <p className="text-white/60 mb-10 px-6">Swipe through everything we bring to your event</p>

        <div className="relative max-w-6xl mx-auto px-6 md:px-16">
          {/* Arrows */}
          <button
            aria-label="Previous"
            onClick={() => goToOffset(-1)}
            className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black backdrop-blur-md ring-1 ring-white/20 transition"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Next"
            onClick={() => goToOffset(1)}
            className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-yellow-500 hover:text-black backdrop-blur-md ring-1 ring-white/20 transition"
          >
            <ChevronRight size={22} />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4"
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="shrink-0 w-[80vw] max-w-[320px] md:w-[320px] rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-8 text-left hover:-translate-y-1 hover:ring-yellow-500/50 transition"
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-500/15 flex items-center justify-center mb-6">
                  <card.icon className="text-yellow-400" size={26} />
                </div>
                <h3 className="text-lg font-semibold mb-4">{card.subtitle}</h3>
                <p className="text-sm text-white/70 whitespace-pre-line leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {cards.map((card, i) => (
              <button
                key={card.id}
                aria-label={`Go to ${card.subtitle}`}
                onClick={() => scrollToCard(i)}
                className={`h-2 rounded-full transition-all ${
                  activeCard === i ? "w-6 bg-yellow-500" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#201c16] mb-4">
            Watch Him In Action
          </h2>
          <p className="text-gray-600">
            See the energy live — hosting highlights straight from the YouTube channel.
          </p>
        </motion.div>

        <motion.a
          {...fadeUp}
          href={SOCIALS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl"
        >
          {/* ponytail: hero shot as placeholder thumbnail, swap for an actual highlight-reel frame when available */}
          <img
            src={heroImage}
            alt="Watch Aman Shinde hosting highlights on YouTube"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="text-white ml-1" size={32} fill="white" />
            </span>
          </div>
          <span className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-white font-semibold text-lg [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            <FaYoutube className="text-red-500 shrink-0" size={24} /> Watch on YouTube
          </span>
        </motion.a>
      </section>

      {/* ================= SERVICE AREAS SECTION ================= */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#201c16] mb-4">
            Wedding Anchor in Delhi, Gwalior &amp; Indore
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Looking for a professional wedding anchor near you? Aman Shinde hosts weddings,
            sangeet and cocktail nights, haldi and mehendi functions, varmala and couple
            entries, corporate events and destination weddings — bringing the same energy to a
            300-guest ballroom as to an intimate family gathering.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceAreas.map((area) => (
            <motion.div
              key={area.city}
              {...fadeUp}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-yellow-500 shrink-0" size={20} />
                <h3 className="font-display text-xl font-bold text-[#201c16]">{area.city}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{area.blurb}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="max-w-3xl mx-auto text-center text-gray-600 mt-10 leading-relaxed">
          Also available as a corporate event emcee, team building host and virtual event
          anchor — plus destination weddings across India, Dubai and Singapore.{" "}
          <Link to="/contact" className="text-yellow-600 font-semibold hover:underline">
            Check availability for your date
          </Link>
          .
        </motion.p>
      </section>

      {/* ================= PROJECT STATS SECTION ================= */}
      <section
        ref={statsRef}
        className="py-20 bg-gray-900 text-white text-center flex flex-wrap justify-center items-center gap-10 md:gap-20"
      >
        {[
          { icon: PartyPopper, value: stats.events, label: "Events Hosted" },
          { icon: Handshake, value: stats.clients, label: "Happy Clients" },
          { icon: Clock, value: stats.years, label: "Years of Experience" },
          { icon: Trophy, value: stats.awards, label: "Awards & Recognitions" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <stat.icon className="text-yellow-400 mb-2" size={36} />
            <h3 className="text-5xl font-bold text-yellow-400">{stat.value}+</h3>
            <p className="mt-2 text-gray-300 text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-24 px-6 md:px-16 bg-gray-50">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-14">
          <hr className="rule-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#201c16] mb-4">
            What Clients Say
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Families, couples and companies who trusted Aman with the moments that mattered.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              {...fadeUp}
              className="flex flex-col bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <Quote className="text-yellow-500 shrink-0 mb-4" size={28} />
              <blockquote className="font-display text-lg leading-relaxed text-[#201c16] italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-gray-100">
                <div className="font-semibold text-[#201c16]">{t.name}</div>
                <div className="text-sm text-gray-500">{t.context}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ================= FOLLOW THE JOURNEY SECTION ================= */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <motion.h2 {...fadeUp} className="font-display text-3xl md:text-4xl font-bold text-[#201c16] mb-2">
          Follow the Journey
        </motion.h2>
        <p className="text-gray-500 mb-10">Behind-the-scenes, highlight reels, and what's next on stage</p>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              {...fadeUp}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-6 transition"
            >
              <social.icon className={`text-gray-700 shrink-0 transition-colors ${social.hoverText}`} size={36} />
              <span className="text-left">
                <span className="block font-semibold text-[#201c16]">{social.name}</span>
                <span className="block text-sm text-gray-500">{social.handle}</span>
              </span>
              <span className="ml-auto bg-yellow-500 text-black text-sm font-semibold px-4 py-2 rounded-md group-hover:bg-yellow-400 group-hover:scale-105 transition">
                {social.cta}
              </span>
            </motion.a>
          ))}
        </div>
      </section>

          {/* ================= CONTACT SECTION ================= */}
<section className="relative bg-[#181511] text-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">
  <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
  {/* LEFT SIDE - FORM */}
  <motion.div {...fadeUp} className="relative w-full md:w-1/2 space-y-6">
    <h3 className="text-yellow-500 text-sm font-semibold uppercase">Contact Us</h3>
    <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Got a Question?</h2>

    <form onSubmit={handleContactSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          required
          aria-label="Your Name"
          placeholder="Your Name"
          className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 outline-none py-2 transition-colors"
        />
        <input
          type="email"
          name="email"
          required
          aria-label="Your E-mail"
          placeholder="Your E-mail"
          className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 outline-none py-2 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          name="mobile"
          aria-label="Your Mobile Number"
          placeholder="Your Mobile Number"
          className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 outline-none py-2 transition-colors"
        />
        <input
          type="text"
          name="services"
          aria-label="Services"
          placeholder="Services"
          className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 outline-none py-2 transition-colors"
        />
      </div>

      <textarea
        name="message"
        aria-label="Message"
        placeholder="Message"
        rows={4}
        className="w-full bg-transparent border-b border-gray-500 focus:border-yellow-500 outline-none py-2 resize-none transition-colors"
      ></textarea>

      <button
        type="submit"
        className="bg-yellow-500 text-black px-8 py-3 font-semibold rounded-md hover:bg-yellow-400 hover:scale-105 transition inline-block"
      >
        Send Email
      </button>
    </form>
  </motion.div>

  {/* RIGHT SIDE - IMAGE */}
  <motion.div {...fadeUp} className="relative hidden md:flex md:w-1/2 justify-end">
    <img
      src={aboutImage}
      alt="Anchor Aman Shinde, wedding anchor and emcee in Delhi"
      width={900}
      height={1200}
      loading="lazy"
      decoding="async"
      className="max-w-md w-full object-cover rounded-lg shadow-xl ring-1 ring-white/10"
    />
  </motion.div>
</section>
    </div>
  );
}
