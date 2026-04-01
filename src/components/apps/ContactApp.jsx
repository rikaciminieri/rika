import { useState, useRef, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { useLanguage } from '../../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_cxg084i';
const EMAILJS_TEMPLATE_ID = 'template_nusl4tb';
const EMAILJS_PUBLIC_KEY = 'R9KEjRG7lMypN6FUW';

const TOPIC_KEYS = ['work', 'hi', 'cheese', 'other'];

const STEPS = 4; // name, topic, message, email

export default function ContactApp() {
  const { t, lang } = useLanguage();
  const isJP = lang === 'jp';

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', topic: '', message: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [showTyping, setShowTyping] = useState(false);
  const [cheeseRain, setCheeseRain] = useState(false);
  const [sending, setSending] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const direction = useRef(1);
  const nameInputRef = useRef(null);
  const messageRef = useRef(null);
  const emailRef = useRef(null);

  // Cycle placeholder text for message textarea
  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [step]);

  // Auto-focus inputs on step change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 0) nameInputRef.current?.focus();
      if (step === 2) messageRef.current?.focus();
      if (step === 3) emailRef.current?.focus();
    }, 350);
    return () => clearTimeout(timer);
  }, [step]);

  const transitions = useTransition(step, {
    from: { opacity: 0, transform: `translateX(${direction.current * 60}px)` },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: `translateX(${direction.current * -60}px)`, position: 'absolute' },
    config: { tension: 300, friction: 26 },
  });

  const goNext = useCallback(() => {
    direction.current = 1;
    setStep((s) => Math.min(s + 1, STEPS));
  }, []);

  const goBack = useCallback(() => {
    direction.current = -1;
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleNameNext = () => {
    if (!formData.name.trim()) return;
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      goNext();
    }, 1200);
  };

  const handleTopicSelect = (key) => {
    setFormData((d) => ({ ...d, topic: key }));
    if (key === 'cheese') {
      setCheeseRain(true);
      setTimeout(() => {
        setCheeseRain(false);
        goNext();
      }, 1000);
    } else {
      setTimeout(goNext, 200);
    }
  };

  const handleSend = async () => {
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return;

    setSending(true);
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          topic: t(`contact.topics.${formData.topic}`),
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', topic: '', message: '', email: '' });
    setStep(0);
    setStatus('idle');
    setPlaceholderIdx(0);
    direction.current = 1;
  };

  const canGoNext = () => {
    if (step === 0) return formData.name.trim().length > 0;
    if (step === 1) return !!formData.topic;
    if (step === 2) return formData.message.trim().length > 0;
    if (step === 3) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    return false;
  };

  // Resolve i18n strings with interpolation
  const ti = (key, vars = {}) => {
    let str = t(key);
    Object.entries(vars).forEach(([k, v]) => {
      str = str.replace(`{${k}}`, v);
    });
    return str;
  };

  const topicLabel = formData.topic ? t(`contact.topics.${formData.topic}`) : '...';
  const placeholders = [
    t('contact.step3Placeholders.0') || (isJP ? '最高にワクワクするプロジェクトのアイデアを教えて...' : 'Tell me about your wildest project idea...'),
    t('contact.step3Placeholders.1') || (isJP ? 'グリルドチーズについての熱い意見？聞かせて...' : "Hot take on grilled cheese? I'm listening..."),
    t('contact.step3Placeholders.2') || (isJP ? 'あなたの面白い事実は？交換しよう...' : "Fun fact about yourself? I'll trade you one..."),
  ];

  const charCount = formData.message.length;
  const charLabel = charCount === 0
    ? t('contact.charEmpty')
    : charCount < 50
      ? `${charCount}`
      : charCount < 200
        ? t('contact.charGoing')
        : t('contact.charLong');

  // Success / Error states
  if (status === 'success') {
    return (
      <div className="notepad-content contact-app">
        <div className="contact-success">
          <div className="contact-success-envelope">
            <span className="contact-success-icon">💌</span>
          </div>
          <h3>{t('contact.successTitle')}</h3>
          <p>{ti('contact.successBody', { name: formData.name })}</p>
          <button className="contact-btn" onClick={resetForm}>
            {t('contact.sendAnother')}
          </button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="notepad-content contact-app">
        <div className="contact-success">
          <span className="contact-error-icon">😅</span>
          <h3>{t('contact.errorTitle')}</h3>
          <p>{t('contact.errorBody')}</p>
          <button className="contact-btn" onClick={() => setStatus('idle')}>
            {t('contact.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notepad-content contact-app">
      {/* Cheese rain easter egg */}
      {cheeseRain && (
        <div className="contact-cheese-rain">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="contact-cheese"
              style={{
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                fontSize: `${16 + Math.random() * 12}px`,
              }}
            >
              🧀
            </span>
          ))}
        </div>
      )}

      {/* Mail client header */}
      <div className="contact-mail-header">
        <div className="contact-mail-row">
          <span className="contact-mail-label">To:</span>
          <span className="contact-mail-value">rika@rika.lol</span>
        </div>
        <div className="contact-mail-row">
          <span className="contact-mail-label">From:</span>
          <span className="contact-mail-value">
            {formData.name || '...'}
          </span>
        </div>
        <div className="contact-mail-row">
          <span className="contact-mail-label">Subject:</span>
          <span className="contact-mail-value">{topicLabel}</span>
        </div>
      </div>

      {/* Step content */}
      <div className="contact-step-container">
        {transitions((style, item) => (
          <animated.div style={style} className="contact-step">
            {item === 0 && (
              <div className="contact-step-inner">
                <h3 className="contact-step-title">{t('contact.step1Title')}</h3>
                <input
                  ref={nameInputRef}
                  type="text"
                  className="contact-input"
                  placeholder={t('contact.step1Placeholder')}
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameNext()}
                  maxLength={60}
                />
                {showTyping && (
                  <div className="contact-typing">
                    <span>{t('contact.typing')}</span>
                    <span className="contact-typing-dots">
                      <span>.</span><span>.</span><span>.</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            {item === 1 && (
              <div className="contact-step-inner">
                <h3 className="contact-step-title">{t('contact.step2Title')}</h3>
                <div className="contact-topics">
                  {TOPIC_KEYS.map((key) => (
                    <button
                      key={key}
                      className={`contact-topic-btn${formData.topic === key ? ' selected' : ''}`}
                      onClick={() => handleTopicSelect(key)}
                    >
                      {t(`contact.topics.${key}`)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item === 2 && (
              <div className="contact-step-inner">
                <h3 className="contact-step-title">{t('contact.step3Title')}</h3>
                <textarea
                  ref={messageRef}
                  className="contact-textarea"
                  placeholder={placeholders[placeholderIdx]}
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  maxLength={1000}
                  rows={5}
                />
                <div className={`contact-char-counter${charCount >= 200 ? ' long' : charCount >= 50 ? ' going' : ''}`}>
                  {charLabel}
                </div>
              </div>
            )}

            {item === 3 && (
              <div className="contact-step-inner">
                <h3 className="contact-step-title">{t('contact.step4Title')}</h3>
                <input
                  ref={emailRef}
                  type="email"
                  className="contact-input"
                  placeholder={t('contact.step4Placeholder')}
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && canGoNext() && handleSend()}
                />
                <button
                  className={`contact-btn contact-send-btn${sending ? ' sending' : ''}`}
                  onClick={handleSend}
                  disabled={!canGoNext() || sending}
                >
                  {sending ? (
                    <span>{t('contact.sending')}</span>
                  ) : (
                    <span className="contact-send-label">
                      {t('contact.send')}
                      <span className="contact-plane">✈</span>
                    </span>
                  )}
                </button>
              </div>
            )}
          </animated.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="contact-nav">
        <button
          className="contact-nav-btn"
          onClick={goBack}
          style={{ visibility: step > 0 ? 'visible' : 'hidden' }}
        >
          {t('contact.back')}
        </button>

        <div className="contact-dots">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className={`contact-dot${i === step ? ' active' : i < step ? ' done' : ''}`}
            />
          ))}
        </div>

        {step < 3 && step !== 1 && (
          <button
            className="contact-nav-btn"
            onClick={step === 0 ? handleNameNext : goNext}
            disabled={!canGoNext()}
          >
            {t('contact.next')}
          </button>
        )}
        {(step === 1 || step === 3) && <span style={{ width: 70 }} />}
      </div>
    </div>
  );
}
