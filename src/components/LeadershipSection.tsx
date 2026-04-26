import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import presidentImg from "@/assets/president.jpeg";
import principalImg from "@/assets/principal.jpeg";
import vpImg from "@/assets/vicepresident.jpeg";

const leaders = [
  { name: "Dr. Devdatt Deshpande", roleKey: "president", bioKey: "president", image: presidentImg },
  { name: "Girish Ganesh Jadhav", roleKey: "vp", bioKey: "vp", image: vpImg },
  { name: "Mrs. Raminder Kaur Modi", roleKey: "principal", bioKey: "principal", image: principalImg },
];

const LeadershipSection = () => {
  const { t } = useTranslation();
  return (
    <section id="leadership" className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-12">
            {t("leadership.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-xl p-6 shadow-md border text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4 overflow-hidden">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-secondary">{leader.name}</h4>
                <p className="text-sm font-semibold text-primary mb-3">{t(`leadership.roles.${leader.roleKey}`)}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`leadership.bios.${leader.bioKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;
