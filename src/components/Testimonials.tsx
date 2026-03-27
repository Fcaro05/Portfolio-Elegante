import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    content: "An exceptional talent who understands both the technical and business sides of a product. A rare find in today's market.",
    author: "Sarah Jenkins",
    role: "CEO at TechFlow",
    avatar: "https://picsum.photos/seed/person1/100/100"
  },
  {
    content: "The marketing strategies implemented were game-changing for our growth. Highly professional and results-oriented.",
    author: "Marcus Thorne",
    role: "Marketing Director at Innovate",
    avatar: "https://picsum.photos/seed/person2/100/100"
  },
  {
    content: "Incredible attention to detail and a deep understanding of modern web architecture. Truly a pleasure to work with.",
    author: "Elena Rodriguez",
    role: "Product Manager at Nexus",
    avatar: "https://picsum.photos/seed/person3/100/100"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif italic mb-4"
          >
            Kind Words
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-mono text-xs uppercase tracking-widest"
          >
            From partners and clients
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-10 rounded-[40px] flex flex-col justify-between relative"
              data-cursor-text="Read"
            >
              <Quote className="absolute top-8 right-8 text-white/5" size={60} />
              
              <p className="text-lg text-white/80 leading-relaxed italic mb-12 relative z-10">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-full border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm">{t.author}</h4>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
