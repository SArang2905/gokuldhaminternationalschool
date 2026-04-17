import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919226628083"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 animate-float group"
  >
    <span className="flex w-14 h-14 rounded-full gradient-primary text-primary-foreground items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
      <MessageCircle className="w-7 h-7" />
    </span>
  </a>
);

export default WhatsAppButton;
