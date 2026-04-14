import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const grades = ["LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
const sources = ["Word of mouth", "Pamphlet/Brochure", "Social Media", "Other"];

const AdmissionsSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = {
      parentName: (form.elements.namedItem("parentName") as HTMLInputElement).value.trim(),
      mobile: (form.elements.namedItem("mobile") as HTMLInputElement).value.trim(),
      studentName: (form.elements.namedItem("studentName") as HTMLInputElement).value.trim(),
      grade: (form.elements.namedItem("grade") as HTMLSelectElement).value,
      source: (form.elements.namedItem("source") as HTMLSelectElement).value,
    };

    try {
      const { data, error } = await supabase.functions.invoke("submit-inquiry", {
        body: formData,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please try again or call us directly.");
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
          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3">Admissions Open 2026–27</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Currently enrolling students for LKG to Grade 6. Limited seats available. Secure your child's future today.
          </p>
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
                <h3 className="text-xl font-bold text-foreground mb-2">Thank You!</h3>
                <p className="text-muted-foreground">Our admissions team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Parent's Full Name</label>
                  <input name="parentName" required type="text" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Mobile Number</label>
                  <input name="mobile" required type="tel" pattern="[0-9]{10}" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" placeholder="10-digit mobile number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Student's Name</label>
                  <input name="studentName" required type="text" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Grade Applying For</label>
                  <select name="grade" required className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Select Grade</option>
                    {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">How did you hear about us?</label>
                  <select name="source" required className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Select</option>
                    {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg py-3 font-semibold gradient-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Submitting..." : "Request a Callback"}
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
