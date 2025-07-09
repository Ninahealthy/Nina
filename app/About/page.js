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
    { name: "Content Creation", level: 95 },
    { name: "Home Styling", level: 90 },
    { name: "DIY Projects", level: 88 },
    { name: "Photography", level: 85 },
    { name: "Trend Research", level: 92 },
    { name: "Social Media", level: 90 },
  ];

  const achievements = [
    { year: "2024", title: "Reached 500K+ Monthly Blog Readers" },
    { year: "2023", title: "Featured in Better Homes & Gardens" },
    { year: "2022", title: "Top Home Decor Blogger Award" },
    { year: "2021", title: "Launched Successful YouTube Channel" },
  ];

  const services = [
    {
      title: "Blog Content",
      description:
        "In-depth articles on home decor trends, DIY projects, and styling tips",
      icon: "📝",
    },
    {
      title: "Home Tours",
      description:
        "Inspiring home tours featuring beautiful spaces and decor ideas",
      icon: "🏠",
    },
    {
      title: "DIY Tutorials",
      description:
        "Step-by-step guides for creating beautiful home decor on a budget",
      icon: "🔨",
    },
    {
      title: "Product Reviews",
      description: "Honest reviews of home decor products and furniture finds",
      icon: "⭐",
    },
    {
      title: "Styling Tips",
      description: "Practical advice for decorating and organizing your home",
      icon: "✨",
    },
    {
      title: "Seasonal Decor",
      description: "Ideas for decorating your home throughout the year",
      icon: "🌸",
    },
  ];

  return (
    <>
      <Head>
        <title>About Nina - Home Decor & Interior Design Blogger</title>
        <meta
          name="description"
          content="Meet Nina, a passionate home decor blogger sharing interior design inspiration, DIY projects, and styling tips to help you create your dream home."
        />
        <meta
          name="keywords"
          content="Nina, home decor blogger, interior design blog, DIY home projects, home styling tips, decor inspiration"
        />
        <meta name="author" content="Nina" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ninahealthy.com/About" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About Nina - Home Decor & Interior Design Blogger"
        />
        <meta
          property="og:description"
          content="Meet Nina, a passionate home decor blogger sharing interior design inspiration, DIY projects, and styling tips."
        />
        <meta property="og:image" content="/nina-about-hero.jpg" />
        <meta property="og:url" content="https://ninahealthy.com/About" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Nina - Home Decor & Interior Design Blogger"
        />
        <meta
          name="twitter:description"
          content="Meet Nina, a passionate home decor blogger sharing interior design inspiration, DIY projects, and styling tips."
        />
        <meta name="twitter:image" content="/nina.jpg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nina",
              jobTitle: "Home Decor Blogger",
              description:
                "Home decor and interior design blogger passionate about helping others create beautiful, functional spaces",
              image: "/nina.jpg",
              sameAs: [
                "https://twitter.com/ninahomedecor",
                "https://instagram.com/nina_home_blog",
                "https://pinterest.com/nina_home_decor",
                "https://youtube.com/nina_home_styling",
              ],
              knowsAbout: [
                "Home Decor",
                "Interior Design",
                "DIY Projects",
                "Home Styling",
                "Budget Decorating",
                "Content Creation",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Nina's Home Blog",
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
              Home decor blogger sharing design inspiration, DIY projects, and
              styling tips to help you create your dream home
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
                  <h2 className={styles.sectionTitle}>My Blogging Journey</h2>
                  <p className={styles.introDescription}>
                    Hello! I'm Nina, a home decor blogger with an insatiable
                    passion for beautiful interiors and creative DIY projects.
                    What started as a personal love for transforming spaces has
                    evolved into a thriving blog where I share my discoveries,
                    experiments, and inspirations with fellow home decor
                    enthusiasts.
                  </p>
                  <p className={styles.introDescription}>
                    Through my blog, I explore the latest design trends, hunt
                    for budget-friendly decor finds, and create step-by-step
                    tutorials that make beautiful home styling accessible to
                    everyone. I believe that creating a beautiful home shouldn't
                    require a huge budget or professional training just
                    creativity, passion, and the right guidance.
                  </p>
                  <p className={styles.introDescription}>
                    Join me on this journey as we discover how to transform
                    ordinary spaces into extraordinary homes, one project at a
                    time. Whether you're a seasoned decorator or just starting
                    out, I'm here to inspire and guide you through every step of
                    your home decor adventure.
                  </p>
                </div>
                <div className={styles.introImage}>
                  <div className={styles.profileImageWrapper}>
                    <Image
                      src="/nina.jpg"
                      width={384}
                      height={448}
                      alt="Nina Rodriguez - Home Decor Blogger"
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
              <h2 className={styles.sectionTitle}>What I Bring to the Table</h2>
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
              <h2 className={styles.sectionTitle}>What You'll Find Here</h2>
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
              <h2 className={styles.sectionTitle}>Blog Milestones</h2>
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
              <h2 className={styles.sectionTitle}>My Design Philosophy</h2>
              <div className={styles.philosophyContent}>
                <div className={styles.philosophyQuote}>
                  <blockquote>
                    "Home is where your story begins. Through thoughtful decor
                    and personal touches, we can create spaces that not only
                    look beautiful but truly feel like home."
                  </blockquote>
                </div>
                <div className={styles.philosophyText}>
                  <p>
                    I believe that great home decor doesn't have to be expensive
                    or complicated. Some of the most beautiful spaces are
                    created with creativity, resourcefulness, and a keen eye for
                    what makes a house feel like home. Through my blog, I want
                    to show you that amazing design is within everyone's reach.
                  </p>
                  <p>
                    My approach combines practical advice with creative
                    inspiration. I love discovering affordable alternatives to
                    high-end pieces, sharing DIY projects that anyone can
                    tackle, and exploring how small changes can make a huge
                    impact in your space. Let's create homes that tell your
                    unique story!
                  </p>
                </div>
              </div>
            </section>

            {/* Contact CTA Section */}
            <section className={styles.ctaSection}>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Let's Create Beautiful Spaces Together
                </h2>
                <p className={styles.ctaDescription}>
                  Ready to transform your home? Follow along for weekly
                  inspiration, DIY tutorials, and all the tips you need to
                  create a space you love. Join our community of home decor
                  enthusiasts!
                </p>
                <div className={styles.ctaButtons}>
                  <button className={styles.ctaButton}>Follow My Blog</button>
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
