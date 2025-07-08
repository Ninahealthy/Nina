"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./About.module.css";
import Image from "next/image";

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate particles on client side only
    const generatedParticles = [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: 2 + Math.random() * 2,
    }));
    setParticles(generatedParticles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { name: "Interior Design", level: 95 },
    { name: "Space Planning", level: 92 },
    { name: "Color Theory", level: 88 },
    { name: "Furniture Selection", level: 90 },
    { name: "Lighting Design", level: 85 },
    { name: "Project Management", level: 93 },
  ];

  const achievements = [
    { year: "2024", title: "Featured in House Beautiful Magazine" },
    { year: "2023", title: "Interior Designer of the Year - Regional Award" },
    { year: "2022", title: "Sustainable Design Excellence Award" },
    { year: "2021", title: "Top 40 Under 40 Interior Designers" },
  ];

  const services = [
    {
      title: "Full Home Design",
      description:
        "Complete interior design services from concept to completion",
      icon: "🏠",
    },
    {
      title: "Room Makeovers",
      description: "Transform individual spaces with focused design solutions",
      icon: "✨",
    },
    {
      title: "Color Consultation",
      description: "Expert color palette selection and coordination",
      icon: "🎨",
    },
    {
      title: "Virtual Design",
      description:
        "Remote design services with detailed plans and 3D renderings",
      icon: "💻",
    },
    {
      title: "Styling & Staging",
      description: "Professional styling for photoshoots and home staging",
      icon: "📸",
    },
    {
      title: "Design Workshops",
      description: "Educational workshops and design consultations",
      icon: "🎓",
    },
  ];

  return (
    <>
      <Head>
        <title>About Nina - Interior Design Expert | Interior Design Pro</title>
        <meta
          name="description"
          content="Meet Nina, an award-winning interior designer with 15+ years of experience creating beautiful, functional spaces. Discover her story, expertise, and design philosophy."
        />
        <meta
          name="keywords"
          content="Nina Rodriguez, interior designer, home decor expert, design consultation, interior design services"
        />
        <meta name="author" content="Nina" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yoursite.com/about" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Nina - Interior Design Expert"
        />
        <meta
          property="og:description"
          content="Meet Nina, an award-winning interior designer with 15+ years of experience creating beautiful, functional spaces."
        />
        <meta property="og:image" content="/nina-about-hero.jpg" />
        <meta property="og:url" content="https://yoursite.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Nina - Interior Design Expert"
        />
        <meta
          name="twitter:description"
          content="Meet Nina, an award-winning interior designer with 15+ years of experience creating beautiful, functional spaces."
        />
        <meta name="twitter:image" content="/nina-about-hero.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nina Rodriguez",
              jobTitle: "Interior Designer",
              description:
                "Interior Design Expert with 15+ years of experience in modern home transformations",
              image: "/nina.jpg",
              sameAs: [
                "https://twitter.com/ninadesigns",
                "https://instagram.com/nina_interior_design",
                "https://linkedin.com/in/nina-rodriguez-interior-design",
              ],
              knowsAbout: [
                "Interior Design",
                "Space Planning",
                "Color Theory",
                "Furniture Selection",
                "Home Decor",
                "Lighting Design",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Interior Design Pro",
              },
            }),
          }}
        />
      </Head>

      <div className={styles.container}>
        {/* Animated Background Elements */}
        <div className={styles.backgroundWrapper}>
          <div
            className={styles.backgroundBlob1}
            style={{
              left: `${mousePosition.x * 0.1}%`,
              top: `${mousePosition.y * 0.1}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className={styles.backgroundBlob2}
            style={{
              right: `${mousePosition.x * 0.05}%`,
              bottom: `${mousePosition.y * 0.05}%`,
              transform: "translate(50%, 50%)",
            }}
          />
          <div className={styles.backgroundFloater1} />
          <div className={styles.backgroundFloater2} />
        </div>

        {/* Floating Particles */}
        {particles.length > 0 && (
          <div className={styles.particlesWrapper}>
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={styles.particle}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.animationDelay}s`,
                  animationDuration: `${particle.animationDuration}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div
            className={`${styles.heroContent} ${isLoaded ? styles.loaded : ""}`}
          >
            <h1 className={styles.mainTitle}>
              <span className={styles.titleGradient}>About Nina</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Transforming spaces into beautiful, functional homes for over 15
              years
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className={styles.contentSection}>
          <div className={styles.contentContainer}>
            {/* Introduction Section */}
            <section className={styles.introSection}>
              <div className={styles.introGrid}>
                <div className={styles.introText}>
                  <h2 className={styles.sectionTitle}>My Design Journey</h2>
                  <p className={styles.introDescription}>
                    Hello! I'm Nina Rodriguez, an interior designer passionate
                    about creating spaces that reflect your personality while
                    enhancing your daily life. With over 15 years of experience
                    in the industry, I've had the privilege of transforming
                    hundreds of homes into beautiful, functional sanctuaries.
                  </p>
                  <p className={styles.introDescription}>
                    My approach combines timeless design principles with
                    contemporary aesthetics, always keeping comfort and
                    livability at the forefront. I believe that great design
                    should not only look beautiful but also support how you
                    live, work, and play in your space.
                  </p>
                  <p className={styles.introDescription}>
                    Whether you're looking to redesign a single room or
                    transform your entire home, I'm here to guide you through
                    every step of the process, from initial concept to final
                    styling touches.
                  </p>
                </div>
                <div className={styles.introImage}>
                  <div className={styles.profileImageWrapper}>
                    <Image
                      src="/nina.jpg"
                      width={384}
                      height={448}
                      alt="Nina"
                      className={styles.profileImage}
                      loading="eager"
                    />
                    <div className={styles.profileImageOverlay}></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section className={styles.skillsSection}>
              <h2 className={styles.sectionTitle}>Expertise & Skills</h2>
              <div className={styles.skillsGrid}>
                {skills.map((skill, index) => (
                  <div key={index} className={styles.skillCard}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillProgress}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Services Section */}
            <section className={styles.servicesSection}>
              <h2 className={styles.sectionTitle}>What I Offer</h2>
              <div className={styles.servicesGrid}>
                {services.map((service, index) => (
                  <div key={index} className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>{service.icon}</div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements Section */}
            <section className={styles.achievementsSection}>
              <h2 className={styles.sectionTitle}>Awards & Recognition</h2>
              <div className={styles.achievementsGrid}>
                {achievements.map((achievement, index) => (
                  <div key={index} className={styles.achievementCard}>
                    <div className={styles.achievementYear}>
                      {achievement.year}
                    </div>
                    <div className={styles.achievementTitle}>
                      {achievement.title}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Philosophy Section */}
            <section className={styles.philosophySection}>
              <h2 className={styles.sectionTitle}>Design Philosophy</h2>
              <div className={styles.philosophyContent}>
                <div className={styles.philosophyQuote}>
                  <blockquote>
                    "Great design is not just about aesthetics—it's about
                    creating spaces that enhance your life, reflect your
                    personality, and bring you joy every single day."
                  </blockquote>
                </div>
                <div className={styles.philosophyText}>
                  <p>
                    I believe that every space has the potential to be
                    extraordinary. My design philosophy centers on the idea that
                    your home should be a reflection of who you are—a place
                    where you feel most comfortable, inspired, and at peace.
                  </p>
                  <p>
                    I approach each project with a deep understanding of my
                    clients' lifestyle, preferences, and dreams. By combining
                    this insight with my expertise in color, texture, lighting,
                    and space planning, I create homes that are not only
                    beautiful but also perfectly suited to the people who live
                    in them.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact CTA Section */}
            <section className={styles.ctaSection}>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Ready to Transform Your Space?
                </h2>
                <p className={styles.ctaDescription}>
                  Let's work together to create the home of your dreams. Whether
                  you're starting from scratch or looking to refresh your
                  current space, I'm here to help bring your vision to life.
                </p>
                <div className={styles.ctaButtons}>
                  <button className={styles.ctaButton}>Get Started</button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
