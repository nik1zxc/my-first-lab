/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Menu, 
  X, 
  Mountain, 
  Compass, 
  Backpack, 
  Map as MapIcon, 
  ArrowRight,
  ChevronRight,
  Phone
} from 'lucide-react';

// --- Types ---
type TabType = 'home' | 'routes' | 'tours' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Главная' },
    { id: 'routes', label: 'Маршруты' },
    { id: 'tours', label: 'Туры' },
    { id: 'contact', label: 'Контакты' },
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Small delay to allow tab content to start rendering/transitioning
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-red selection:text-white" ref={containerRef}>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-2xl font-black font-display tracking-tighter cursor-pointer"
            onClick={() => handleTabChange('home')}
          >
            XTOUR <span className="text-brand-red">ALMATY</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`text-sm uppercase tracking-widest font-bold transition-all hover:text-brand-red ${
                  activeTab === item.id ? 'text-brand-red' : 'text-brand-white/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-brand-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`text-3xl font-black font-display uppercase tracking-tighter ${
                    activeTab === item.id ? 'text-brand-red' : 'text-brand-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 bg-brand-black"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Overlay gradient - should be above video */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-brand-black/40 to-brand-black/80 z-20 pointer-events-none" />
          
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-60"
            poster="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070"
          >
            {/* The user-provided file might be named this in some contexts */}
            <source src="https://raw.githubusercontent.com/nik1zxc/video/main/videogit.mp4" type="video/mp4" />
            {/* Mixkit fallback that is known to work */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-quad-bike-on-a-dirt-road-in-the-mountains-34443-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-mountain-peaks-covered-with-snow-and-clouds-2325-large.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-30 text-center px-6"
        >
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black font-display leading-[0.9] tracking-tighter mb-6"
          >
            ГОРЫ ЖДУТ <br /> <span className="text-brand-red">ТЕБЯ</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-brand-white/80 max-w-2xl mx-auto font-medium"
          >
            Исследуй Заилийский Алатау с командой профессионалов. Только лучшее снаряжение и проверенные маршруты.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12"
          >
            <button 
              onClick={() => handleTabChange('contact')}
              className="bg-brand-red text-white font-black px-10 py-5 rounded-none uppercase tracking-tighter text-xl hover:bg-white hover:text-brand-red transition-all transform hover:scale-105"
            >
              Начать приключение
            </button>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-white/30">
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-12 bg-brand-white/30"
          />
        </div>
      </section>

      {/* Tab Content Area */}
      <section className="bg-brand-black pb-24" ref={contentRef}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'home' && (
                <div className="py-20 space-y-24">
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-8 border-l-4 border-brand-red pl-8">
                        МЫ — <span className="text-brand-red">XTOUR</span>
                      </h2>
                      <p className="text-xl text-brand-white/70 leading-relaxed">
                        Компания «XTOUR ALMATY» — это не просто прокат или туры. Это наше видение активного отдыха в горах Казахстана. Мы верим, что горы должны быть доступны каждому, но при этом безопасность и комфорт стоят на первом месте.
                      </p>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-lg flex-1 min-w-[200px]">
                          <div className="text-brand-red mb-4"><Mountain size={32} /></div>
                          <h4 className="text-lg font-bold mb-2">Более 5 лет</h4>
                          <p className="text-sm text-white/50">Профессионального опыта и организации </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-lg flex-1 min-w-[200px]">
                          <div className="text-brand-red mb-4"><Compass size={32} /></div>
                          <h4 className="text-lg font-bold mb-2">2000 + участников</h4>
                          <p className="text-sm text-white/50">Получили незабываемые эмоции от поездок</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-4 border border-brand-red opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
                      <img 
                        src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop" 
                        alt="Hiker" 
                        className="relative z-10 w-full rounded-sm shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black font-display text-brand-red">ОПЫТ</h3>
                      <p className="text-brand-white/70">Мы — команда профессионалов, которая уже более года организует туры на квадроциклах в окрестностях Алматы. За это время мы создали маршруты, которые сочетают в себе драйв, безопасность и настоящие природные эмоции.
</p>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black font-display text-brand-red">БЕЗОПАСНОСТЬ</h3>
                      <p className="text-brand-white/70">Каждый тур сопровождается опытными инструкторами и гидами.Перед выездом проводится подробный инструктаж, техника проходит регулярное обслуживание, а в поездке всегда с вами:шлемы, защитная экипировка и аптечка.Ваша безопасность — наш главный приоритет.</p>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black font-display text-brand-red">СЕРВИС</h3>
                      <p className="text-brand-white/70">Мы продумываем каждую деталь вашего отдыха.От удобного бронирования до комфортного сопровождения на маршруте — всё организовано так, чтобы вы получили максимум удовольствия.Чистая техника, внимательный подход и атмосфера, в которую хочется вернуться.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'routes' && (
                <div className="py-20">
                  <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-16 border-l-4 border-brand-red pl-8 uppercase">
                    Популярные <span className="text-brand-red">маршруты</span>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { img: 'https://github.com/nik1zxc/video/blob/main/photo_2026-04-28_18-28-40.jpg?raw=true' },
                      {  img: 'https://github.com/nik1zxc/video/blob/main/photo_2026-04-28_18-29-05.jpg?raw=true' },
                      { img: 'https://github.com/nik1zxc/video/blob/main/photo_2026-04-28_18-29-14.jpg?raw=true' },

                    ].map((route, i) => (
                  <div key={i} className="group relative h-180 border border-white/10 overflow-hidden rounded-sm hover:border-brand-red transition-all duration-500">
                     <img 
                          src={route.img} 
                          alt={route.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-95" 
                        />
                            </div>
                         ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'tours' && (
                <div className="py-20">
                  <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-16 border-l-4 border-brand-red pl-8 uppercase">
                    Наши <span className="text-brand-red">туры</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group relative h-[600px] bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-end p-12 transition-all hover:border-brand-red">
                      <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=2070" className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-opacity duration-700" alt="Group tour" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20" />
                      </div>
                      <div className="relative z-10">
                        <span className="text-brand-red font-bold text-sm tracking-[0.3em] uppercase mb-4 block">Групповые вылазки</span>
                        <h3 className="text-4xl font-black font-display mb-6">WEEKEND HIKE</h3>
                        <p className="text-white/60 mb-8 max-w-md">Каждые выходные мы собираем группы единомышленников для походов. В стоимость входит сопровождение гида, трансфер, питание и фотоотчет.</p>
                        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 mt-auto">
                          <div className="flex justify-between items-center px-2">
                            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Старт от</span>
                            <span className="text-2xl font-black text-brand-red">7 000 ₸</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            <a 
                              href="https://wa.me/77001803292?text=Здравствуйте!%20Хочу%20забронировать%20тур%20WEEKEND%20HIKE." 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-brand-red text-white text-center font-black py-4 uppercase tracking-tighter text-sm hover:bg-white hover:text-brand-red transition-all"
                            >
                              Забронировать
                            </a>
                            <a 
                              href="https://wa.me/77001803292?text=Здравствуйте!%20Хочу%20обсудить%20детали%20тура%20WEEKEND%20HIKE." 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white/10 text-white text-center font-black py-4 uppercase tracking-tighter text-sm hover:bg-brand-red hover:text-white transition-all"
                            >
                              Обсудить детали
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group relative h-[600px] bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-end p-12 transition-all hover:border-brand-red">
                      <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070" className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-opacity duration-700" alt="Solo tour" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20" />
                      </div>
                      <div className="relative z-10">
                        <span className="text-brand-red font-bold text-sm tracking-[0.3em] uppercase mb-4 block">Эксклюзив</span>
                        <h3 className="text-4xl font-black font-display mb-6">ИНДИВИДУАЛЬНЫЙ ТУР</h3>
                        <p className="text-white/60 mb-8 max-w-md">Маршрут любой сложности только для вас. Полная свобода действий, индивидуальный темп и наше полное внимание к вашему комфорту.</p>
                        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 mt-auto">
                          <div className="flex justify-between items-center px-2">
                            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Старт от</span>
                            <span className="text-2xl font-black text-brand-red">25 000 ₸</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            <a 
                              href="https://wa.me/77001803292?text=Здравствуйте!%20Хочу%20забронировать%20индивидуальный%20тур." 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-brand-red text-white text-center font-black py-4 uppercase tracking-tighter text-sm hover:bg-white hover:text-brand-red transition-all"
                            >
                              Забронировать
                            </a>
                            <a 
                              href="https://wa.me/77001803292?text=Здравствуйте!%20Хочу%20обсудить%20детали%20индивидуального%20тура." 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white/10 text-white text-center font-black py-4 uppercase tracking-tighter text-sm hover:bg-brand-red hover:text-white transition-all"
                            >
                              Обсудить детали
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="py-20">
                  <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter mb-16 border-l-4 border-brand-red pl-8 uppercase">
                    Связаться <span className="text-brand-red">с нами</span>
                  </h2>
                  
                  <div className="max-w-4xl mx-auto space-y-16">
                    <div className="text-center space-y-8">
                      <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light">
                        Мы работаем ежедневно с <span className="text-brand-red font-bold">09:00</span> до <span className="text-brand-red font-bold">21:00</span>. <br />
                        Всегда готовы ответить на ваши вопросы и помочь с планированием похода.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 group cursor-pointer hover:border-brand-red transition-all">
                        <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                          <MapPin size={32} />
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">Наш адрес</h4>
                          <p className="text-xl md:text-2xl font-bold">г.Алматы, ул. Кокшокы , 4/3</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 group cursor-pointer hover:border-brand-red transition-all">
                        <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                          <Phone size={32} />
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-white/30 font-bold mb-1">Телефон</h4>
                          <p className="text-xl md:text-2xl font-bold">+7 700 180 32 92</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <a 
                        href="https://wa.me/77001803292?text=Здравствуйте!%20Я%20по%20поводу%20бронирования." 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-whatsapp flex items-center justify-center gap-4 py-8 text-white text-xl font-black uppercase tracking-tighter hover:scale-[1.03] transition-transform active:scale-100"
                      >
                        <MessageCircle size={24} /> WhatsApp
                      </a>
                      <a 
                        href="https://www.instagram.com/xtour_almaty/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center gap-4 py-8 text-white text-xl font-black uppercase tracking-tighter hover:scale-[1.03] transition-transform active:scale-100"
                      >
                        <Instagram size={24} /> Instagram
                      </a>
                      <a 
                        href="https://2gis.kz/almaty/firm/70000001102577107" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-twogis flex items-center justify-center gap-4 py-8 text-brand-black text-xl font-black uppercase tracking-tighter hover:scale-[1.03] transition-transform active:scale-100"
                      >
                        <MapIcon size={24} /> 2GIS
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-black border-t border-white/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="text-4xl font-black font-display tracking-tighter mb-8">
                XTOUR <span className="text-brand-red">ALMATY</span>
              </div>
              <p className="text-white/40 max-w-sm mb-12">
                Заилийский Алатау скрывает невероятную красоту. Мы поможем вам увидеть ее своими глазами, обеспечив комфорт и безопасность на каждом шагу.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/xtour_almaty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors"><Instagram size={18} /></a>
                <a href="tel:+77001803292" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors"><Phone size={18} /></a>
                <a href="https://wa.me/77001803292?text=Здравствуйте!%20Хочу%20уточнить%20детали." target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-red transition-colors"><MessageCircle size={18} /></a>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm uppercase tracking-widest font-bold mb-8 text-brand-red">Навигация</h5>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button onClick={() => handleTabChange(item.id)} className="hover:text-brand-red transition-colors">{item.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm uppercase tracking-widest font-bold mb-8 text-brand-red">Наши услуги</h5>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                <li><button onClick={() => handleTabChange('routes')} className="hover:text-brand-red transition-colors">Маршруты</button></li>
                <li><button onClick={() => handleTabChange('tours')} className="hover:text-brand-red transition-colors">Туры выходного дня</button></li>
                <li><button onClick={() => handleTabChange('tours')} className="hover:text-brand-red transition-colors">Индивидуальные восхождения</button></li>
                <li><button onClick={() => handleTabChange('contact')} className="hover:text-brand-red transition-colors">Забронировать</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">
            <p>© 2026 XTOUR ALMATY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
