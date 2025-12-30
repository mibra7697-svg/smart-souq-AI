import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // محاكاة إرسال النموذج
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 1000);
  };

  const styles = {
    section: {
      padding: '5rem 2rem',
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#1e293b',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto 3rem',
      lineHeight: '1.6',
      textAlign: 'center',
    },
    contactContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '4rem',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
    },
    contactIcon: {
      fontSize: '1.5rem',
      color: '#22c55e',
      marginTop: '0.25rem',
    },
    contactText: {
      flex: 1,
    },
    contactTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#1e293b',
    },
    contactValue: {
      color: '#64748b',
      lineHeight: '1.6',
    },
    form: {
      backgroundColor: '#f8fafc',
      padding: '2.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#475569',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '150px',
      resize: 'vertical',
      transition: 'border-color 0.3s ease',
    },
    submitButton: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    successMessage: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
      marginTop: '1rem',
    },
  };

  return (
    <section id="contact" style={styles.section}>
      <h2 style={styles.title}>اتصل بنا</h2>
      <p style={styles.subtitle}>
        نحن هنا للإجابة على استفساراتك ومساعدتك في أي وقت
      </p>
      
      <div style={styles.contactContainer}>
        <div style={styles.contactInfo}>
          <div style={styles.contactItem}>
            <FaPhone style={styles.contactIcon} />
            <div style={styles.contactText}>
              <h3 style={styles.contactTitle}>الهاتف</h3>
              <p style={styles.contactValue}>+966 50 123 4567</p>
              <p style={styles.contactValue}>من الأحد إلى الخميس 8ص - 5م</p>
            </div>
          </div>
          
          <div style={styles.contactItem}>
            <FaEnvelope style={styles.contactIcon} />
            <div style={styles.contactText}>
              <h3 style={styles.contactTitle}>البريد الإلكتروني</h3>
              <p style={styles.contactValue}>info@smartsouk.com</p>
              <p style={styles.contactValue}>support@smartsouk.com</p>
            </div>
          </div>
          
          <div style={styles.contactItem}>
            <FaMapMarkerAlt style={styles.contactIcon} />
            <div style={styles.contactText}>
              <h3 style={styles.contactTitle}>العنوان</h3>
              <p style={styles.contactValue}>
                الرياض، المملكة العربية السعودية<br />
                شارع الملك فهد، المركز التجاري
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>الاسم الكامل</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>رقم الهاتف</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>رسالتك</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>
          
          <button type="submit" style={styles.submitButton}>
            <FaPaperPlane />
            إرسال الرسالة
          </button>
          
          {submitted && (
            <div style={styles.successMessage}>
              تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;