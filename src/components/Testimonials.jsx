import React, { useState } from 'react';
import { FaStar, FaQuoteRight, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'محمد أحمد',
      role: 'مستثمر',
      image: '👨‍💼',
      rating: 5,
      text: 'سمارت سوق غيرت طريقة استثماري تماماً! التوقعات الدقيقة والتحليلات الذكية ساعدتني في زيادة أرباحي بنسبة 40% خلال 6 أشهر.',
    },
    {
      name: 'سارة الخالد',
      role: 'مدونة تقنية',
      image: '👩‍💻',
      rating: 5,
      text: 'أفضل منصة لمقارنة أسعار الموبايلات في الوطن العربي. وفرت علي آلاف الريالات عند شراء أجهزتي الجديدة.',
    },
    {
      name: 'خالد الحربي',
      role: 'تاجر أسهم',
      image: '👨‍💼',
      rating: 4,
      text: 'متابعة البورصة أصبحت أسهل بكثير مع سمارت سوق. التحديثات اللحظية والتقارير التفصيلية لا غنى عنها.',
    },
    {
      name: 'لينا علي',
      role: 'مهندسة بيانات',
      image: '👩‍🔬',
      rating: 5,
      text: 'الذكاء الاصطناعي في المنصة مذهل! التنبؤات دقيقة جداً وتوصيات الاستثمار كانت في غاية الفعالية.',
    },
    {
      name: 'فهد القحطاني',
      role: 'رائد أعمال',
      image: '👨‍💼',
      rating: 5,
      text: 'واجهة المستخدم رائعة وسهلة الاستخدام. المنصة وفرت علي الوقت والجهد في البحث والمقارنة.',
    },
    {
      name: 'نورة السعد',
      role: 'محللة مالية',
      image: '👩‍💼',
      rating: 4,
      text: 'الأداة المثالية لكل مهتم بالتكنولوجيا والاستثمار. أوصي بها جميع أصدقائي وزملائي في العمل.',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'مستخدم نشط' },
    { value: '95%', label: 'رضا العملاء' },
    { value: '24/7', label: 'دعم فني' },
    { value: '98%', label: 'دقة التوقعات' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === Math.ceil(testimonials.length / 2) - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Math.ceil(testimonials.length / 2) - 1 : prev - 1));
  };

  const styles = {
    section: {
      padding: '5rem 2rem',
      backgroundColor: '#f8fafc',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#1e293b',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto 3rem',
      lineHeight: '1.6',
    },
    statsGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginBottom: '4rem',
      flexWrap: 'wrap',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      minWidth: '200px',
      textAlign: 'center',
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#22c55e',
      marginBottom: '0.5rem',
    },
    statLabel: {
      color: '#64748b',
      fontSize: '1rem',
    },
    sliderContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
    },
    slider: {
      display: 'flex',
      transition: 'transform 0.5s ease',
      transform: `translateX(-${currentSlide * 100}%)`,
    },
    slide: {
      minWidth: '100%',
      display: 'flex',
      gap: '2rem',
      justifyContent: 'center',
      padding: '1rem',
    },
    testimonialCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      flex: 1,
      maxWidth: '500px',
      textAlign: 'right',
      position: 'relative',
    },
    quoteIcon: {
      position: 'absolute',
      top: '-20px',
      right: '20px',
      fontSize: '3rem',
      color: '#22c55e',
      opacity: 0.2,
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    userImage: {
      width: '60px',
      height: '60px',
      backgroundColor: '#e2e8f0',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.8rem',
    },
    userName: {
      fontWeight: '600',
      color: '#1e293b',
      fontSize: '1.2rem',
    },
    userRole: {
      color: '#64748b',
      fontSize: '0.9rem',
    },
    rating: {
      display: 'flex',
      gap: '0.2rem',
      color: '#f59e0b',
      marginBottom: '1rem',
      justifyContent: 'flex-end',
    },
    testimonialText: {
      color: '#475569',
      lineHeight: '1.8',
      fontSize: '1rem',
    },
    navButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '3rem',
    },
    navButton: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: '2px solid #22c55e',
      backgroundColor: 'white',
      color: '#22c55e',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
    },
    dots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '2rem',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeDot: {
      backgroundColor: '#22c55e',
      transform: 'scale(1.2)',
    },
  };

  const slides = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    slides.push(testimonials.slice(i, i + 2));
  }

  return (
    <section id="testimonials" style={styles.section}>
      <h2 style={styles.title}>ماذا يقول مستخدمونا؟</h2>
      <p style={styles.subtitle}>
        انضم إلى آلاف المستخدمين الراضين الذين يثقون بسمارت سوق في إدارة استثماراتهم ومقارنة أسعارهم
      </p>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.sliderContainer}>
        <div style={styles.slider}>
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} style={styles.slide}>
              {slide.map((testimonial, index) => (
                <div key={index} style={styles.testimonialCard}>
                  <FaQuoteRight style={styles.quoteIcon} />
                  <div style={styles.userInfo}>
                    <div>
                      <div style={styles.userName}>{testimonial.name}</div>
                      <div style={styles.userRole}>{testimonial.role}</div>
                    </div>
                    <div style={styles.userImage}>{testimonial.image}</div>
                  </div>
                  <div style={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ 
                        color: i < testimonial.rating ? '#f59e0b' : '#cbd5e1' 
                      }} />
                    ))}
                  </div>
                  <p style={styles.testimonialText}>{testimonial.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.navButtons}>
        <button style={styles.navButton} onClick={prevSlide}>
          <FaChevronRight />
        </button>
        <button style={styles.navButton} onClick={nextSlide}>
          <FaChevronLeft />
        </button>
      </div>

      <div style={styles.dots}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={{
              ...styles.dot,
              ...(index === currentSlide ? styles.activeDot : {}),
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;