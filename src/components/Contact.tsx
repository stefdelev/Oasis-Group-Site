import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Reveal from './Reveal';

type FormState = {
  name: string;
  email: string;
  org: string;
  interest: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const INITIAL: FormState = {
  name: '',
  email: '',
  org: '',
  interest: 'Digital Currency & Financial Infrastructure',
  message: '',
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const successHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (status === 'success') {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const upd = (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const validate = (): Errors => {
    const er: Errors = {};
    if (!form.name.trim())    er.name = 'Required';
    if (!form.email.trim())   er.email = 'Required';
    else if (!EMAIL_RE.test(form.email)) er.email = 'Invalid email';
    if (!form.org.trim())     er.org = 'Required';
    if (!form.message.trim()) er.message = 'Required';
    return er;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er = validate();
    if (Object.keys(er).length) {
      setErrors(er);
      return;
    }
    setStatus('sending');
    try {
      const body = encode({
        'form-name': 'contact',
        name: form.name,
        email: form.email,
        organization: form.org,
        interest: form.interest,
        message: form.message,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`Netlify Forms returned ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="shell">
        <Reveal>
          <div className="contact-card">
            <div className="contact-left">
              <div className="contact-eyebrow">Editorial</div>
              <h2 className="contact-title">
                Join us at<br />
                the <em>frontier.</em>
              </h2>
              <p className="contact-blurb">
                The Oasis Group is a boutique advisory firm dedicated to
                pioneering collaborations in frontier technology and governance.
                We invite visionary governments, founders, and investors to
                explore strategic partnerships and shape the future of applied
                AI, digital assets, and policy.
              </p>
              <div className="contact-meta">
                <div className="contact-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 8l8 6 8-6" />
                  </svg>
                  <a href="mailto:hello@theoasisgroup.xyz">hello@theoasisgroup.xyz</a>
                </div>
                <div className="contact-meta-row">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="3" y="4" width="18" height="16" />
                    <circle cx="8" cy="11" r="1" />
                    <path d="M11 11h7M8 16h10" />
                  </svg>
                  <a
                    href="https://linkedin.com/company/theoasisgroup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/company/theoasisgroup
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-right">
              {status === 'success' ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success-icon" aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <h3 ref={successHeadingRef} tabIndex={-1}>Inquiry received.</h3>
                  <p>We'll be in touch within two business days.</p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={submit}
                  noValidate
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p hidden>
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <h3 className="contact-form-title">Partnership Inquiry</h3>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={upd('name')}
                        className={errors.name ? 'error' : ''}
                        placeholder="Full name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name && <span id="contact-name-error" className="field-error">{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={upd('email')}
                        className={errors.email ? 'error' : ''}
                        placeholder="you@org.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email && <span id="contact-email-error" className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="contact-org">Organization</label>
                    <input
                      id="contact-org"
                      name="organization"
                      type="text"
                      value={form.org}
                      onChange={upd('org')}
                      className={errors.org ? 'error' : ''}
                      placeholder="Central bank, ministry, fund, firm…"
                      aria-invalid={Boolean(errors.org)}
                      aria-describedby={errors.org ? 'contact-org-error' : undefined}
                    />
                    {errors.org && <span id="contact-org-error" className="field-error">{errors.org}</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="contact-interest">Interest area</label>
                    <select
                      id="contact-interest"
                      name="interest"
                      value={form.interest}
                      onChange={upd('interest')}
                    >
                      <option>Digital Currency &amp; Financial Infrastructure</option>
                      <option>Applied AI &amp; Emerging Tech</option>
                      <option>Digital Coordination &amp; Governance</option>
                      <option>Venture Studio Partnership</option>
                      <option>Speaking / Press</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="contact-message">Tell us about your project</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={upd('message')}
                      className={errors.message ? 'error' : ''}
                      placeholder="The institutional context, the outcome you're after, any constraints we should know about."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && <span id="contact-message-error" className="field-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Inquiry →'}
                  </button>

                  {status === 'error' && (
                    <span role="alert" className="field-error" style={{ marginTop: 12 }}>
                      Something went wrong. Please email hello@theoasisgroup.xyz directly.
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
