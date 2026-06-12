/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, Trophy, Calendar, ShoppingBag, BookOpen, User, ShieldAlert, CheckCircle, 
  ChevronRight, ChevronLeft, HelpCircle, ArrowRight, MessageCircle, AlertTriangle, Cpu, X, Star, Heart
} from "lucide-react";
import { User as UserType, Product, LotteryResult, Prediction, Ad, Testimonial, SystemSetting } from "./types";
import { api } from "./services/api";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PredictionsPanel from "./components/PredictionsPanel";
import ResultsPanel from "./components/ResultsPanel";
import StoreFront from "./components/StoreFront";
import BlogPanel from "./components/BlogPanel";
import ClientArea from "./components/ClientArea";
import AdminPanel from "./components/AdminPanel";

// Fallback constants for static platform resilience (e.g. Vercel static deployments)
const DEFAULT_FALLBACK_SETTINGS: SystemSetting = {
  siteName: "GeraBicho Premium - Palpites e Ferramentas Digitais",
  contactEmail: "suporte@gerabichopremium.com",
  contactPhone: "+55 (62) 98575-6881",
  supportWhatsapp: "5562985756881",
  rulesText: "As informações fornecidas neste portal são de cunho puramente estatístico, histórico e de entretenimento. Não realizamos nem intermediamos qualquer tipo de apostas.",
  seoTitle: "Palpites do Jogo do Bicho de Hoje - Planilhas e Fechamentos Digitais",
  seoDescription: "Obtenha palpites atualizados do Jogo do Bicho diariamente e baixe softwares de fechamento matemático, dezenas e milhares quentes.",
  seoKeywords: "jogo do bicho, palpites do bicho, milhar do bicho, resultado do bicho rio, planilhas jogo do bicho",
  showPopupAd: true,
  mercadoPagoToken: "APP_USR-MOCK-TOKEN-API-MERCADOPAGO"
};

const DEFAULT_FALLBACK_ADS: Ad[] = [
  {
    id: "ad_top_banner",
    title: "MEGA PLANILHA SÉRIE PRECIOSA: Baixe o Fechamento Inteligente do Milhar e Centena Hoje!",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    linkUrl: "#produtos",
    position: "top_banner",
    isActive: true,
    clicks: 12
  },
  {
    id: "ad_popup",
    title: "Super Sistema 'Bicho Expert' Liberado!",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    linkUrl: "#produtos",
    position: "popup",
    isActive: true,
    clicks: 45
  },
  {
    id: "ad_sidebar",
    title: "Participe de Nosso Grupo VIP de Palpites Diários!",
    imageUrl: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=300",
    linkUrl: "#produtos",
    position: "sidebar",
    isActive: true,
    clicks: 5
  }
];

const DEFAULT_FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test_1",
    name: "Geraldo Nogueira",
    role: "Apostador Amador",
    text: "Com a Planilha de Centenas Cercadas que comprei aqui, consegui obter resultados consistentes toda semana. O PIX foi liberado na hora, excelente atendimento!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "test_2",
    name: "Luciana Lima",
    role: "Especialista em Matemática",
    text: "Os fechamentos gerados pela planilha têm excelente embasamento estatístico. Evita jogos soltos e sem sentido. Altamente recomendado!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  }
];

