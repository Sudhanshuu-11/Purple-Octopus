import React, { useState } from "react";
import PageLayout from "../components/layout/PageLayout.jsx";
import { createInquiry } from "../app/api.js";
import { services } from "../data/services.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

export default function EnquiryPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const completedRequiredFields = [form.name, form.email, form.message].filter((value) => value.trim()).length;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      const result = await createInquiry(form);
      setForm(initialForm);
      setStatus({ type: "success", message: result.message || "Thanks. Your enquiry has been received." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="enquiry-page">
        <div className="enquiry-intro">
          <div className="section-kicker">/ START A PROJECT</div>
          <h1>Tell us what<br /><em>you’re building.</em></h1>
          <p>Share a few details about your goals. We’ll review your enquiry and get back to you with the right next step.</p>
          <div className="enquiry-contact"><span>Prefer email?</span><a href="mailto:purpleoctopus@outlook.in">purpleoctopus@outlook.in <span aria-hidden="true">↗</span></a></div>
          <div className="enquiry-steps" aria-label="What happens next">
            <div className="enquiry-step"><span>01</span><p><strong>You tell us</strong><br />What you’re building and where you want to go.</p></div>
            <div className="enquiry-step"><span>02</span><p><strong>We get aligned</strong><br />We learn about your goals and what success means.</p></div>
            <div className="enquiry-step"><span>03</span><p><strong>We make a plan</strong><br />You get a clear next step for moving forward.</p></div>
          </div>
        </div>

        <form className="enquiry-form" onSubmit={submitEnquiry}>
          <div className="enquiry-form-heading"><span>YOUR PROJECT, IN YOUR WORDS</span><span className="enquiry-required"><i /> Required fields</span></div>
          <div className="enquiry-progress-copy"><span>Project brief</span><span>{completedRequiredFields} of 3 essentials</span></div>
          <div className="enquiry-progress-track" role="progressbar" aria-label="Required fields completed" aria-valuemin="0" aria-valuemax="3" aria-valuenow={completedRequiredFields}>
            <span style={{ width: `${(completedRequiredFields / 3) * 100}%` }} />
          </div>
          <div className="form-row">
            <label>Full name <input name="name" value={form.name} onChange={updateField} autoComplete="name" required /></label>
            <label>Work email <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required /></label>
          </div>
          <div className="form-row">
            <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" /></label>
            <label>Company or brand<input name="company" value={form.company} onChange={updateField} autoComplete="organization" /></label>
          </div>
          <div className="form-row">
            <label>Service you need
              <select name="service" value={form.service} onChange={updateField}>
                <option value="">Select a service</option>
                {services.map((service) => <option value={service.name} key={service.path}>{service.name}</option>)}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
            <label>Estimated budget
              <select name="budget" value={form.budget} onChange={updateField}>
                <option value="">Select a range</option>
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000–₹1,50,000">₹50,000–₹1,50,000</option>
                <option value="₹1,50,000–₹5,00,000">₹1,50,000–₹5,00,000</option>
                <option value="₹5,00,000+">₹5,00,000+</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>Ideal timeline
              <select name="timeline" value={form.timeline} onChange={updateField}>
                <option value="">Select a timeline</option>
                <option value="This month">This month</option>
                <option value="In 1–3 months">In 1–3 months</option>
                <option value="In 3+ months">In 3+ months</option>
              </select>
            </label>
          </div>
          <label className="form-message">How can we help? <textarea name="message" value={form.message} onChange={updateField} rows="6" placeholder="Tell us about your goals, audience and challenge." required /></label>
          {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
          <button className="button primary enquiry-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send enquiry"}<span aria-hidden="true">↗</span></button>
        </form>
      </section>
    </PageLayout>
  );
}
