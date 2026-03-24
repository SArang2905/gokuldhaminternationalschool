import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919421621926"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
