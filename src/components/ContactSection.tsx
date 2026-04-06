import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3">Get in Touch</h2>
        <p className="text-muted-foreground">We'd love to hear from you. Visit us or reach out anytime.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">Address</h4>
              <p className="text-sm text-muted-foreground">Gokuldham Nagari, Malegao Road, Kasarkheda, Tq. Dist. Nanded – 431605, Maharashtra, India</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">Phone</h4>
              <a href="tel:+919226628083" className="text-sm text-muted-foreground hover:text-primary transition-colors">+91 9226628083</a>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">Email</h4>
              <a href="mailto:gisnanded@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-left text-base">gisnanded@gmail.com</a>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">Office Hours</h4>
              <p className="text-sm text-muted-foreground">Monday to Saturday, 9:00 AM – 4:00 PM</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border shadow-sm h-[300px] md:h-full min-h-[250px]"
        >
          <iframe
            title="School Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1883!2d77.278785!3d19.248369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
