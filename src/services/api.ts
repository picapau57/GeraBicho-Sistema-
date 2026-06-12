/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  User,
  Product,
  Order,
  Prediction,
  LotteryResult,
  Article,
  Ad,
  Testimonial,
  SystemSetting
} from "../types";

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

export const api = {
  // Authentication
  async login(email: string, password: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao fazer login");
    localStorage.setItem("bicho_jwt_token", data.token);
    return data;
  },

  async register(name: string, email: string, password: string) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao registrar conta");
    localStorage.setItem("bicho_jwt_token", data.token);
    return data;
  },

  async getMe(): Promise<User> {
    const res = await fetch("/api/auth/me", {
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Sessão inválida");
    return data;
  },

  logout() {
    localStorage.removeItem("bicho_jwt_token");
  },

  // Products
  async getProducts(): Promise<Product[]> {
    const res = await fetch("/api/products");
    return res.json();
  },

  async getProductById(id: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async createProduct(prod: Partial<Product>): Promise<Product> {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(prod)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateProduct(id: string, prod: Partial<Product>): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(prod)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  },

  async addProductReview(id: string, rating: number, comment: string): Promise<Product> {
    const res = await fetch(`/api/products/${id}/review`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ rating, comment })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
    return res.json();
  },

  // Predictions (Palpites)
  async getPredictions(): Promise<Prediction[]> {
    const res = await fetch("/api/predictions");
    return res.json();
  },

  async createPrediction(pred: Partial<Prediction>): Promise<Prediction> {
    const res = await fetch("/api/predictions", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(pred)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updatePrediction(id: string, pred: Partial<Prediction>): Promise<Prediction> {
    const res = await fetch(`/api/predictions/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(pred)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deletePrediction(id: string): Promise<void> {
    const res = await fetch(`/api/predictions/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  },

  // Results & Stats
  async getResults(date?: string, lottery?: string): Promise<LotteryResult[]> {
    let url = "/api/results";
    const params: string[] = [];
    if (date) params.push(`date=${date}`);
    if (lottery) params.push(`lottery=${lottery}`);
    if (params.length > 0) url += "?" + params.join("&");

    const res = await fetch(url);
    return res.json();
  },

  async getStats(): Promise<{
    frequentes: { animal: string; group: string; count: number }[];
    atrasados: { animal: string; group: string; daysDelayed: number }[];
    tendencias: { animal: string; group: string; reason: string }[];
  }> {
    const res = await fetch("/api/results/stats");
    return res.json();
  },

  async createResult(result: Partial<LotteryResult>): Promise<LotteryResult> {
    const res = await fetch("/api/results", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(result)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateResult(id: string, result: Partial<LotteryResult>): Promise<LotteryResult> {
    const res = await fetch(`/api/results/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(result)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteResult(id: string): Promise<void> {
    const res = await fetch(`/api/results/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  },

  // Orders & Simulated payments
  async createOrder(productIds: string[]): Promise<Order> {
    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ productIds })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login necessário para efetuar compras.");
    return data;
  },

  async getMyOrders(): Promise<Order[]> {
    const res = await fetch("/api/orders/my-orders", {
      headers: getHeaders()
    });
    return res.json();
  },

  async getAllOrders(): Promise<Order[]> {
    const res = await fetch("/api/orders/all", {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Acesso negado para listar pedidos");
    return res.json();
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async simulatePixPayment(id: string): Promise<Order> {
    const res = await fetch(`/api/orders/simulate-pix/${id}`, {
      method: "POST",
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.order;
  },

  // Articles / Blog
  async getArticles(): Promise<Article[]> {
    const res = await fetch("/api/articles");
    return res.json();
  },

  async getArticleBySlug(slug: string): Promise<Article> {
    const res = await fetch(`/api/articles/${slug}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async createArticle(art: Partial<Article>): Promise<Article> {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(art)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateArticle(id: string, art: Partial<Article>): Promise<Article> {
    const res = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(art)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteArticle(id: string): Promise<void> {
    const res = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  },

  async addArticleComment(id: string, username: string, text: string): Promise<Article> {
    const res = await fetch(`/api/articles/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, text })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Advertisements
  async getAds(): Promise<Ad[]> {
    const res = await fetch("/api/ads");
    return res.json();
  },

  async getAllAds(): Promise<Ad[]> {
    const res = await fetch("/api/ads/all", {
      headers: getHeaders()
    });
    return res.json();
  },

  async triggerAdClick(id: string) {
    fetch(`/api/ads/${id}/click`, { method: "POST" });
  },

  async createAd(ad: Partial<Ad>): Promise<Ad> {
    const res = await fetch("/api/ads", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(ad)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateAd(id: string, ad: Partial<Ad>): Promise<Ad> {
    const res = await fetch(`/api/ads/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(ad)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteAd(id: string): Promise<void> {
    const res = await fetch(`/api/ads/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    const res = await fetch("/api/testimonials");
    return res.json();
  },

  async createTestimonial(t: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(t)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateTestimonial(id: string, t: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(t)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteTestimonial(id: string): Promise<void> {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error);
    }
  },

  // Settings
  async getSettings(): Promise<SystemSetting> {
    const res = await fetch("/api/settings");
    return res.json();
  },

  async getPrivateSettings(): Promise<SystemSetting> {
    const res = await fetch("/api/settings/private", {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Acesso de administrador necessário");
    return res.json();
  },

  async updateSettings(settings: Partial<SystemSetting>): Promise<SystemSetting> {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(settings)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
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