const DEFAULT_FALLBACK_PRODUCTS: Product[] = [
  {
    id: "prod_planilha_milhar",
    title: "Super Planilha Excel - Fechamento de Milhar Pró",
    description: "Planilha automatizada em Excel para cercamento de milhar e centena. Gera combinações matemáticas otimizadas com base nas estatísticas das dezenas mais sorteadas nos últimos 90 dias. Aumente em até 85% as chances de acerto calculando grupos equilibrados.",
    category: "planilhas",
    price: 97.00,
    discountPrice: 49.90,
    fileType: "XLSX",
    fileName: "fechamento_milhar_centena_v4.xlsx",
    fileSize: "2.4 MB",
    rating: 4.8,
    salesCount: 142,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    features: [
      "Fechamentos automáticos de milhar e centena",
      "Estatísticas integradas atualizadas",
      "Manual explicativo em vídeo",
      "Suporte direto no WhatsApp"
    ],
    reviews: [
      { id: "rev_1", userName: "Antônio M.", rating: 5, comment: "Fiz o terno de grupo na primeira semana! Muito boa.", date: "2026-06-10" }
    ]
  },
  {
    id: "prod_sistema_bicho_expert",
    title: "Sistema Bicho Expert - Gerador de Tendências",
    description: "Sistema online hospedado de alta velocidade. Fornece análises de estatística automatizada de atrasos e frequência de dezenas e grupos por horário para calcular as tendências. Acesse imediatamente por link no Bloco de Notas sem precisar instalar nada.",
    category: "sistemas",
    price: 199.00,
    discountPrice: 137.00,
    fileType: "TXT",
    fileName: "Acesso_Bicho_Expert.txt",
    fileSize: "1.5 KB",
    rating: 4.9,
    salesCount: 89,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    features: [
      "Banco de dados histórico de 2020 a 2026",
      "Cálculos de frequência e desvio padrão",
      "Alerta de bichos atrasados em tempo real",
      "Atualizações online automáticas"
    ],
    reviews: [
      { id: "rev_3", userName: "Roberto S.", rating: 5, comment: "Software fantástico, as tendências de atraso batem 90% das vezes.", date: "2026-06-08" }
    ]
  },
  {
    id: "prod_app_palpite_facil",
    title: "Gerador de Palpites Inteligente - App Android APK",
    description: "Aplicativo Android leve e de instalação imediata que fornece palpites diários gerados através de inteligência artificial baseada na 'tabela da puxada' clássica aliada ao calendário lunar e numerologia cabalística.",
    category: "aplicativos",
    price: 29.90,
    discountPrice: 19.90,
    fileType: "APK",
    fileName: "palpite_inteligente_v2.apk",
    fileSize: "8.1 MB",
    rating: 4.6,
    salesCount: 312,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    features: [
      "Notificações instantâneas de resultados",
      "Palpites rápidos na tela com 1 clique"
    ],
    reviews: []
  }
];

const DEFAULT_FALLBACK_RESULTS: LotteryResult[] = [
  {
    id: "res_mock_1",
    lottery: "rio",
    date: new Date().toISOString().split("T")[0],
    drawName: "PTM",
    rows: [
      { pos: "1º", prize: "3412", group: "03", animal: "Burro" },
      { pos: "2º", prize: "2156", group: "14", animal: "Gato" },
      { pos: "3º", prize: "1009", group: "03", animal: "Burro" },
      { pos: "4º", prize: "7724", group: "06", animal: "Cabra" },
      { pos: "5º", prize: "3988", group: "22", animal: "Tigre" },
      { pos: "6º", prize: "4041", group: "11", animal: "Cavalo" },
      { pos: "7º", prize: "099", group: "25", animal: "Vaca" }
    ]
  },
  {
    id: "res_mock_2",
    lottery: "rio",
    date: new Date().toISOString().split("T")[0],
    drawName: "PT",
    rows: [
      { pos: "1º", prize: "5561", group: "16", animal: "Leão" },
      { pos: "2º", prize: "1284", group: "21", animal: "Touro" },
      { pos: "3º", prize: "5432", group: "08", animal: "Cobra" },
      { pos: "4º", prize: "9012", group: "03", animal: "Burro" },
      { pos: "5º", prize: "3122", group: "06", animal: "Cabra" },
      { pos: "6º", prize: "3392", group: "23", animal: "Urso" },
      { pos: "7º", prize: "401", group: "01", animal: "Avestruz" }
    ]
  }
];

