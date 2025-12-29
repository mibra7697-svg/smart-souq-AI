import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaShoppingCart, FaSearch, FaChartLine, FaQuestionCircle } from 'react-icons/fa';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const commonQuestions = [
    { text: 'ما هي أفضل صفقة اليوم؟', icon: <FaShoppingCart /> },
    { text: 'كيف أقارن أسعار المنتجات؟', icon: <FaSearch /> },
    { text: 'ما هي العملات الرقمية الرائجة؟', icon: <FaChartLine /> },
    { text: 'كيف أكسب العمولة؟', icon: <FaQuestionCircle /> }
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: inputText, isBot: false }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "لقد وجدت لك أفضل الصفقات اليوم. تحقق من قسم 'أفضل الصفقات'",
        "يمكنك مقارنة الأسعار باستخدام أداة المقارنة الذكية في أعلى الصفحة",
        "البيتكوين حالياً عند 70,245 دولار مع ارتفاع 8.7% اليوم",
        "يمكنك كسب عمولة من خلال مشاركة روابط المنتجات أو التسويق بالعمولة"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, isBot: true }]);
    }, 1000);

    setInputText('');
  };

  const styles = {
    floatingButton: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 9999,
    },
    chatWindow: {
      position: 'fixed',
      bottom: '80px',
      left: '20px',
      width: '350px',
      maxWidth: '90vw',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      zIndex: 9998,
      overflow: 'hidden',
    },
    chatHeader: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    chatBody: {
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    messagesContainer: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
    },
    message: (isBot) => ({
      maxWidth: '80%',
      marginBottom: '0.75rem',
      alignSelf: isBot ? 'flex-start' : 'flex-end',
    }),
    messageBubble: (isBot) => ({
      backgroundColor: isBot ? '#f1f5f9' : '#3b82f6',
      color: isBot ? '#1e293b' : 'white',
      padding: '0.75rem 1rem',
      borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
      fontSize: '0.85rem',
      lineHeight: '1.4',
    }),
    chatFooter: {
      borderTop: '1px solid #f1f5f9',
      padding: '1rem',
    },
    inputContainer: {
      display: 'flex',
      gap: '0.5rem',
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '0.85rem',
      outline: 'none',
    },
    sendButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0 1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickQuestions: {
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderTop: '1px solid #f1f5f9',
    },
    questionsTitle: {
      fontSize: '0.8rem',
      color: '#64748b',
      marginBottom: '0.5rem',
    },
    questionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.5rem',
    },
    questionButton: {
      padding: '0.5rem',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '0.75rem',
      textAlign: 'center',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.25rem',
      transition: 'all 0.2s ease',
    },
    assistantButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <>
      {/* زر المساعد الذكي العائم */}
      <motion.div
        style={styles.floatingButton}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={styles.assistantButton}
          title="المساعد الذكي"
        >
          <FaRobot />
        </button>
      </motion.div>

      {/* نافذة المحادثة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={styles.chatWindow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* رأس المحادثة */}
            <div style={styles.chatHeader}>
              <div style={styles.headerTitle}>
                <FaRobot /> مساعد سمارت سوق الذكي
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <FaTimes />
              </button>
            </div>

            {/* جسم المحادثة */}
            <div style={styles.chatBody}>
              {/* الرسائل */}
              <div style={styles.messagesContainer}>
                {messages.map((message) => (
                  <div key={message.id} style={styles.message(message.isBot)}>
                    <div style={styles.messageBubble(message.isBot)}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* أسئلة سريعة */}
              <div style={styles.quickQuestions}>
                <div style={styles.questionsTitle}>أسئلة شائعة:</div>
                <div style={styles.questionsGrid}>
                  {commonQuestions.map((q, index) => (
                    <button
                      key={index}
                      style={styles.questionButton}
                      onClick={() => setInputText(q.text)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      {q.icon} {q.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* أدخل الرسالة */}
            <div style={styles.chatFooter}>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اكتب سؤالك هنا..."
                  style={styles.input}
                />
                <button onClick={handleSend} style={styles.sendButton}>
                  إرسال
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;