import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
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

    // For now, simulate a form submission
    // In production, replace with actual form handling (e.g., Formspree, custom API)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create mailto link as fallback
      const mailtoLink = `mailto:hello@theoasisgroup.xyz?subject=Inquiry from ${encodeURIComponent(
        formData.name
      )} at ${encodeURIComponent(formData.organization)}&body=${encodeURIComponent(
        formData.message
      )}`;
      window.location.href = mailtoLink;

      setSubmitStatus('success');
      setFormData({ name: '', organization: '', message: '' });
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
