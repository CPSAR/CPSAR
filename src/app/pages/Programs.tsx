"use client";

import { motion } from "motion/react";
import {
  BookOpen,
  GraduationCap,
  Heart,
  Lightbulb,
  Globe,
  Users,
  Calendar,
  Award,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from "next/link";

export function Programs() {
  const programs = [
    {
      icon: BookOpen,
      title: "Workshops & Training",
      description:
        "Comprehensive hands-on training sessions designed to enhance clinical skills and therapeutic competencies.",
      color: "from-primary to-blue-600",
      features: [
        "Evidence-based therapeutic techniques",
        "Clinical assessment methods",
        "Crisis intervention training",
        "Cultural competency workshops",
      ],
      frequency: "Monthly sessions",
    },
    {
      icon: GraduationCap,
      title: "Academic Conferences",
      description:
        "Annual national and regional conferences featuring leading researchers, practitioners, and student presentations.",
      color: "from-secondary to-teal-600",
      features: [
        "Keynote presentations from experts",
        "Student research presentations",
        "Panel discussions on current topics",
        "Networking opportunities",
      ],
      frequency: "Annually",
    },
    {
      icon: Heart,
      title: "Mental Health Campaigns",
      description:
        "Community-wide initiatives promoting mental health literacy, reducing stigma, and increasing awareness.",
      color: "from-accent to-purple-600",
      features: [
        "World Mental Health Day events",
        "Suicide prevention programs",
        "School mental health initiatives",
        "Social media awareness campaigns",
      ],
      frequency: "Quarterly",
    },
    {
      icon: Lightbulb,
      title: "Research Projects",
      description:
        "Collaborative research opportunities addressing pressing mental health challenges in Rwanda.",
      color: "from-orange-500 to-red-500",
      features: [
        "Faculty-student collaborations",
        "Community-based research",
        "International partnerships",
        "Publication support",
      ],
      frequency: "Ongoing",
    },
    {
      icon: Globe,
      title: "Community Outreach",
      description:
        "Service-learning programs bringing mental health support to underserved communities across Rwanda.",
      color: "from-green-500 to-emerald-500",
      features: [
        "Rural mental health services",
        "Trauma support programs",
        "Community health education",
        "Disaster response initiatives",
      ],
      frequency: "Monthly",
    },
    {
      icon: Users,
      title: "Student Development",
      description:
        "Mentorship programs, career guidance, and professional networking opportunities for members.",
      color: "from-pink-500 to-rose-500",
      features: [
        "Peer mentorship program",
        "Career counseling sessions",
        "Professional networking events",
        "Leadership development",
      ],
      frequency: "Weekly",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Skill Enhancement",
      description: "Develop practical clinical skills beyond classroom learning",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Earn certificates and credentials for your participation",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Build your professional network and career opportunities",
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Make a real difference in mental health across Rwanda",
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
              Programs & Activities
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive programs designed to enhance your skills, expand
              your knowledge, and build your professional network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/50">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4 mb-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          <program.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">
                            {program.title}
                          </h3>
                          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{program.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {program.description}
                      </p>
                      <div className="space-y-2">
                        <div className="font-semibold text-sm mb-3">
                          Key Features:
                        </div>
                        <ul className="space-y-2">
                          {program.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2 text-sm text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Program Benefits
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Why participate in CPSAR programs?
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ready to Get Involved?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join CPSAR today and start participating in our transformative
              programs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/membership">Become a Member</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/events">View Upcoming Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
