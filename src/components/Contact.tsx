import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', organization: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-dark">
      <div className="container-main">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-oasisLight mb-4">
            Let's Build Something
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Whether you're a government exploring digital currency, an institution looking at
            blockchain, or an organization thinking about AI, we'd like to hear from you.
          </p>

          {/* Form */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Hidden field for Netlify */}
            <input type="hidden" name="form-name" value="contact" />

            {/* Honeypot for spam protection */}
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" onChange={handleChange} />
              </label>
            </p>

            {/* Name */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-card border border-gray-700 focus:border-oasisAction focus:ring-1 focus:ring-oasisAction outline-none transition-all duration-300 text-oasisLight placeholder:text-slate-400"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-card border border-gray-700 focus:border-oasisAction focus:ring-1 focus:ring-oasisAction outline-none transition-all duration-300 text-oasisLight placeholder:text-slate-400"
              />
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="sr-only">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                required
                placeholder="Your Organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-card border border-gray-700 focus:border-oasisAction focus:ring-1 focus:ring-oasisAction outline-none transition-all duration-300 text-oasisLight placeholder:text-slate-400"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-card border border-gray-700 focus:border-oasisAction focus:ring-2 focus:ring-oasisAction/20 outline-none transition-all duration-300 text-oasisLight placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <p className="text-oasisAction font-medium">
                Thank you! Your message has been sent.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
