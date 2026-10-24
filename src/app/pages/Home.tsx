"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Users,
  GraduationCap,
  Calendar,
  Heart,
  ArrowRight,
  Target,
  Eye,
  Award,
  BookOpen,
  Lightbulb,
  Globe,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}+</span>;
}

const heroImages = [
  "/images/HagyImagesStudio0782569627.jpg",
  "/images/HagyImagesStudio0782569627(1).jpg",
  "/images/HagyImagesStudio0782569627(109).jpg",
  "/images/HagyImagesStudio0782569627(11).jpg",
  "/images/HagyImagesStudio0782569627(117).jpg",
  "/images/HagyImagesStudio0782569627(120).jpg",
  "/images/HagyImagesStudio0782569627(128).jpg",
  "/images/HagyImagesStudio0782569627(153).jpg",
  "/images/HagyImagesStudio0782569627(155).jpg",
  "/images/HagyImagesStudio0782569627(156).jpg",
  "/images/HagyImagesStudio0782569627(17).jpg",
  "/images/HagyImagesStudio0782569627(179).jpg",
  "/images/HagyImagesStudio0782569627(2).jpg",
  "/images/HagyImagesStudio0782569627(22).jpg",
  "/images/HagyImagesStudio0782569627(60).jpg",
  "/images/HagyImagesStudio0782569627(90).jpg",
];

export function Home() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <ImageWithFallback
              key={image}
              src={image}
              alt={`CPSAR members and activities, photo ${index + 1}`}
              aria-hidden={index !== activeHeroImage}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === activeHeroImage ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.08] tracking-tight">
                Advancing Mental Health in{" "}
                <span className="text-[#71C0DF]">
                  Rwanda
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed"
            >
              A community of future clinical psychologists advancing care and well-being across Rwanda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              >
                <Link href="/membership">
                  Join CPSAR
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={500} />
                </div>
                <div className="text-white/80 text-sm">Active Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={15} />
                </div>
                <div className="text-white/80 text-sm">Universities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={75} />
                </div>
                <div className="text-white/80 text-sm">Events Conducted</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={30} />
                </div>
                <div className="text-white/80 text-sm">Outreach Programs</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
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
                About CPSAR
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The Clinical Psychology Students Association of Rwanda is a
                professional organization dedicated to supporting, educating,
                and empowering the next generation of mental health
                professionals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="h-full border-2 hover:border-primary transition-colors bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be the leading student organization advancing clinical
                      psychology practice and mental health awareness in Rwanda
                      and East Africa.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full border-2 hover:border-secondary transition-colors bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To foster professional development, promote research,
                      advocate for mental health, and create a supportive
                      community for clinical psychology students.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full border-2 hover:border-accent transition-colors bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Core Values</h3>
                    <p className="text-muted-foreground">
                      Excellence, Integrity, Compassion, Collaboration,
                      Innovation, and Cultural Sensitivity in all our
                      endeavors.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Button asChild size="lg" variant="outline">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
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
                Our Programs & Activities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive programs designed to enhance your skills,
                knowledge, and professional network.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Workshops & Training",
                  description:
                    "Hands-on sessions covering clinical skills, therapeutic techniques, and evidence-based practices.",
                  color: "from-primary to-blue-600",
                },
                {
                  icon: GraduationCap,
                  title: "Academic Conferences",
                  description:
                    "Annual conferences featuring leading researchers, practitioners, and student presentations.",
                  color: "from-secondary to-teal-600",
                },
                {
                  icon: Heart,
                  title: "Mental Health Campaigns",
                  description:
                    "Community awareness initiatives promoting mental health literacy and reducing stigma.",
                  color: "from-accent to-purple-600",
                },
                {
                  icon: Lightbulb,
                  title: "Research Projects",
                  description:
                    "Collaborative research opportunities addressing mental health challenges in Rwanda.",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: Globe,
                  title: "Community Outreach",
                  description:
                    "Service programs bringing mental health support to underserved communities.",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Users,
                  title: "Student Development",
                  description:
                    "Mentorship programs, career guidance, and networking opportunities for members.",
                  color: "from-pink-500 to-rose-500",
                },
              ].map((program, index) => (
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
                        className={`w-14 h-14 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                      >
                        <program.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        {program.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {program.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg">
                <Link href="/programs">
                  View All Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Become part of Rwanda's premier clinical psychology student
              organization and start your journey toward professional
              excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              >
                <Link href="/membership">
                  Join CPSAR Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
