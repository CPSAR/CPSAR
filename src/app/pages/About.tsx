"use client";

import { motion } from "motion/react";
import {
  Eye,
  Target,
  Award,
  Heart,
  Users,
  Globe,
  Lightbulb,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function About() {
  const timeline = [
    {
      year: "2018",
      title: "Foundation",
      description:
        "CPSAR was established by a group of passionate psychology students committed to professional development.",
    },
    {
      year: "2019",
      title: "First Conference",
      description:
        "Organized our inaugural national conference on clinical psychology with over 200 participants.",
    },
    {
      year: "2020",
      title: "Community Outreach",
      description:
        "Launched mental health awareness campaigns reaching 10,000+ individuals across Rwanda.",
    },
    {
      year: "2021",
      title: "Research Initiative",
      description:
        "Established collaborative research program with local universities and international partners.",
    },
    {
      year: "2022",
      title: "Expansion",
      description:
        "Grew to 15+ universities with chapters across all provinces of Rwanda.",
    },
    {
      year: "2023",
      title: "International Recognition",
      description:
        "Recognized by East African Psychological Association for outstanding student engagement.",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in education, research, and practice.",
      color: "from-primary to-blue-600",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold ethical principles and professional conduct in all our activities.",
      color: "from-secondary to-teal-600",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach mental health with empathy, understanding, and cultural sensitivity.",
      color: "from-accent to-purple-600",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and community partnerships.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace new ideas and evidence-based approaches to mental health.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Globe,
      title: "Cultural Sensitivity",
      description:
        "We respect and integrate Rwandan culture in our mental health approach.",
      color: "from-green-500 to-emerald-500",
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
              About CPSAR
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Building a community of dedicated students committed to advancing
              mental health care and professional excellence in Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-2 hover:border-primary transition-colors">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To be the leading student organization advancing clinical
                      psychology practice, research, and mental health awareness
                      in Rwanda and East Africa, creating a generation of
                      competent, compassionate, and culturally-sensitive mental
                      health professionals.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full border-2 hover:border-secondary transition-colors">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      To foster professional development, promote evidence-based
                      research, advocate for mental health awareness, and create
                      a supportive community that empowers clinical psychology
                      students to become leaders in mental health care delivery
                      and policy.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-white to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These fundamental principles guide our work and define who we
                are as an organization.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/50">
                    <CardContent className="p-8">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                      >
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From our founding to today, here are the key milestones that
                have shaped CPSAR.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex items-center ${
                      index % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    } flex-col md:gap-8`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white transform -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className="w-full md:w-1/2 ml-20 md:ml-0">
                      <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                        <CardContent className="p-6">
                          <div className="text-sm font-semibold text-primary mb-2">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {event.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Spacer for desktop */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-b from-white to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Our Impact
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Making a difference in mental health across Rwanda.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Active Members" },
                { number: "15+", label: "Universities" },
                { number: "75+", label: "Events Conducted" },
                { number: "10,000+", label: "People Reached" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
