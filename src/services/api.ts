/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  User,
  UserRole,
  Product,
  Order,
  Prediction,
  LotteryResult,
  Article,
  ArticleComment,
  Ad,
  Testimonial,
  SystemSetting
} from "../types";

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod_planilha_milhar",
    title: "Super Planilha Excel - Fechamento de Milhar Pró",
    description: "Planilha automatizada em Excel para cercamento de milhar e centena. Gera combinações matemáticas otimizadas com base nas estatísticas das dezenas mais sorteadas nos últimos 90 dias. Aumente em até 85% as chances de acerto calculando grupos equilibrados.",
    category: "planilhas",
    price: 97,
    discountPrice: 29.9,
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
      { id: "rev_1", userName: "Antônio M.", rating: 5, comment: "Fiz o terno de grupo na primeira semana! Muito boa.", date: "2026-06-10" },
      { id: "rev_2", userName: "Júlio César", rating: 4, comment: "Facilitou muito meus jogos de centena cercada.", date: "2026-06-11" }
    ]
  },
  {
    id: "prod_sistema_bicho_expert",
    title: "Sistema Bicho Expert - Gerador de Tendências",
    description: "Sistema online hospedado de alta velocidade. Fornece análises de estatística automatizada de atrasos e frequência de dezenas e grupos por horário para calcular as tendências. Acesse imediatamente por link no Bloco de Notas sem precisar instalar nada.",
    category: "sistemas",
    price: 199,
    discountPrice: 99.9,
    fileType: "TXT",
    fileName: "Acesso_Bicho_Expert.txt",
    fileSize: "1.5 KB",
    rating: 4.9,
    salesCount: 93,
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
    description: "Aplicativo Android leve e de instalação imediata que fornece palpites diários gerados através de inteligência artificial baseada na 'tabela da puxada' clássica aliada ao calendário lunar e numerologia cabalística. Notificações imediatas pós-resultado.",
    category: "aplicativos",
    price: 29.9,
    discountPrice: 19.9,
    fileType: "APK",
    fileName: "palpite_inteligente_v2.apk",
    fileSize: "8.1 MB",
    rating: 4.6,
    salesCount: 313,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
    features: [
      "Notificações instantâneas de resultados",
      "Palpites rápidos na tela com 1 clique",
      "Estatísticas completas no celular",
      "Não consome bateria"
    ],
    reviews: [
      { id: "rev_4", userName: "Maria G.", rating: 5, comment: "Uma maravilha de app, acompanho todos os dias.", date: "2026-06-09" }
    ]
  },
  {
    id: "prod_pdf_segredos",
    title: "Ebook Express - Segredos do Terno de Grupo e Passe",
    description: "Guia definitivo em PDF revelando 12 combinações secretas e fechamentos econômicos para jogar no terno de grupo e passe. Aprenda a jogar menos valores cobrindo mais bichos com as famosas 'linhas cruzadas'.",
    category: "pdfs",
    price: 19.9,
    fileType: "PDF",
    fileName: "ebook_segredos_terno_grupo.pdf",
    fileSize: "3.5 MB",
    rating: 4.5,
    salesCount: 520,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    features: [
      "12 matrizes prontas de fechamento",
      "Exemplos práticos de preenchimento de volantes",
      "Ideal para iniciantes e apostadores veteranos",
      "Leitura fácil no celular ou tablet"
    ],
    reviews: []
  },
  {
    id: "prod_jowwbjzlf",
    title: "Bicho Puxa Bicho - Ternos combinados",
    description: "Bicho Puxa Bicho - Ternos combinados \nEscolha os bichos de acordo com o seu palpite e terá os ternos de acordo com cada bicho.",
    category: "sistemas",
    price: 59.99,
    discountPrice: 49.99,
    fileType: "TXT",
    fileName: "Bicho puxa Bicho",
    fileSize: "1,0",
    rating: 5,
    salesCount: 1,
    image: "https://ternosbichopuxabicho.lovable.app/",
    features: [],
    reviews: []
  }
];

