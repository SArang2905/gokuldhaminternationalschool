import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdmissionsSection = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value.trim(),
      studentName: (form.elements.namedItem("studentName") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      callbackTime: (form.elements.namedItem("callbackTime") as HTMLInputElement).value.trim(),
      heardFrom: (form.elements.namedItem("heardFrom") as HTMLSelectElement).value.trim(),
    };

    try {
      const res = await fetch("https://formspree.io/f/mjgjonrg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(t("admissions.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admissions" className="py-16 md:py-24 section-soft-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3">{t("admissions.title")}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("admissions.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-6 md:p-10 shadow-xl border-2 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 gradient-primary" />

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t("admissions.thanks")}</h3>
                <p className="text-muted-foreground">{t("admissions.callBack")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t("admissions.parentName")}</label>
                  <input name="fullName" required type="text" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t("admissions.studentName")}</label>
                  <input name="studentName" required type="text" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t("admissions.phone")}</label>
                  <input name="phone" required type="tel" pattern="[0-9]{10}" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder={t("admissions.phonePlaceholder")} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t("admissions.email")}</label>
                  <input name="email" required type="email" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t("admissions.callbackTime")}</label>
                  <input name="callbackTime" required type="text" placeholder={t("admissions.callbackPlaceholder")} className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">{t("admissions.heardFrom")}</label>
                  <select name="heardFrom" required defaultValue="" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="" disabled>{t("admissions.selectOption")}</option>
                    <option value="Google Search">{t("admissions.sources.google")}</option>
                    <option value="Social Media">{t("admissions.sources.social")}</option>
                    <option value="Friend/Family Referral">{t("admissions.sources.referral")}</option>
                    <option value="Newspaper/Advertisement">{t("admissions.sources.news")}</option>
                    <option value="School Event">{t("admissions.sources.event")}</option>
                    <option value="Other">{t("admissions.sources.other")}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg py-3 font-semibold gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? t("admissions.submitting") : t("admissions.submit")}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
