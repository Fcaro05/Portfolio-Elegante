import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section className="py-32 bg-bg relative px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass p-12 md:p-20 rounded-[60px] relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-marketing/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-dev/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter">
              Let's build <br />
              <span className="italic">something great.</span>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono ml-1">Message</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-bg font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors hover:bg-white/90 disabled:opacity-50"
                disabled={status !== 'idle'}
              >
                {status === 'idle' && (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
                {status === 'sending' && <span>Sending...</span>}
                {status === 'sent' && <span>Message Sent!</span>}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