const DEFAULT_FALLBACK_PREDICTIONS: Prediction[] = [
  {
    id: "pred_mock_1",
    type: "palpitao",
    title: "Palpitação Geral de Hoje",
    numbers: ["Leão (Grupo 16)", "Jacaré (Grupo 15)"],
    animals: ["Leão", "Jacaré"],
    content: "Prognósticos indicam força do Grupo 16 (Leão) nas extrações da tarde. Ótimas dezenas para cercar do 1º ao 5º prêmio.",
    date: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString()
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("inicio");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Loaded models states
  const [settings, setSettings] = useState<SystemSetting | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Banner slider indicator
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Popup Ads
  const [showPopupAdModal, setShowPopupAdModal] = useState(false);
  const [popupAd, setPopupAd] = useState<Ad | null>(null);

  // General loading
  const [loading, setLoading] = useState(true);

  // FAQ state map
  const [faqOpenMap, setFaqOpenMap] = useState<Record<number, boolean>>({});

  const loadGlobalSettingsAndData = async () => {
    try {
      setLoading(true);
      // Fetch me session
      try {
        const user = await api.getMe();
        setCurrentUser(user);
      } catch (e) {
        // Not logged in is ok
      }

      // Settings fetch with fallback
      let activeSettings = DEFAULT_FALLBACK_SETTINGS;
      try {
        const s = await api.getSettings();
        setSettings(s);
        activeSettings = s;
      } catch (e) {
        console.warn("API settings offline, using local fallback settings:", e);
        setSettings(DEFAULT_FALLBACK_SETTINGS);
      }

      // Ads fetch with fallback
      try {
        const a = await api.getAds();
        setAds(a);
        const pop = a.find(item => item.position === "popup");
        if (pop && activeSettings.showPopupAd) {
          setPopupAd(pop);
          setTimeout(() => setShowPopupAdModal(true), 2000);
        }
      } catch (e) {
        console.warn("API ads offline, using local fallback ads:", e);
        setAds(DEFAULT_FALLBACK_ADS);
        const pop = DEFAULT_FALLBACK_ADS.find(item => item.position === "popup");
        if (pop && DEFAULT_FALLBACK_SETTINGS.showPopupAd) {
          setPopupAd(pop);
          setTimeout(() => setShowPopupAdModal(true), 2000);
        }
      }

      // Testimonials fetch with fallback
      try {
        const t = await api.getTestimonials();
        setTestimonials(t);
      } catch (e) {
        console.warn("API testimonials offline, using fallback:", e);
        setTestimonials(DEFAULT_FALLBACK_TESTIMONIALS);
      }

      // Products fetch with fallback
      try {
        const p = await api.getProducts();
        setProducts(p);
      } catch (e) {
        console.warn("API products offline, using fallback:", e);
        setProducts(DEFAULT_FALLBACK_PRODUCTS);
      }

      // Results fetch with fallback
      try {
        const r = await api.getResults();
        setResults(r.slice(0, 3)); // show top 3 results
      } catch (e) {
        console.warn("API results offline, using fallback:", e);
        setResults(DEFAULT_FALLBACK_RESULTS);
      }

      // Predictions fetch with fallback
      try {
        const pred = await api.getPredictions();
        setPredictions(pred.slice(0, 2)); // show top 2 predictions
      } catch (e) {
        console.warn("API predictions offline, using fallback:", e);
        setPredictions(DEFAULT_FALLBACK_PREDICTIONS);
      }
    } catch (e) {
      console.error("General global load error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGlobalSettingsAndData();
  }, []);

  // Update dynamic SEO Metatags continuously based on system loaded configs
  useEffect(() => {
    if (settings) {
      document.title = settings.siteName || "Portal do Jogo do Bicho - Palpites e Loja";
      
      // Update SEO description meta tag dynamically
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement("meta");
        descMeta.setAttribute("name", "description");
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute("content", settings.seoDescription);

      // Update keywords
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement("meta");
        keywordsMeta.setAttribute("name", "keywords");
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute("content", settings.seoKeywords);
    }
  }, [settings]);

  // Rotativo timer slider banner auto animation loops
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 1 ? 0 : 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setCurrentTab("inicio");
  };

  const handleAddToCart = (product: Product) => {
    if (cart.some(item => item.id === product.id)) {
      alert("Este produto digital já está adicionado ao seu carrinho!");
      return;
    }
    setCart([...cart, product]);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCartCheckoutAll = async () => {
    if (!currentUser) {
      alert("Acesse ou cadastre-se no portal primeiro para liberar faturas Pix.");
      setCurrentTab("cliente");
      setCartOpen(false);
      return;
    }

    try {
      const ids = cart.map(item => item.id);
      // Set active product on storefront tab for easy purchase
      setCurrentTab("loja");
      setCartOpen(false);
      setCart([]);
      alert("Carrinho verificado com sucesso! Clique em 'Comprar Pix' no catálogo para concluir o pagamento imediato.");
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleAdClick = (ad: Ad) => {
    api.triggerAdClick(ad.id);
  };

  const toggleFaq = (idx: number) => {
    setFaqOpenMap(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Hero Banners slide config assets
  const promoSlides = [
    {
      title: "Super Planilha Automática Excel - Fechamento Milhar Pro",
      subtitle: "Gera cartões matemáticos inteligentes desdobrados em cercamento de milhar e centena.",
      badge: "Mais Vendida de Hoje 🏆",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      cta: "Quero Baixar Minha Planilha"
    },
    {
      title: "Mecanismo Avançado de Palpites Semanais do Bicho",
      subtitle: "Palpitos divididos por grupos, passes cruzados e dezenas lógicas gerados por nossa IA de ciclos.",
      badge: "Incluso e Atualizado 💡",
      bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      cta: "Conferir Palpites de Hoje"
    }
  ];

  const lotteryLabels: Record<string, string> = {
    rio: "RJ - Loteria Rio",
    look: "GO - Loteria Look",
    nacional: "Fed - Federal",
    lbr: "DF - Loteria L-BR"
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white p-4">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-sm text-amber-400 font-bold tracking-widest uppercase">Portal GeraBicho Inicializando...</p>
      </div>
    );
  }

  // Active Ads categories filters list
  const topAd = ads.find(item => item.position === "top_banner");
  const bottomAd = ads.find(item => item.position === "footer_banner");
  const sidebarAd = ads.find(item => item.position === "sidebar");
  const inlineAd = ads.find(item => item.position === "content_mid");

  return (
    <div id="portal-root" className="min-h-screen bg-[#0a0f1d] text-slate-200 flex flex-col justify-between select-none relative font-sans">
      
      {/* Top Patrocinado sponsor announcement banner */}
      {topAd && (
        <a 
          href={topAd.linkUrl} 
          onClick={() => handleAdClick(topAd)}
          className="bg-[#0b1222] text-[#d4af37] py-2.5 px-4 block text-center border-b border-slate-800 text-xs font-bold leading-normal hover:bg-[#16213e] transition"
        >
          🚀 ANÚNCIO: {topAd.title} — clique para acessar a oferta exclusiva do patrocinador!
        </a>
      )}

      {/* Main Header bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Primary tab views routing rendering engines */}
      <main className="flex-1 pb-16">
        {currentTab === "inicio" && (
          <div className="space-y-12 animate-fade-in">
            {/* Banner Rotativo Hero block */}
            <div className="relative bg-[#0d1526] h-[380px] sm:h-[450px] overflow-hidden border-b border-slate-800">
              {/* background slide preview */}
              <div className="absolute inset-0 z-0">
                <img
                  src={promoSlides[activeSlide].bgImage}
                  alt="Slide Banner Cover"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-20 blur-xs"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0d1526]/90 to-[#0a0f1d]"></div>
              </div>

              {/* Slide Content layout */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10 flex items-center">
                <div className="max-w-2xl space-y-6">
                  <span className="bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                    {promoSlides[activeSlide].badge}
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
                    {promoSlides[activeSlide].title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                    {promoSlides[activeSlide].subtitle}
                  </p>
                  <div>
                    <button
                      onClick={() => setCurrentTab(activeSlide === 0 ? "loja" : "palpites")}
                      className="px-6 py-3.5 bg-[#d4af37] text-[#0a0f1d] font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all outline-none"
                    >
                      {promoSlides[activeSlide].cta} →
                    </button>
                  </div>
                </div>
              </div>

              {/* Side sliders controls buttons */}
              <button
                onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white bg-slate-900/40 hover:bg-slate-900/80 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev === 1 ? 0 : 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-white bg-slate-900/40 hover:bg-slate-900/80 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Content main body columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Columns - Results card boards & predictions summaries */}
                <div className="lg:col-span-2 space-y-10">
                  
                  {/* Recent result block summary lists */}
                  <div className="bg-[#0d1526] rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
                    <div className="flex justify-between items-center border-b border-[#1e293b] pb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-[#d4af37]" />
                        <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">Câmaras de Resultados Recentes</h3>
                      </div>
                      <button
                        onClick={() => setCurrentTab("resultados")}
                        className="text-xs font-bold text-[#d4af37] hover:underline flex items-center space-x-1"
                      >
                        <span>Ver Histórico</span> <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {results.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-4 sm:col-span-3 text-center">Nenhum resultado de sorteio e extração cadastrado hoje.</p>
                      ) : (
                        results.map((res) => (
                          <div key={res.id} className="bg-[#16213e]/20 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                                <span>{lotteryLabels[res.lottery] || res.lottery}</span>
                                <span className="bg-[#d4af37]/15 text-[#d4af37] px-1.5 py-0.5 border border-[#d4af37]/25 rounded font-black text-[9px]">{res.drawName}</span>
                              </div>
                              <div className="space-y-1.5">
                                <p className="text-xs text-slate-300 font-bold">1º Prêmio: <span className="text-emerald-400 font-black text-sm tracking-wider font-mono">{res.rows[0]?.prize || "----"}</span></p>
                                <p className="text-xs text-slate-350 font-bold">Grupo: <span className="text-white font-black text-xs font-mono">{res.rows[0]?.group || "--"}</span></p>
                                <p className="text-xs text-slate-300 font-bold">Bicho: <span className="text-slate-300 font-black text-xs">☘️ {res.rows[0]?.animal || "S/N"}</span></p>
                              </div>
                            </div>
                            <span className="text-[9px] text-slate-500 font-medium mt-3 uppercase tracking-widest border-t border-[#1e293b] pt-1.5 block">Oficial: {res.date}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Recent predictions diários summaries */}
                  <div className="bg-[#0d1526] rounded-3xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
                    <div className="flex justify-between items-center border-b border-[#1e293b] pb-3">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-[#d4af37]" />
                        <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">Últimos Palpites Públicos de Hoje</h3>
                      </div>
                      <button
                        onClick={() => setCurrentTab("palpites")}
                        className="text-xs font-bold text-[#d4af37] hover:underline flex items-center space-x-1"
                      >
                        <span>Ver Palpitão</span> <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {predictions.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-4 sm:col-span-2 text-center">Nenhum palpite publicado de hoje.</p>
                      ) : (
                        predictions.map((p) => (
                          <div key={p.id} className="p-4 border border-slate-800 rounded-2xl bg-[#16213e]/20 space-y-3">
                            <span className="px-2.5 py-0.5 bg-[#0a0f1d] border border-slate-800 text-[#d4af37] rounded text-[10px] font-bold uppercase tracking-wider">
                              🎯 {p.type}
                            </span>
                            <h5 className="font-extrabold text-white text-sm leading-tight">{p.title}</h5>
                            <div className="flex flex-wrap gap-1.5">
                              {p.numbers.map((n, idx) => (
                                <span key={idx} className="bg-[#d4af37]/15 border border-[#d4af37]/25 text-[#d4af37] font-black text-xs py-1 px-2.5 rounded-lg font-mono">
                                  {n}
                                </span>
                              ))}
                            </div>
                            <p className="text-[10px] text-slate-400 italic leading-snug font-medium">&quot;{p.content}&quot;</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Column - Sidebar Sponsorship banners & products lists */}
                <div className="space-y-8">
                  {/* Sponsor Lateral Banner */}
                  {sidebarAd && (
                    <a 
                      href={sidebarAd.linkUrl} 
                      onClick={() => handleAdClick(sidebarAd)}
                      className="bg-[#0d1526] border border-slate-800 p-4 rounded-3xl block text-white shadow-xl relative overflow-hidden transition hover:brightness-105"
                    >
                      <img
                        src={sidebarAd.imageUrl}
                        alt="Sidebar Ad Banner"
                        referrerPolicy="no-referrer"
                        className="w-full h-36 object-cover rounded-xl border border-slate-800"
                      />
                      <div className="pt-3 space-y-1">
                        <span className="text-[9px] bg-[#d4af37]/10 text-[#d4af37] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-[#d4af37]/20">PATROCINADO ☘️</span>
                        <h4 className="font-bold text-xs text-slate-200 uppercase tracking-tight line-clamp-1">{sidebarAd.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">Basta clicar no banner para ativar um desconto especial.</p>
                      </div>
                    </a>
                  )}

                  {/* Mini Catalog products lists highlights */}
                  <div className="bg-[#0d1526] rounded-3xl border border-slate-800 p-5 shadow-xl space-y-5">
                    <h4 className="font-extrabold text-[#d4af37] text-sm uppercase tracking-wide border-b border-slate-800 pb-3 flex items-center justify-between">
                      <span>Planilhas em Destaque</span>
                      <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                    </h4>
                    
                    <div className="space-y-4">
                      {products.slice(0, 3).map((prod) => (
                        <div 
                          key={prod.id} 
                          onClick={() => setCurrentTab("loja")}
                          className="flex items-center space-x-3 cursor-pointer group"
                        >
                          <img
                            src={prod.image}
                            alt={prod.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-black text-white group-hover:text-[#d4af37] transition truncate">{prod.title}</h5>
                            <p className="text-[10px] text-slate-450 font-semibold">{prod.fileType} • R$ {(prod.discountPrice || prod.price).toFixed(2)}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Mid inline spacing sponsor */}
              {inlineAd && (
                <a
                  href={inlineAd.linkUrl}
                  onClick={() => handleAdClick(inlineAd)}
                  className="bg-[#0d1526] border border-slate-800 rounded-2xl p-4 my-8 flex items-center justify-between gap-4 shadow-xl hover:bg-[#16213e]/20 transition"
                >
                  <div className="flex items-center space-x-3">
                    <img src={inlineAd.imageUrl} referrerPolicy="no-referrer" className="w-12 h-12 rounded object-cover border border-slate-800" />
                    <div>
                      <span className="text-[9px] text-[#d4af37] font-bold uppercase tracking-wider block">Estudos Patrocinados</span>
                      <h4 className="font-extrabold text-white text-xs sm:text-sm">{inlineAd.title}</h4>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </a>
              )}

              {/* Customer Testimonials carousel list */}
              {testimonials.length > 0 && (
                <div className="py-10 space-y-6">
                  <div className="text-center font-bold">
                    <p className="text-[#d4af37] text-xs tracking-widest uppercase">Garantia e Confiança Total</p>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">O que dizem os apostadores premium</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-[#0d1526] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
                        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800/80">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-800"
                          />
                          <div>
                            <h5 className="font-extrabold text-[#d4af37] text-sm">{t.name}</h5>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.role}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic font-medium">&quot;{t.text}&quot;</p>
                        <div className="flex text-[#d4af37]">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              <div className="bg-[#0d1526] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto my-12 shadow-xl">
                <div className="text-center space-y-2">
                  <HelpCircle className="w-10 h-10 text-[#d4af37] mx-auto" />
                  <h3 className="text-xl font-black text-white">Perguntas Frequentes (FAQ)</h3>
                  <p className="text-xs text-slate-400">Tire suas principais dúvidas sobre o recebimento de ferramentas e os palpites.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { q: "Como eu recebo as planilhas após a confirmação do pagamento?", a: "Assim que realizar a transferência do PIX da fatura pelo app do banco, as APIs de Mercado Pago processam e sinalizam instantaneamente a nossa central. Os arquivos XLSX, PDF, ZIP são liberados imediatamente na sua tela para download seguro e também salvos permanentemente na aba 'Downloads' de sua Área do Cliente." },
                    { q: "As planilhas funcionam em telefones celulares ou tablets?", a: "Sim perfectly! Nossos pacotes digitais de planilhas de cercamento e passes são desenvolvidos com tecnologia padrão Microsoft Excel. Você pode abri-los no smartphone usando os aplicativos gratuitos como Google Planilhas (Google Sheets) ou Microsoft Office Mobile." },
                    { q: "Eu posso obter ganhos e prêmios com os palpites gerados por inteligência artificial?", a: "As ferramentas e algoritmos matemáticos gerados por nosso portal de estudos analíticos são instrumentos estocásticos baseadas na clássica física matemática das puxadas aliada ao calendário lunar, que reduzem custos operacionais ao cercar grupos equilibrados. Não representam promessas mágicas de lucros absolutos ou garantias financeiras compulsórias." }
                  ].map((faq, idx) => {
                    const isOpen = faqOpenMap[idx] || false;
                    return (
                      <div key={idx} className="bg-[#16213e]/25 rounded-xl border border-slate-800 overflow-hidden shadow-md">
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full text-left p-4 font-extrabold text-xs sm:text-sm text-slate-100 flex justify-between items-center bg-[#0d1526]/40 hover:bg-[#16213e]/30 transition"
                        >
                          <span>{faq.q}</span>
                          <span className="text-slate-400">{isOpen ? "▲" : "▼"}</span>
                        </button>
                        {isOpen && (
                          <div className="p-4 text-xs leading-relaxed text-slate-300 border-t border-slate-850 bg-[#0d1526]/50 font-medium">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {currentTab === "palpites" && (
          <PredictionsPanel currentUser={currentUser} onRefreshTrigger={loadGlobalSettingsAndData} />
        )}

        {currentTab === "resultados" && (
          <ResultsPanel currentUser={currentUser} onRefreshTrigger={loadGlobalSettingsAndData} />
        )}

        {currentTab === "loja" && (
          <StoreFront
            currentUser={currentUser}
            onAddToCart={handleAddToCart}
            cart={cart}
            onOpenCart={() => setCartOpen(true)}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === "blog" && (
          <BlogPanel currentUser={currentUser} onRefreshTrigger={loadGlobalSettingsAndData} />
        )}

        {currentTab === "cliente" && (
          <ClientArea
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === "admin" && (
          <AdminPanel currentUser={currentUser} onRefreshTrigger={loadGlobalSettingsAndData} />
        )}
      </main>

      {/* Footer copyright */}
      <Footer settings={settings} setCurrentTab={setCurrentTab} />

      {/* Bottom Floating Whatsapp direct communication channel button */}
      <a
        href={`https://wa.me/${settings.supportWhatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all text-xs flex items-center space-x-2 border border-emerald-400"
        title="Fale Conosco no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 select-none" />
        <span className="hidden sm:inline font-bold">Suporte WhatsApp</span>
      </a>

      {/* Cart Sidebar modal overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end">
          <div className="bg-white max-w-sm w-full h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" />
                  <span>Meus Pedidos Carrinho ({cart.length})</span>
                </h4>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 px-2.5 hover:bg-slate-100 rounded text-slate-400 font-extrabold text-xs uppercase"
                >
                  Fechar
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-10">Carrinho vazio de momento.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl gap-2">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-xs text-slate-900 truncate">{item.title}</h5>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.fileType} • R$ {(item.discountPrice || item.price).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-rose-500 hover:text-rose-700 font-bold text-xs px-2 py-1 hover:bg-rose-50 rounded"
                      >
                        Excluir
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between font-extrabold text-sm text-slate-900">
                <span>Subtotal Estimado:</span>
                <span>R$ {cart.reduce((sum, item) => sum + (item.discountPrice || item.price), 0).toFixed(2)}</span>
              </div>
              <button
                onClick={handleCartCheckoutAll}
                disabled={cart.length === 0}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase rounded-xl tracking-wider shadow transition disabled:opacity-50"
              >
                Prosseguir para Checkout com Pix →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP Sponsor overlay optional Modal dialog */}
      {showPopupAdModal && popupAd && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border overflow-hidden shadow-2xl relative animate-scale-in p-5 space-y-4">
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-[10px] bg-amber-500/10 text-amber-700 font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border border-amber-500/20 flex items-center">
                <span>☘️ OFERTA PATROCINADA VIP</span>
              </span>
              <button
                onClick={() => setShowPopupAdModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              onClick={() => {
                handleAdClick(popupAd);
                setCurrentTab("loja");
                setShowPopupAdModal(false);
              }}
              className="cursor-pointer space-y-3 block"
            >
              <img
                src={popupAd.imageUrl}
                alt="Popup Ad Cover"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-xl border"
              />
              <div className="space-y-1">
                <h4 className="font-black text-slate-900 text-sm">{popupAd.title}</h4>
                <p className="text-xs text-slate-400">Ganhe acesso imediato ao clicar no convite. Transações 100% autoseguras ssl.</p>
              </div>
            </div>

            <button
              onClick={() => {
                handleAdClick(popupAd);
                setCurrentTab("loja");
                setShowPopupAdModal(false);
              }}
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs uppercase rounded-xl tracking-wider shadow"
            >
              Acessar Promoção Ativa Now
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
