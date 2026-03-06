import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  MessageSquare, 
  Briefcase, 
  Heart,
  Send,
  Clock,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const experienceOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
const interestOptions = ['Smart Investing', 'Market Analysis', 'Trading Strategies', 'Algo Trading', 'Mentorship', 'PMS', 'Live Trading', 'Research'];

const contactInfo = [
  {
    icon: Phone,
    title: 'WhatsApp',
    value: '+91 90320 46008',
    href: 'https://wa.me/919032046008',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'firstmilliontrade@gmail.com',
    href: 'mailto:firstmilliontrade@gmail.com',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: 'Mon - Sat: 9:00 AM - 7:00 PM',
    href: '#',
  },
];

const officeLocations = [
  {
    title: 'Head Office — USA',
    address: 'First Million Trade, 800 W Renner Rd, 75080, Richardson, Dallas, TX',
    mapHref: 'https://maps.google.com/?q=800+W+Renner+Rd+Richardson+TX+75080',
  },
  {
    title: 'India Office — Hyderabad',
    address: 'First Million Trade, Flat No 9, 2nd Floor, Jabbar Building, Begumpet, SP Road, Hyderabad, 500016',
    mapHref: 'https://maps.google.com/?q=Begumpet+SP+Road+Hyderabad+500016',
  },
];

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/176CuPCNyn/', icon: '📘' },
  { name: 'YouTube', href: 'https://www.youtube.com/@FirstMillionTrade', icon: '📺' },
  { name: 'Instagram', href: 'https://www.instagram.com/first_million_trade?igsh=MWdqd2xvODV5c2pkeA==', icon: '📸' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    experience: '',
    interest: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.mobile.trim()) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in your name and mobile number.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Redirect to WhatsApp with form data
    const message = encodeURIComponent(
      `Hi! I'm interested in First Million Trade.\n\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nCity: ${formData.city}\nExperience: ${formData.experience}\nInterest: ${formData.interest}\nMessage: ${formData.comment}`
    );
    
    window.open(`https://wa.me/919032046008?text=${message}`, '_blank');

    toast({
      title: 'Redirecting to WhatsApp!',
      description: "Your enquiry details have been prepared. Please send the message on WhatsApp.",
    });

    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Start Your{' '}
              <span className="text-accent">Trading Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="font-serif text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Whether you're interested in our courses, mentorship programs, or have any questions, our team is here to help.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Office Locations */}
              <h3 className="font-semibold mb-4">Our Offices</h3>
              <div className="space-y-4 mb-8">
                {officeLocations.map((office) => (
                  <a
                    key={office.title}
                    href={office.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{office.title}</h4>
                      <p className="text-muted-foreground text-sm">{office.address}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300 text-lg"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="glass-card rounded-2xl p-8">
                <h2 className="font-serif text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll redirect you to WhatsApp with your details.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} className="pl-11" required />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} className="pl-11" type="tel" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="pl-11" type="email" />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="pl-11" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <select name="experience" value={formData.experience} onChange={handleChange} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pl-11 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="">Select Experience Level</option>
                        {experienceOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
                      </select>
                    </div>
                    <div className="relative">
                      <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <select name="interest" value={formData.interest} onChange={handleChange} className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pl-11 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="">Select Area of Interest</option>
                        {interestOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea name="comment" placeholder="Your message or questions..." value={formData.comment} onChange={handleChange} className="pl-11 min-h-[120px]" />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground font-bold hover:brightness-110" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <Send className="w-5 h-5" />
                        </motion.div>
                        Redirecting...
                      </>
                    ) : (
                      <>
                        Send via WhatsApp
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
