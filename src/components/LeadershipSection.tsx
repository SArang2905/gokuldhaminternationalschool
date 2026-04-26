import { motion } from "framer-motion";
import presidentImg from "@/assets/president.jpeg";
import principalImg from "@/assets/principal.jpeg";
import vpImg from "@/assets/vicepresident.jpeg";

const leaders = [
  {
    name: "Dr. Devdatt Deshpande",
    role: "President",
    image: presidentImg,
    description:
      "A visionary leader and accomplished academician, Dr. Devdatt Deshpande brings a rich blend of experience in education, journalism, and administration. With a Ph.D. in Mass Communication and decades of professional expertise, he has made significant contributions to academic and social development in Nanded. Carrying forward the proud legacy of serving the education sector inspired by his father, Mr. B. G. Deshpande, he is deeply committed to shaping the future of young minds. As the President of Gokuldham International School, his mission is to build world-class infrastructure and provide high-quality education at an affordable cost, ensuring that no child is deprived of the best learning opportunities and facilities.",
  },
  {
    name: "Girish Ganesh Jadhav",
    role: "Vice President",
    image: vpImg,
    description:
      "A forward-thinking leader with a strong background in technology and economics, he is a highly qualified professional with a Master's in Computer Application and over 10 years of experience in the banking industry. As a seasoned Economist and Branch Manager in Bank, he has honed his leadership and management skills, successfully leading teams and driving growth. His vision is to create a learning environment that fosters innovation, creativity, and academic excellence, empowering students to succeed in an ever-changing world.",
  },
  {
    name: "Mrs. Raminder Kaur Modi",
    role: "Director Principal",
    image: principalImg,
    description:
      "Mrs. Raminder Kaur Modi is a visionary educationist with over 20 years of experience in school education. Having worked across India, she brings rich leadership experience in CBSE and ICSE schools, delivering proven academic and institutional excellence. She has been honoured with several national awards, and her work has also received international recognition. Under her leadership, Gokuldham International School, Nanded is committed to providing high-quality, value-based education that nurtures confident, capable and future-ready students.",
  },
];

const LeadershipSection = () => (
  <section id="leadership" className="py-16 md:py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-secondary text-center mb-12">
          Our Leadership
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
              <p className="text-sm font-semibold text-primary mb-3">{leader.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {leader.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default LeadershipSection;