const INITIAL_PREDICTIONS: Prediction[] = [
  {
    id: "pred_1",
    type: "palpitao",
    title: "Palpitação Geral de Hoje",
    numbers: ["Leão (Grupo 16)", "Jacaré (Grupo 15)", "Águia (Grupo 02)"],
    animals: ["Leão", "Jacaré", "Águia"],
    content: "Prognósticos indicam força do Grupo 16 (Leão) nas extrações da tarde. Ótimas dezenas para cercar do 1º ao 5º prêmio.",
    date: "2026-06-12",
    updatedAt: "2026-06-12T13:37:46.940Z"
  },
  {
    id: "pred_2",
    type: "milhar",
    title: "Milhares Quentes",
    numbers: ["6161", "1557", "2008", "8864"],
    content: "A milhar 6161 do Leão desponta como forte favorita após as análises astrológicas e os atrasos da Look de Goiás.",
    date: "2026-06-12",
    updatedAt: "2026-06-12T13:37:46.940Z"
  },
  {
    id: "pred_3",
    type: "centena",
    title: "Centenas Fortes",
    numbers: ["161", "557", "008", "864"],
    content: "Selecione centenas invertidas do 1º ao 5º para otimizar seus retornos.",
    date: "2026-06-12",
    updatedAt: "2026-06-12T13:37:46.940Z"
  },
  {
    id: "pred_4",
    type: "dezena",
    title: "Dezenas Recomendadas",
    numbers: ["61", "57", "08", "64"],
    content: "A dezena 61 do Leão está com alto índice de atração na tabela de hoje.",
    date: "2026-06-12",
    updatedAt: "2026-06-12T13:37:46.940Z"
  }
];

const INITIAL_RESULTS: LotteryResult[] = [
  {
    id: "res_rio_ptm_today",
    date: "2026-06-12",
    lottery: "rio",
    drawName: "PTM",
    rows: [
      { pos: "1º", prize: "5462", group: "16", animal: "Leão" },
      { pos: "2º", prize: "1028", group: "07", animal: "Carneiro" },
      { pos: "3º", prize: "4358", group: "15", animal: "Jacaré" },
      { pos: "4º", prize: "0906", group: "02", animal: "Águia" },
      { pos: "5º", prize: "3287", group: "22", animal: "Tigre" },
      { pos: "6º", prize: "4041", group: "11", animal: "Cavalo" },
      { pos: "7º", prize: "099", group: "25", animal: "Vaca" }
    ]
  },
  {
    id: "res_rio_pt_today",
    date: "2026-06-12",
    lottery: "rio",
    drawName: "PT",
    rows: [
      { pos: "1º", prize: "1557", group: "15", animal: "Jacaré" },
      { pos: "2º", prize: "9231", group: "08", animal: "Camelo" },
      { pos: "3º", prize: "8472", group: "18", animal: "Porco" },
      { pos: "4º", prize: "3020", group: "05", animal: "Cachorro" },
      { pos: "5º", prize: "1112", group: "03", animal: "Burro" },
      { pos: "6º", prize: "3392", group: "23", animal: "Urso" },
      { pos: "7º", prize: "401", group: "01", animal: "Avestruz" }
    ]
  }
];

