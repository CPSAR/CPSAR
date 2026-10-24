"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Leadership() {
  const leaders = [
    {
      name: "Dr. Marie Uwase",
      position: "President",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      bio: "Ph.D. candidate in Clinical Psychology with research focus on trauma and resilience.",
      email: "marie@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Jean Claude Mutabazi",
      position: "Vice President",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Master's student specializing in child and adolescent psychology.",
      email: "jean@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Aline Kayitesi",
      position: "Secretary General",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      bio: "Passionate about mental health advocacy and community outreach programs.",
      email: "aline@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Eric Nshimiyimana",
      position: "Treasurer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      bio: "Finance and administration expert with background in organizational management.",
      email: "eric@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Grace Umuhoza",
      position: "Research Coordinator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Leading research initiatives and academic collaborations across universities.",
      email: "grace@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Patrick Habimana",
      position: "Programs Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Coordinating workshops, conferences, and professional development programs.",
      email: "patrick@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Diane Mukamana",
      position: "Communications Lead",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "Managing media relations, social platforms, and member communications.",
      email: "diane@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Samuel Byiringiro",
      position: "Events Coordinator",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      bio: "Organizing and executing impactful events and conferences nationwide.",
      email: "samuel@cpsar.rw",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Leadership Team
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Meet the dedicated individuals leading CPSAR's mission to empower
              clinical psychology students across Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden border-2 hover:border-primary/50">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden aspect-square">
                        <ImageWithFallback
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">
                          {leader.name}
                        </h3>
                        <div className="text-sm font-semibold text-primary mb-3">
                          {leader.position}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {leader.bio}
                        </p>
                        <div className="flex space-x-2">
                          <a
                            href={`mailto:${leader.email}`}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                          <a
                            href={leader.linkedin}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                          <a
                            href={leader.twitter}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Interested in Leadership?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              CPSAR leadership positions are elected annually. Stay connected
              with us to learn about upcoming opportunities to serve our
              community.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
