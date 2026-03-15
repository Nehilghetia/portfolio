import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Youtube, Twitter, ArrowRight, User, MessageSquare, Info } from "lucide-react";

const steps = [
  { id: 1, label: "Your Name", icon: User, placeholder: "John Doe", field: "name", type: "text" },
  { id: 2, label: "Email", icon: Mail, placeholder: "john@example.com", field: "email", type: "email" },
  { id: 3, label: "Subject (optional)", icon: Info, placeholder: "Web Development Project", field: "subject", type: "text" },
  { id: 4, label: "Message", icon: MessageSquare, placeholder: "Tell me about your project...", field: "message", type: "textarea" },
] as const;

const ContactSection = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const currentStepInfo = steps[step - 1];

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleActionClick = () => {
    const subject = encodeURIComponent(`Portfolio inquiry`);
    window.open(`mailto:nehil.ghetia.cg@gmail.com?subject=${subject}`);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step < 4) {
      if (!form[currentStepInfo.field as keyof typeof form] && currentStepInfo.field !== 'subject') {
        return;
      }
      nextStep();
      return;
    }

    setIsSending(true);
    const loadingToast = toast.loading("Sending your message via EmailJS...");

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_ghpkeg7",
          template_id: "template_2xp9isd",
          user_id: "vftG60dMRQAQlf02Q",
          template_params: {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject || `New message from ${form.name}`,
            message: form.message,
            to_name: "Nehil Ghetia",
          },
        }),
      });

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.", { id: loadingToast });
        setForm({ name: "", email: "", subject: "", message: "" });
        setStep(1);
      } else {
        const errorData = await response.text();
        console.error("EmailJS Error:", errorData);
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      toast.error("Failed to send message. Please try again or email me directly.", { id: loadingToast });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">

        {/* Top Header */}
        <div data-gsap="fade-up" className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
          <div className="px-4 py-1.5 rounded-full border border-border/50 text-xs font-bold tracking-wider text-muted-foreground uppercase bg-secondary/50 shadow-sm">
            Let's build something together
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">Contact Me</span> <span className="text-foreground">& Let's Talk</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-neon-purple rounded-full" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-5 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground bg-secondary/30">Replies in under 24h</span>
            <span className="px-5 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground bg-secondary/30">Open to remote</span>
            <span className="px-5 py-2 rounded-full border border-border/50 text-sm font-medium text-muted-foreground bg-secondary/30">Product, SaaS, and platforms</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Panel */}
          <div data-gsap="fade-left" className="lg:col-span-5 bg-card border border-border rounded-[2rem] p-8 flex flex-col relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold">Let's talk</h3>
              <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-semibold bg-emerald-500/10 whitespace-nowrap">
                Currently taking projects
              </span>
            </div>

            <p className="text-muted-foreground text-[15px] leading-relaxed mb-10 md:mr-4">
              Drop a quick note about what you need. I reply fast with next steps and a time to talk.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 text-[15px] font-semibold">
                <Mail size={18} className="text-foreground" />
                nehil.ghetia.cg@gmail.com
              </div>

              <div className="flex items-center gap-4 text-[15px] font-semibold">
                <MapPin size={18} className="text-foreground" />
                Gujarat, India (IST)
              </div>
            </div>

            <div className="flex gap-4 mb-10 mt-auto">
              <button onClick={handleActionClick} className="flex-1 py-3.5 rounded-xl bg-secondary/80 border border-border/50 text-foreground font-bold hover:bg-secondary transition-all shadow-lg text-sm">
                Email me
              </button>

            </div>

            <div className="flex gap-5 pt-6 border-t border-border/50">
              <a href="https://github.com/nehilghetia" target="_blank" rel="noreferrer"><Github size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
              <a href="https://linkedin.com/in/nehilghetia" target="_blank" rel="noreferrer"><Linkedin size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
              <a href="https://www.youtube.com/@Nehilghetia" target="_blank" rel="noreferrer"><Youtube size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
              <a href="https://twitter.com/nehilghetia" target="_blank" rel="noreferrer"><Twitter size={18} className="text-muted-foreground hover:text-foreground transition-colors" /></a>
            </div>
          </div>

          {/* Right Panel form wizard */}
          <div data-gsap="fade-right" className="lg:col-span-7 bg-card border border-border rounded-[2rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">

            {/* Subtle internal gradient spotlight effect */}

            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <span className="px-4 py-1.5 rounded-full border border-border/50 text-[11px] font-bold tracking-wider text-muted-foreground uppercase bg-secondary/30">
                Project Intake
              </span>
              <span className="px-4 py-1.5 rounded-full border border-border/50 text-xs font-bold text-muted-foreground bg-secondary/10">
                Step {step} of 4
              </span>
            </div>

            <h3 className="text-3xl font-extrabold mb-8 border-b border-border/50 pb-6">Tell me about it</h3>

            {/* Stepper bubbles */}
            <div className="flex flex-wrap items-center gap-6 mb-10 overflow-x-auto custom-scrollbar pb-2">
              {steps.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className="flex items-center gap-3 shrink-0 group focus:outline-none"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${step === s.id
                      ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)]'
                      : step > s.id
                        ? 'bg-primary/10 text-primary border border-primary/30 group-hover:bg-primary/20'
                        : 'bg-secondary text-muted-foreground border border-border/50 group-hover:bg-secondary/80'
                      }`}
                  >
                    {s.id}
                  </div>
                  <span className={`text-sm font-semibold transition-colors ${step === s.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/80'}`}>
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Form Input Area */}
            <form onSubmit={handleSubmit} className="space-y-8 min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <label className="flex items-center gap-3 font-bold text-foreground text-lg mb-2">
                    <currentStepInfo.icon size={20} className="text-primary" />
                    {currentStepInfo.label}
                  </label>

                  {currentStepInfo.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      placeholder={currentStepInfo.placeholder}
                      value={form[currentStepInfo.field as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [currentStepInfo.field]: e.target.value })}
                      className="w-full bg-secondary/20 border border-border/50 rounded-2xl p-5 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none text-base"
                      required
                    />
                  ) : (
                    <input
                      type={currentStepInfo.type}
                      placeholder={currentStepInfo.placeholder}
                      value={form[currentStepInfo.field as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [currentStepInfo.field]: e.target.value })}
                      className="w-full bg-secondary/20 border border-border/50 rounded-2xl p-5 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-base"
                      required={currentStepInfo.field !== 'subject'}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 rounded-xl bg-secondary/40 border border-border/50 text-foreground font-semibold hover:bg-secondary/80 transition-all text-sm"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-8 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all flex items-center gap-2 text-sm ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 4 ? (
                    isSending ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )
                  ) : (
                    <>Next <ArrowRight size={16} /></>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* Bottom Footer Text */}
        <div className="mt-16 text-center text-[15px] font-semibold text-muted-foreground" data-gsap="fade-up">
          Need something quick? <a href="mailto:nehil.ghetia.cg@gmail.com" className="text-foreground border-b border-foreground/30 hover:border-primary hover:text-primary transition-colors pb-0.5 ml-1">Send a brief</a> and I'll reply with the next steps.
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
