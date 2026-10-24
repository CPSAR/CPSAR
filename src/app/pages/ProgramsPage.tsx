"use client";

import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { GraduationCap, Users, Microscope, Heart, BookOpen, TrendingUp, Calendar, Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ProgramsPage() {
  const programs = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Workshops & Training",
      description: "Comprehensive hands-on workshops covering clinical assessment, therapeutic techniques, evidence-based interventions, and professional ethics.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2d5JTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzgxNzc4ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-primary to-primary/80",
      features: ["Clinical Skills Training", "Assessment Techniques", "Therapeutic Approaches", "Cultural Competence"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Annual Conferences",
      description: "National and regional conferences bringing together students, professionals, and international experts to share knowledge and latest developments.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY29uZmVyZW5jZSUyMHdvcmtzaG9wfGVufDF8fHx8MTc4MTc3ODg3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-secondary to-secondary/80",
      features: ["Expert Keynotes", "Research Presentations", "Networking Sessions", "Professional Development"],
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Mental Health Campaigns",
      description: "Community awareness initiatives promoting mental health literacy, reducing stigma, and providing education to underserved populations.",
      image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBvdXRyZWFjaCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzgxNzc4ODcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-accent to-accent/80",
      features: ["Stigma Reduction", "Public Education", "Community Workshops", "Awareness Events"],
    },
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Research Projects",
      description: "Collaborative research initiatives addressing mental health challenges specific to Rwanda, with opportunities for publication and presentation.",
      image: "https://images.unsplash.com/photo-1581093577421-f561a654a353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGxhYm9yYXRvcnklMjBzdHVkZW50fGVufDF8fHx8MTc4MTc3ODg3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-primary via-secondary to-accent",
      features: ["Collaborative Research", "Publication Support", "Grant Opportunities", "Conference Presentations"],
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Student Development",
      description: "Mentorship programs, study groups, career guidance, and professional development opportunities to support your psychology journey.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2d5JTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzgxNzc4ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-secondary via-accent to-primary",
      features: ["Peer Mentorship", "Study Groups", "Career Counseling", "Skill Development"],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Community Outreach",
      description: "Mental health services and education programs delivered to underserved communities across Rwanda, making a real-world impact.",
      image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBvdXRyZWFjaCUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzgxNzc4ODcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-accent via-primary to-secondary",
      features: ["Rural Outreach", "School Programs", "Support Groups", "Crisis Intervention"],
    },
  ];

  return (
    <div className="pt-[60px] lg:pt-[92px]">
      {/* Hero Section */}
      <section className="bg-[#24578E] pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#71C0DF] text-sm font-semibold uppercase tracking-widest mb-6">Programmes</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-2xl leading-[1.0]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Our Programmes.
            </h1>
            <p className="text-white/45 text-xl mt-5 max-w-lg leading-relaxed">
              Comprehensive initiatives designed to enhance your clinical psychology education and professional development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  index % 2 === 0 ? "" : ""
                }`}>
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                    <div className={`relative h-80 lg:h-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className={`w-16 h-16 rounded-none bg-gradient-to-br ${program.color} flex items-center justify-center text-white mb-6`}>
                        {program.icon}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{program.title}</h2>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-none bg-gradient-to-r ${program.color}`}></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full sm:w-auto">Learn More</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#24578E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Involved?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join CPSAR today and gain access to all our programs and opportunities
            </p>
            <Button size="lg" className="bg-white text-[#0a0a0a] hover:bg-white/90 rounded-none">
              Become a Member
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
