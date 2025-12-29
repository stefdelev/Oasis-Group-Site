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
    <section id="contact" className="section-light">
      <div className="container-main">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-obsidian mb-4">
            Let's Build Something
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Whether you're a government exploring digital currency, an institution navigating
            blockchain integration, or an organization ready to implement AI—we'd like to hear from
            you.
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-electric-teal focus:ring-2 focus:ring-electric-teal/20 outline-none transition-all duration-300 text-obsidian placeholder:text-gray-400"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-electric-teal focus:ring-2 focus:ring-electric-teal/20 outline-none transition-all duration-300 text-obsidian placeholder:text-gray-400"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-electric-teal focus:ring-2 focus:ring-electric-teal/20 outline-none transition-all duration-300 text-obsidian placeholder:text-gray-400 resize-none"
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
              <p className="text-electric-teal font-medium">
                Thank you! Your message has been sent.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 font-medium">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