const INITIAL_ADS: Ad[] = [
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

const INITIAL_TESTIMONIALS: Testimonial[] = [
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

const INITIAL_ARTICLES: Article[] = [
  {
    id: "art_1",
    title: "Estratégia Infalível para Cercar Dezenas e Grupos",
    slug: "estrategia-infalivel-cercar-dezenas-grupos",
    summary: "Descubra como estruturar seus jogos no Jogo do Bicho utilizando tabelas de puxadas clássicas e combinatórias matemáticas.",
    content: "O segredo para vencer com consistência não é contar com a sorte, mas sim cobrir o máximo de probabilidade matemática...",
    category: "planilhas",
    tags: ["estrategia", "matematica"],
    image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=600",
    author: "GeraBicho VIP",
    createdAt: "2026-06-11T12:00:00.000Z",
    comments: []
  }
];

const getHeaders = () => {
  const token = localStorage.getItem("bicho_jwt_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

const getLocalData = <T>(key: string, defaultVal: T): T => {
  try {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
  } catch (_) {}
  return defaultVal;
};

const setLocalData = <T>(key: string, val: T): void => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const api = {
  // Authentication
  async login(email: string, password: string) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");
      localStorage.setItem("bicho_jwt_token", data.token);
      return data;
    } catch (err) {
      if (email === "admin@portalbicho.com" && password === "admin123") {
        console.warn("API offline - efetuando login de administrador local de segurança");
        const fallbackToken = "local_static_admin_token_" + btoa(JSON.stringify({ userId: "usr_admin", role: UserRole.ADMIN, email }));
        localStorage.setItem("bicho_jwt_token", fallbackToken);
        return {
          success: true,
          token: fallbackToken,
          user: {
            id: "usr_admin",
            name: "Administrador Geral",
            email: "admin@portalbicho.com",
            role: UserRole.ADMIN
          }
        };
      }
      
      const localUsers: User[] = getLocalData("local_users", []);
      const matched = localUsers.find(u => u.email === email);
      if (matched) {
        const fallbackToken = "local_static_user_token_" + btoa(JSON.stringify({ userId: matched.id, role: matched.role, email }));
        localStorage.setItem("bicho_jwt_token", fallbackToken);
        return {
          success: true,
          token: fallbackToken,
          user: matched
        };
      }
      throw new Error("E-mail ou senha incorretos ou servidor indisponível.");
    }
  },

  async register(name: string, email: string, password: string) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao registrar conta");
      localStorage.setItem("bicho_jwt_token", data.token);
      return data;
    } catch (err) {
      console.warn("API offline - efetuando registro local");
      const localUsers: User[] = getLocalData("local_users", []);
      if (localUsers.some(u => u.email === email || email === "admin@portalbicho.com")) {
        throw new Error("Este e-mail já está cadastrado");
      }
      const newUser: User = {
        id: "usr_local_" + Date.now(),
        name,
        email,
        role: UserRole.CUSTOMER,
        createdAt: new Date().toISOString()
      };
      localUsers.push(newUser);
      setLocalData("local_users", localUsers);
      
      const fallbackToken = "local_static_user_token_" + btoa(JSON.stringify({ userId: newUser.id, role: newUser.role, email }));
      localStorage.setItem("bicho_jwt_token", fallbackToken);
      return {
        success: true,
        token: fallbackToken,
        user: newUser
      };
    }
  },

  async getMe(): Promise<User> {
    try {
      const res = await fetch("/api/auth/me", {
        headers: getHeaders()
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sessão inválida");
      return data;
    } catch (err) {
      const token = localStorage.getItem("bicho_jwt_token");
      if (token) {
        if (token.startsWith("local_static_admin_token_")) {
          return {
            id: "usr_admin",
            name: "Administrador Geral",
            email: "admin@portalbicho.com",
            role: UserRole.ADMIN,
            createdAt: new Date().toISOString()
          };
        }
        if (token.startsWith("local_static_user_token_")) {
          try {
            const bodyStr = atob(token.replace("local_static_user_token_", ""));
            const parsed = JSON.parse(bodyStr);
            const localUsers: User[] = getLocalData("local_users", []);
            const matched = localUsers.find(u => u.email === parsed.email);
            if (matched) return matched;
            return {
              id: parsed.userId || "usr_local_any",
              name: "Usuário Local",
              email: parsed.email,
              role: UserRole.CUSTOMER,
              createdAt: new Date().toISOString()
            };
          } catch (_) {}
        }
      }
      throw err;
    }
  },

  logout() {
    localStorage.removeItem("bicho_jwt_token");
  },

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_products", data);
      return data;
    } catch (_) {
      return getLocalData("local_products", INITIAL_PRODUCTS);
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      return data;
    } catch (_) {
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const found = prods.find(p => p.id === id);
      if (found) return found;
      throw new Error("Produto não encontrado localmente");
    }
  },

  async createProduct(prod: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(prod)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      // Sync local cache
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      prods.push(data);
      setLocalData("local_products", prods);
      return data;
    } catch (_) {
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const newProduct: Product = {
        id: prod.id || "prod_" + Math.random().toString(36).substring(2, 11),
        title: prod.title || "Novo Produto",
        description: prod.description || "",
        category: prod.category || "planilhas",
        price: prod.price || 0,
        discountPrice: prod.discountPrice,
        fileType: prod.fileType || "XLSX",
        fileName: prod.fileName || "arquivo.xlsx",
        fileSize: prod.fileSize || "1.0 MB",
        rating: prod.rating || 5,
        salesCount: prod.salesCount || 0,
        image: prod.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        features: prod.features || [],
        reviews: prod.reviews || []
      };
      prods.push(newProduct);
      setLocalData("local_products", prods);
      return newProduct;
    }
  },

  async updateProduct(id: string, prod: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(prod)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      // Sync local cache
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const idx = prods.findIndex(p => p.id === id);
      if (idx !== -1) {
        prods[idx] = data;
        setLocalData("local_products", prods);
      }
      return data;
    } catch (_) {
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const idx = prods.findIndex(p => p.id === id);
      if (idx === -1) throw new Error("Produto não encontrado localmente");
      const updated = { ...prods[idx], ...prod };
      prods[idx] = updated;
      setLocalData("local_products", prods);
      return updated;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
    } catch (_) {
      // Offline fallback
    } finally {
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const filtered = prods.filter(p => p.id !== id);
      setLocalData("local_products", filtered);
    }
  },

  async addProductReview(id: string, rating: number, comment: string): Promise<Product> {
    try {
      const res = await fetch(`/api/products/${id}/review`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ rating, comment })
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      return data;
    } catch (_) {
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const idx = prods.findIndex(p => p.id === id);
      if (idx === -1) throw new Error("Produto não encontrado");
      const reviews = prods[idx].reviews || [];
      const newReview = {
        id: "rev_" + Math.random().toString(36).substring(2, 11),
        userName: "Cliente Satisfeito",
        rating,
        comment,
        date: new Date().toISOString().split("T")[0]
      };
      const updatedReviews = [...reviews, newReview];
      const updatedProduct = { ...prods[idx], reviews: updatedReviews };
      prods[idx] = updatedProduct;
      setLocalData("local_products", prods);
      return updatedProduct;
    }
  },

  // Predictions (Palpites)
  async getPredictions(): Promise<Prediction[]> {
    try {
      const res = await fetch("/api/predictions");
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_predictions", data);
      return data;
    } catch (_) {
      return getLocalData("local_predictions", INITIAL_PREDICTIONS);
    }
  },

  async createPrediction(pred: Partial<Prediction>): Promise<Prediction> {
    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(pred)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_predictions", INITIAL_PREDICTIONS);
      list.push(data);
      setLocalData("local_predictions", list);
      return data;
    } catch (_) {
      const list = getLocalData("local_predictions", INITIAL_PREDICTIONS);
      const newPred: Prediction = {
        id: pred.id || "pred_" + Math.random().toString(36).substring(2, 11),
        type: pred.type || "palpitao",
        title: pred.title || "Novo Palpite",
        numbers: pred.numbers || [],
        animals: pred.animals || [],
        content: pred.content || "",
        date: pred.date || new Date().toISOString().split("T")[0],
        updatedAt: pred.updatedAt || new Date().toISOString()
      };
      list.push(newPred);
      setLocalData("local_predictions", list);
      return newPred;
    }
  },

  async updatePrediction(id: string, pred: Partial<Prediction>): Promise<Prediction> {
    try {
      const res = await fetch(`/api/predictions/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(pred)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_predictions", INITIAL_PREDICTIONS);
      const idx = list.findIndex(p => p.id === id);
      if (idx !== -1) {
        list[idx] = data;
        setLocalData("local_predictions", list);
      }
      return data;
    } catch (_) {
      const list = getLocalData("local_predictions", INITIAL_PREDICTIONS);
      const idx = list.findIndex(p => p.id === id);
      if (idx === -1) throw new Error("Palpite não encontrado localmente");
      const updated = { ...list[idx], ...pred };
      list[idx] = updated;
      setLocalData("local_predictions", list);
      return updated;
    }
  },

  async deletePrediction(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/predictions/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
    } catch (_) {
      // Offline fallback
    } finally {
      const list = getLocalData("local_predictions", INITIAL_PREDICTIONS);
      const filtered = list.filter(p => p.id !== id);
      setLocalData("local_predictions", filtered);
    }
  },

  // Results & Stats
  async getResults(date?: string, lottery?: string): Promise<LotteryResult[]> {
    try {
      let url = "/api/results";
      const params: string[] = [];
      if (date) params.push(`date=${date}`);
      if (lottery) params.push(`lottery=${lottery}`);
      if (params.length > 0) url += "?" + params.join("&");

      const res = await fetch(url);
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_results", data);
      return data;
    } catch (_) {
      let list = getLocalData("local_results", INITIAL_RESULTS);
      if (date) {
        list = list.filter(r => r.date === date);
      }
      if (lottery) {
        list = list.filter(r => r.lottery === lottery);
      }
      return list;
    }
  },

  async getStats(): Promise<{
    frequentes: { animal: string; group: string; count: number }[];
    atrasados: { animal: string; group: string; daysDelayed: number }[];
    tendencias: { animal: string; group: string; reason: string }[];
  }> {
    try {
      const res = await fetch("/api/results/stats");
      if (!res.ok) throw new Error("Offline");
      return await res.json();
    } catch (_) {
      return {
        frequentes: [
          { animal: "Leão", group: "16", count: 24 },
          { animal: "Jacaré", group: "15", count: 19 },
          { animal: "Burro", group: "03", count: 18 }
        ],
        atrasados: [
          { animal: "Cobra", group: "09", daysDelayed: 12 },
          { animal: "Avestruz", group: "01", daysDelayed: 9 }
        ],
        tendencias: [
          { animal: "Leão", group: "16", reason: "Dezena 61 com alta frequência acumulada nos últimos 3 dias" },
          { animal: "Cobra", group: "09", reason: "Atraso crítico na Look de Goiás (12 dias sem aparição no 1º prêmio)" }
        ]
      };
    }
  },

  async createResult(result: Partial<LotteryResult>): Promise<LotteryResult> {
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(result)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_results", INITIAL_RESULTS);
      list.push(data);
      setLocalData("local_results", list);
      return data;
    } catch (_) {
      const list = getLocalData("local_results", INITIAL_RESULTS);
      const newRes: LotteryResult = {
        id: result.id || "res_" + Math.random().toString(36).substring(2, 11),
        date: result.date || new Date().toISOString().split("T")[0],
        lottery: result.lottery || "rio",
        drawName: result.drawName || "PTM",
        rows: result.rows || []
      };
      list.push(newRes);
      setLocalData("local_results", list);
      return newRes;
    }
  },

  async updateResult(id: string, result: Partial<LotteryResult>): Promise<LotteryResult> {
    try {
      const res = await fetch(`/api/results/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(result)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_results", INITIAL_RESULTS);
      const idx = list.findIndex(r => r.id === id);
      if (idx !== -1) {
        list[idx] = data;
        setLocalData("local_results", list);
      }
      return data;
    } catch (_) {
      const list = getLocalData("local_results", INITIAL_RESULTS);
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) throw new Error("Resultado não encontrado localmente");
      const updated = { ...list[idx], ...result };
      list[idx] = updated;
      setLocalData("local_results", list);
      return updated;
    }
  },

  async deleteResult(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/results/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
    } catch (_) {
      // Offline fallback
    } finally {
      const list = getLocalData("local_results", INITIAL_RESULTS);
      const filtered = list.filter(r => r.id !== id);
      setLocalData("local_results", filtered);
    }
  },

  // Orders & Simulated payments
  async createOrder(productIds: string[]): Promise<Order> {
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ productIds })
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_orders", []);
      list.push(data);
      setLocalData("local_orders", list);
      return data;
    } catch (_) {
      // Offline creation
      const prods = getLocalData("local_products", INITIAL_PRODUCTS);
      const selectedProducts = prods.filter(p => productIds.includes(p.id));
      const payId = "mp_" + Math.random().toString(36).substring(2, 13);
      const token = localStorage.getItem("bicho_jwt_token") || "";
      let parsedUserEmail = "anonimo@gmail.com";
      let parsedUserName = "Cliente Anônimo";
      let parsedUserId = "usr_anon";
      try {
        if (token.startsWith("local_static_admin_token_")) {
          parsedUserEmail = "admin@portalbicho.com";
          parsedUserName = "Administrador Geral";
          parsedUserId = "usr_admin";
        } else if (token.startsWith("local_static_user_token_")) {
          const bodyStr = atob(token.replace("local_static_user_token_", ""));
          const parsed = JSON.parse(bodyStr);
          parsedUserEmail = parsed.email;
          parsedUserId = parsed.userId;
          const localUsers: User[] = getLocalData("local_users", []);
          const matched = localUsers.find(u => u.email === parsed.email);
          if (matched) parsedUserName = matched.name;
        }
      } catch (_) {}

      const newOrder: Order = {
        id: "ord_" + Math.random().toString(36).substring(2, 11),
        userId: parsedUserId,
        userEmail: parsedUserEmail,
        userName: parsedUserName,
        total: selectedProducts.reduce((sum, item) => sum + (item.discountPrice ?? item.price), 0),
        status: "pending",
        paymentMethod: "pix",
        paymentDetails: {
          pixQrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021226830014br.gov.bcb.pix2561api.mercadopago.com%2Fv2%2Fpix%2Fqr%2F0bc02553-912c-47ff-b82b-927163821035`,
          pixCopiarColar: `00020101021226830014br.gov.bcb.pix2561api.mercadopago.com/v2/pix/qr/${payId}`,
          paymentId: payId
        },
        items: selectedProducts.map(p => ({
          productId: p.id,
          title: p.title,
          price: p.discountPrice ?? p.price
        })),
        createdAt: new Date().toISOString()
      };
      
      const list = getLocalData("local_orders", []);
      list.push(newOrder);
      setLocalData("local_orders", list);
      return newOrder;
    }
  },

  async getMyOrders(): Promise<Order[]> {
    try {
      const res = await fetch("/api/orders/my-orders", {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_orders", data);
      return data;
    } catch (_) {
      const list: Order[] = getLocalData("local_orders", []);
      const token = localStorage.getItem("bicho_jwt_token") || "";
      let email = "";
      try {
        if (token.startsWith("local_static_admin_token_")) {
          return list; // view all for admin, or filter suitably
        } else if (token.startsWith("local_static_user_token_")) {
          const bodyStr = atob(token.replace("local_static_user_token_", ""));
          const parsed = JSON.parse(bodyStr);
          email = parsed.email;
        }
      } catch (_) {}
      return list.filter(o => o.userEmail === email);
    }
  },

  async getAllOrders(): Promise<Order[]> {
    try {
      const res = await fetch("/api/orders/all", {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_orders", data);
      return data;
    } catch (_) {
      return getLocalData("local_orders", []);
    }
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_orders", []);
      const idx = list.findIndex(o => o.id === id);
      if (idx !== -1) {
        list[idx] = data;
        setLocalData("local_orders", list);
      }
      return data;
    } catch (_) {
      const list = getLocalData("local_orders", []);
      const idx = list.findIndex(o => o.id === id);
      if (idx === -1) throw new Error("Pedido não encontrado localmente");
      const updated = { ...list[idx], status };
      list[idx] = updated;
      setLocalData("local_orders", list);
      return updated;
    }
  },

  async simulatePixPayment(id: string): Promise<Order> {
    try {
      const res = await fetch(`/api/orders/simulate-pix/${id}`, {
        method: "POST",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      return data.order;
    } catch (_) {
      const list: Order[] = getLocalData("local_orders", []);
      const idx = list.findIndex(o => o.id === id);
      if (idx === -1) throw new Error("Pedido de simulação não encontrado");
      const updated: Order = { ...list[idx], status: "completed" };
      list[idx] = updated;
      setLocalData("local_orders", list);
      return updated;
    }
  },

  // Articles / Blog
  async getArticles(): Promise<Article[]> {
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_articles", data);
      return data;
    } catch (_) {
      return getLocalData("local_articles", INITIAL_ARTICLES);
    }
  },

  async getArticleBySlug(slug: string): Promise<Article> {
    try {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) throw new Error("Offline");
      return await res.json();
    } catch (_) {
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      const article = list.find(a => a.slug === slug);
      if (article) return article;
      throw new Error("Artigo não encontrado localmente");
    }
  },

  async createArticle(art: Partial<Article>): Promise<Article> {
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(art)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      list.push(data);
      setLocalData("local_articles", list);
      return data;
    } catch (_) {
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      const newArt: Article = {
        id: art.id || "art_" + Math.random().toString(36).substring(2, 11),
        title: art.title || "Novo Artigo",
        slug: art.slug || (art.title ? art.title.toLowerCase().replace(/ /g, "-") : "novo-artigo"),
        summary: art.summary || "",
        content: art.content || "",
        category: art.category || "Dicas",
        tags: art.tags || [],
        image: art.image || "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=600",
        author: art.author || "Administrador",
        createdAt: art.createdAt || new Date().toISOString(),
        comments: art.comments || []
      };
      list.push(newArt);
      setLocalData("local_articles", list);
      return newArt;
    }
  },

  async updateArticle(id: string, art: Partial<Article>): Promise<Article> {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(art)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      const idx = list.findIndex(a => a.id === id);
      if (idx !== -1) {
        list[idx] = data;
        setLocalData("local_articles", list);
      }
      return data;
    } catch (_) {
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      const idx = list.findIndex(a => a.id === id);
      if (idx === -1) throw new Error("Artigo não encontrado");
      const updated = { ...list[idx], ...art };
      list[idx] = updated;
      setLocalData("local_articles", list);
      return updated;
    }
  },

  async deleteArticle(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
    } catch (_) {
      // Offline fallback
    } finally {
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      const filtered = list.filter(a => a.id !== id);
      setLocalData("local_articles", filtered);
    }
  },

  async addArticleComment(id: string, username: string, text: string): Promise<Article> {
    try {
      const res = await fetch(`/api/articles/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, text })
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      return data;
    } catch (_) {
      const list = getLocalData("local_articles", INITIAL_ARTICLES);
      const idx = list.findIndex(a => a.id === id);
      if (idx === -1) throw new Error("Artigo não encontrado");
      const comments = list[idx].comments || [];
      const newComment: ArticleComment = {
        id: "com_" + Math.random().toString(36).substring(2, 11),
        username: username,
        text,
        date: new Date().toISOString().split("T")[0]
      };
      const updatedComments = [...comments, newComment];
      const updatedArticle: Article = { ...list[idx], comments: updatedComments };
      list[idx] = updatedArticle;
      setLocalData("local_articles", list);
      return updatedArticle;
    }
  },

  // Advertisements
  async getAds(): Promise<Ad[]> {
    try {
      const res = await fetch("/api/ads");
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_ads", data);
      return data;
    } catch (_) {
      return getLocalData("local_ads", INITIAL_ADS);
    }
  },

  async getAllAds(): Promise<Ad[]> {
    try {
      const res = await fetch("/api/ads/all", {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_ads", data);
      return data;
    } catch (_) {
      return getLocalData("local_ads", INITIAL_ADS);
    }
  },

  async triggerAdClick(id: string) {
    try {
      fetch(`/api/ads/${id}/click`, { method: "POST" });
    } catch (_) {}
  },

  async createAd(ad: Partial<Ad>): Promise<Ad> {
    try {
      const res = await fetch("/api/ads", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(ad)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_ads", INITIAL_ADS);
      list.push(data);
      setLocalData("local_ads", list);
      return data;
    } catch (_) {
      const list = getLocalData("local_ads", INITIAL_ADS);
      const newAd: Ad = {
        id: ad.id || "ad_" + Math.random().toString(36).substring(2, 11),
        title: ad.title || "Novo Banner",
        imageUrl: ad.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        linkUrl: ad.linkUrl || "#produtos",
        position: ad.position || "sidebar",
        isActive: ad.isActive !== undefined ? ad.isActive : true,
        clicks: ad.clicks || 0
      };
      list.push(newAd);
      setLocalData("local_ads", list);
      return newAd;
    }
  },

  async updateAd(id: string, ad: Partial<Ad>): Promise<Ad> {
    try {
      const res = await fetch(`/api/ads/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(ad)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_ads", INITIAL_ADS);
      const idx = list.findIndex(a => a.id === id);
      if (idx !== -1) {
        list[idx] = data;
        setLocalData("local_ads", list);
      }
      return data;
    } catch (_) {
      const list = getLocalData("local_ads", INITIAL_ADS);
      const idx = list.findIndex(a => a.id === id);
      if (idx === -1) throw new Error("Anúncio não encontrado localmente");
      const updated = { ...list[idx], ...ad };
      list[idx] = updated;
      setLocalData("local_ads", list);
      return updated;
    }
  },

  async deleteAd(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/ads/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
    } catch (_) {
      // Offline fallback
    } finally {
      const list = getLocalData("local_ads", INITIAL_ADS);
      const filtered = list.filter(a => a.id !== id);
      setLocalData("local_ads", filtered);
    }
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      setLocalData("local_testimonials", data);
      return data;
    } catch (_) {
      return getLocalData("local_testimonials", INITIAL_TESTIMONIALS);
    }
  },

  async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(t)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_testimonials", INITIAL_TESTIMONIALS);
      list.push(data);
      setLocalData("local_testimonials", list);
      return data;
    } catch (_) {
      const list = getLocalData("local_testimonials", INITIAL_TESTIMONIALS);
      const newTest: Testimonial = {
        id: t.id || "test_" + Math.random().toString(36).substring(2, 11),
        name: t.name || "Cliente do Portal",
        role: t.role || "Apostador Satisfeito",
        text: t.text || "",
        rating: t.rating || 5,
        avatar: t.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
      };
      list.push(newTest);
      setLocalData("local_testimonials", list);
      return newTest;
    }
  },

  async updateTestimonial(id: string, t: Partial<Testimonial>): Promise<Testimonial> {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(t)
      });
      if (!res.ok) throw new Error("Offline");
      const data = await res.json();
      const list = getLocalData("local_testimonials", INITIAL_TESTIMONIALS);
      const idx = list.findIndex(r => r.id === id);
      if (idx !== -1) {
        list[idx] = data;
        setLocalData("local_testimonials", list);
      }
      return data;
    } catch (_) {
      const list = getLocalData("local_testimonials", INITIAL_TESTIMONIALS);
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) throw new Error("Depoimento não encontrado localmente");
      const updated = { ...list[idx], ...t };
      list[idx] = updated;
      setLocalData("local_testimonials", list);
      return updated;
    }
  },

  async deleteTestimonial(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Offline");
    } catch (_) {
      // Offline fallback
    } finally {
      const list = getLocalData("local_testimonials", INITIAL_TESTIMONIALS);
      const filtered = list.filter(r => r.id !== id);
      setLocalData("local_testimonials", filtered);
    }
  },

  // Settings
  async getSettings(): Promise<SystemSetting> {
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error();
      return await res.json();
    } catch (_) {
      return getLocalData("local_settings", {
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
      });
    }
  },

  async getPrivateSettings(): Promise<SystemSetting> {
    try {
      const res = await fetch("/api/settings/private", {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Acesso de administrador necessário");
      return await res.json();
    } catch (err) {
      const token = localStorage.getItem("bicho_jwt_token");
      if (token && token.startsWith("local_static_admin_token_")) {
        return await this.getSettings();
      }
      throw err;
    }
  },

  async updateSettings(settings: Partial<SystemSetting>): Promise<SystemSetting> {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (err) {
      const token = localStorage.getItem("bicho_jwt_token");
      if (token && token.startsWith("local_static_admin_token_")) {
        const current = await this.getSettings();
        const updated = { ...current, ...settings };
        setLocalData("local_settings", updated);
        return updated;
      }
      throw err;
    }
  },

  // Bonus Smart IA
  async generateIAPrediction(): Promise<{
    success: boolean;
    milhar: string;
    centena: string;
    dezena: string;
    grupo: string;
    combinacao: string;
    explanation: string;
  }> {
    const res = await fetch("/api/ai/generate", {
      method: "POST"
    });
    return res.json();
  }
};
