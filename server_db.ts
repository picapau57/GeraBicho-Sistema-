/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from "fs";
import path from "path";
import bcryptjs from "bcryptjs";
import {
  User,
  UserRole,
  Product,
  Order,
  Prediction,
  LotteryResult,
  Article,
  Ad,
  Testimonial,
  SystemSetting,
  PredictionType
} from "./src/types";

// Database storage file path
const DB_PATH = path.join(process.cwd(), "data", "db.json");

interface DatabaseSchema {
  users: User[];
  products: Product[];
  orders: Order[];
  predictions: Prediction[];
  results: LotteryResult[];
  articles: Article[];
  ads: Ad[];
  testimonials: Testimonial[];
  settings: SystemSetting;
}

// Generate default mock data if not existing
function getInitialData(): DatabaseSchema {
  const adminPasswordHash = bcryptjs.hashSync("admin123", 10);
  const customerPasswordHash = bcryptjs.hashSync("cliente123", 10);

  const todayStr = new Date().toISOString().split("T")[0];

  const defaultUsers: User[] = [
    {
      id: "usr_admin",
      name: "Administrador do Portal",
      email: "admin@portalbicho.com",
      password: adminPasswordHash,
      role: UserRole.ADMIN,
      createdAt: new Date().toISOString()
    },
    {
      id: "usr_customer",
      name: "Carlos Silva",
      email: "carlos@gmail.com",
      password: customerPasswordHash,
      role: UserRole.CUSTOMER,
      createdAt: new Date().toISOString()
    }
  ];

  const defaultProducts: Product[] = [
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
        { id: "rev_1", userName: "Antônio M.", rating: 5, comment: "Fiz o terno de grupo na primeira semana! Muito boa.", date: "2026-06-10" },
        { id: "rev_2", userName: "Júlio César", rating: 4, comment: "Facilitou muito meus jogos de centena cercada.", date: "2026-06-11" }
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
      description: "Aplicativo Android leve e de instalação imediata que fornece palpites diários gerados através de inteligência artificial baseada na 'tabela da puxada' clássica aliada ao calendário lunar e numerologia cabalística. Notificações imediatas pós-resultado.",
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
      price: 19.90,
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
    }
  ];

  const defaultPredictions: Prediction[] = [
    {
      id: "pred_1",
      type: "palpitao",
      title: "Palpitação Geral de Hoje",
      numbers: ["Leão (Grupo 16)", "Jacaré (Grupo 15)", "Águia (Grupo 02)"],
      animals: ["Leão", "Jacaré", "Águia"],
      content: "Prognósticos indicam força do Grupo 16 (Leão) nas extrações da tarde. Ótimas dezenas para cercar do 1º ao 5º prêmio.",
      date: todayStr,
      updatedAt: new Date().toISOString()
    },
    {
      id: "pred_2",
      type: "milhar",
      title: "Milhares Quentes",
      numbers: ["6161", "1557", "2008", "8864"],
      content: "A milhar 6161 do Leão desponta como forte favorita após as análises astrológicas e os atrasos da Look de Goiás.",
      date: todayStr,
      updatedAt: new Date().toISOString()
    },
    {
      id: "pred_3",
      type: "centena",
      title: "Centenas Fortes",
      numbers: ["161", "557", "008", "864"],
      content: "Selecione centenas invertidas do 1º ao 5º para otimizar seus retornos.",
      date: todayStr,
      updatedAt: new Date().toISOString()
    },
    {
      id: "pred_4",
      type: "dezena",
      title: "Dezenas Recomendadas",
      numbers: ["61", "57", "08", "64"],
      content: "A dezena 61 do Leão está com alto índice de atração na tabela de hoje.",
      date: todayStr,
      updatedAt: new Date().toISOString()
    }
  ];

  const defaultResults: LotteryResult[] = [
    {
      id: "res_rio_ptm_today",
      date: todayStr,
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
      date: todayStr,
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
    },
    // Adding some Look and L-BR for history
    {
      id: "res_look_pt_yesterday",
      date: "2026-06-11",
      lottery: "look",
      drawName: "PTM",
      rows: [
        { pos: "1º", prize: "9812", group: "03", animal: "Burro" },
        { pos: "2º", prize: "5544", group: "11", animal: "Cavalo" },
        { pos: "3º", prize: "1233", group: "09", animal: "Cobra" },
        { pos: "4º", prize: "4090", group: "23", animal: "Urso" },
        { pos: "5º", prize: "0011", group: "03", animal: "Burro" },
        { pos: "6º", prize: "0690", group: "23", animal: "Urso" },
        { pos: "7º", prize: "118", group: "05", animal: "Cachorro" }
      ]
    }
  ];

  const defaultArticles: Article[] = [
    {
      id: "art_1",
      title: "Como Calcular as Puxadas do Jogo do Bicho",
      slug: "como-calcular-as-puxadas-do-jogo-do-bicho",
      summary: "Aprenda a clássica estratégia matemática das puxadas e veja quais animais mais atraem outros nas extrações diárias.",
      content: `<p>A 'tabela da puxada' é uma das técnicas mais respeitadas pelos apostadores do mercado de loterias alternativas brasileiras. A premissa é simples: quando um determinado bicho sai no primeiro prêmio, ele tem uma tendência matemática de 'puxar' outros quatro bichos nos sorteios seguintes do mesmo dia e do dia seguinte.</p>
<h4>Exemplo Prático do Leão (Grupo 16)</h4>
<p>O Leão, representado pelas dezenas 61, 62, 63 e 64, é uma das figuras mais emblemáticas. Tradicionalmente, as puxadas consagradas do Leão incluem:</p>
<ul>
  <li>Galo (Grupo 13)</li>
  <li>Jacaré (Grupo 15)</li>
  <li>Cachorro (Grupo 05)</li>
  <li>Elefante (Grupo 12)</li>
</ul>
<p>Neste artigo, detalhamos como estruturar um fechamento de Duque de Grupo baseado nas duplas dessas puxadas para apostar de forma inteligente. Nunca faça apostas aleatórias, utilize o método lógico!</p>`,
      category: "Dicas & Estratégias",
      tags: ["Puxadas", "Estratégia", "Iniciantes"],
      image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600",
      author: "Professor Bicho",
      createdAt: todayStr,
      comments: [
        { id: "c_1", username: "Rodrigo Alvez", text: "Ótima explicação, fiz o jogo hoje e deu certo!", date: "2026-06-12" }
      ]
    },
    {
      id: "art_2",
      title: "A Diferença entre Centena Cercada e Centena Seca",
      slug: "diferenca-centena-cercada-seca",
      summary: "Entenda o fator multiplicador do retorno e como distribuir suas apostas do 1° ao 5° prêmio para mitigar riscos.",
      content: `<p>Muitos novatos perdem dinheiro no Jogo do Bicho por não compreenderem as taxas de pagamento de cada modalidade. Enquanto a <strong>Centena Seca</strong> (que paga se o número sair exatamente na primeira posição) rende cerca de 500 para 1, as apostas denominadas <strong>Centena Invertida ou Cercada do 1º ao 5º</strong> reduzem o multiplicador mas garantem ganho recorrente.</p>
<p>Ao cercar sua aposta, você divide o valor jogado entre as cinco primeiras linhas do sorteio. Portanto, se você apostar R$ 5,00 cercados do 1º ao 5º, cada prêmio receberá o equivalente a R$ 1,00, mantendo sua diversificação saudável e resguardando seu capital.</p>`,
      category: "Regras Básicas",
      tags: ["Centena", "Invertida", "Dicas"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
      author: "Professor Bicho",
      createdAt: todayStr,
      comments: []
    }
  ];

  const defaultAds: Ad[] = [
    {
      id: "ad_top",
      title: "Anúncio do Topo - Planilha Exclusiva",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      linkUrl: "#produtos",
      position: "top_banner",
      isActive: true,
      clicks: 12
    },
    {
      id: "ad_sidebar",
      title: "Anúncio Lateral - Robô Bicho Inteligente",
      imageUrl: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&q=80&w=300",
      linkUrl: "#produtos",
      position: "sidebar",
      isActive: true,
      clicks: 5
    }
  ];

  const defaultTestimonials: Testimonial[] = [
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

  const defaultSettings: SystemSetting = {
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

  return {
    users: defaultUsers,
    products: defaultProducts,
    orders: [],
    predictions: defaultPredictions,
    results: defaultResults,
    articles: defaultArticles,
    ads: defaultAds,
    testimonials: defaultTestimonials,
    settings: defaultSettings
  };
}

// LowDb style simple file controller
export class AppDb {
  private static instance: DatabaseSchema | null = null;

  public static load(): DatabaseSchema {
    if (this.instance) {
      return this.instance;
    }

    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(DB_PATH)) {
      const data = getInitialData();
      this.saveData(data);
      this.instance = data;
      return data;
    }

    try {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const data = JSON.parse(raw);
      // Ensure essential fields exist
      if (!data.users || !data.products) {
        throw new Error("Invalid json format");
      }
      this.instance = data;
      return data;
    } catch (e) {
      console.error("Failed to load local DB, resetting to defaults...", e);
      const data = getInitialData();
      this.saveData(data);
      this.instance = data;
      return data;
    }
  }

  private static saveData(data: DatabaseSchema) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  public static save() {
    if (this.instance) {
      this.saveData(this.instance);
    }
  }

  // Auth Operations
  public static findUserByEmail(email: string): User | undefined {
    const db = this.load();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public static createUser(user: User): User {
    const db = this.load();
    db.users.push(user);
    this.save();
    return user;
  }

  public static updateUser(id: string, updates: Partial<User>): User | null {
    const db = this.load();
    const idx = db.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...updates };
    this.save();
    return db.users[idx];
  }

  // Product Operations
  public static getProducts(): Product[] {
    const db = this.load();
    return db.products;
  }

  public static createProduct(product: Product): Product {
    const db = this.load();
    db.products.push(product);
    this.save();
    return product;
  }

  public static updateProduct(id: string, updates: Partial<Product>): Product | null {
    const db = this.load();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    db.products[idx] = { ...db.products[idx], ...updates } as Product;
    this.save();
    return db.products[idx];
  }

  public static deleteProduct(id: string): boolean {
    const db = this.load();
    const lenBefore = db.products.length;
    db.products = db.products.filter(p => p.id !== id);
    this.save();
    return db.products.length < lenBefore;
  }

  // Order Operations
  public static getOrders(): Order[] {
    const db = this.load();
    return db.orders;
  }

  public static createOrder(order: Order): Order {
    const db = this.load();
    db.orders.push(order);
    this.save();
    return order;
  }

  public static updateOrder(id: string, updates: Partial<Order>): Order | null {
    const db = this.load();
    const idx = db.orders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    db.orders[idx] = { ...db.orders[idx], ...updates } as Order;
    this.save();
    return db.orders[idx];
  }

  // Predictions
  public static getPredictions(): Prediction[] {
    const db = this.load();
    return db.predictions;
  }

  public static setPredictions(predictions: Prediction[]): void {
    const db = this.load();
    db.predictions = predictions;
    this.save();
  }

  public static updatePrediction(id: string, updates: Partial<Prediction>): Prediction | null {
    const db = this.load();
    const idx = db.predictions.findIndex(p => p.id === id);
    if (idx === -1) return null;
    db.predictions[idx] = { ...db.predictions[idx], ...updates } as Prediction;
    this.save();
    return db.predictions[idx];
  }

  public static createPrediction(pred: Prediction): Prediction {
    const db = this.load();
    db.predictions.push(pred);
    this.save();
    return pred;
  }

  public static deletePrediction(id: string): boolean {
    const db = this.load();
    const initialLen = db.predictions.length;
    db.predictions = db.predictions.filter(p => p.id !== id);
    this.save();
    return db.predictions.length < initialLen;
  }

  // Lottery Results
  public static getResults(): LotteryResult[] {
    const db = this.load();
    return db.results;
  }

  public static createResult(result: LotteryResult): LotteryResult {
    const db = this.load();
    db.results.push(result);
    this.save();
    return result;
  }

  public static updateResult(id: string, updates: Partial<LotteryResult>): LotteryResult | null {
    const db = this.load();
    const idx = db.results.findIndex(r => r.id === id);
    if (idx === -1) return null;
    db.results[idx] = { ...db.results[idx], ...updates } as LotteryResult;
    this.save();
    return db.results[idx];
  }

  public static deleteResult(id: string): boolean {
    const db = this.load();
    const lenBefore = db.results.length;
    db.results = db.results.filter(r => r.id !== id);
    this.save();
    return db.results.length < lenBefore;
  }

  // Articles
  public static getArticles(): Article[] {
    const db = this.load();
    return db.articles;
  }

  public static createArticle(art: Article): Article {
    const db = this.load();
    db.articles.push(art);
    this.save();
    return art;
  }

  public static updateArticle(id: string, updates: Partial<Article>): Article | null {
    const db = this.load();
    const idx = db.articles.findIndex(a => a.id === id);
    if (idx === -1) return null;
    db.articles[idx] = { ...db.articles[idx], ...updates } as Article;
    this.save();
    return db.articles[idx];
  }

  public static deleteArticle(id: string): boolean {
    const db = this.load();
    const lenBefore = db.articles.length;
    db.articles = db.articles.filter(a => a.id !== id);
    this.save();
    return db.articles.length < lenBefore;
  }

  // Ads
  public static getAds(): Ad[] {
    const db = this.load();
    return db.ads;
  }

  public static createAd(ad: Ad): Ad {
    const db = this.load();
    db.ads.push(ad);
    this.save();
    return ad;
  }

  public static updateAd(id: string, updates: Partial<Ad>): Ad | null {
    const db = this.load();
    const idx = db.ads.findIndex(a => a.id === id);
    if (idx === -1) return null;
    db.ads[idx] = { ...db.ads[idx], ...updates } as Ad;
    this.save();
    return db.ads[idx];
  }

  public static deleteAd(id: string): boolean {
    const db = this.load();
    const lenBefore = db.ads.length;
    db.ads = db.ads.filter(a => a.id !== id);
    this.save();
    return db.ads.length < lenBefore;
  }

  // Testimonials
  public static getTestimonials(): Testimonial[] {
    const db = this.load();
    return db.testimonials;
  }

  public static createTestimonial(t: Testimonial): Testimonial {
    const db = this.load();
    db.testimonials.push(t);
    this.save();
    return t;
  }

  public static updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const db = this.load();
    const idx = db.testimonials.findIndex(t => t.id === id);
    if (idx === -1) return null;
    db.testimonials[idx] = { ...db.testimonials[idx], ...updates } as Testimonial;
    this.save();
    return db.testimonials[idx];
  }

  public static deleteTestimonial(id: string): boolean {
    const db = this.load();
    const len = db.testimonials.length;
    db.testimonials = db.testimonials.filter(t => t.id !== id);
    this.save();
    return db.testimonials.length < len;
  }

  // Settings
  public static getSettings(): SystemSetting {
    const db = this.load();
    return db.settings;
  }

  public static updateSettings(updates: Partial<SystemSetting>): SystemSetting {
    const db = this.load();
    db.settings = { ...db.settings, ...updates };
    this.save();
    return db.settings;
  }
}
