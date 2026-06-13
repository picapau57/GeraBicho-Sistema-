/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer"
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: "planilhas" | "sistemas" | "aplicativos" | "pdfs" | "cursos" | "estrategias";
  price: number;
  discountPrice?: number;
  fileType: "XLSX" | "PDF" | "ZIP" | "EXE" | "APK" | "DOCX" | "RAR" | "TXT";
  fileName: string;
  fileSize: string;
  downloadUrl?: string; // local secure path
  savedName?: string; // name of real file inside uploads/
  rating: number;
  salesCount: number;
  image: string;
  features: string[];
  reviews: ProductReview[];
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  total: number;
  status: "pending" | "completed" | "cancelled";
  paymentMethod: "pix";
  paymentDetails?: {
    pixQrCode: string;
    pixCopiarColar: string;
    paymentId: string;
  };
  items: OrderItem[];
  createdAt: string;
}

export type PredictionType =
  | "palpitao"
  | "milhar"
  | "centena"
  | "dezena"
  | "grupo"
  | "terno_grupo"
  | "terno_dezena"
  | "duque_grupo"
  | "duque_dezena"
  | "cercamento"
  | "passe"
  | "combinacoes";

export interface Prediction {
  id: string;
  type: PredictionType;
  title: string;
  numbers: string[];
  animals?: string[];
  content: string; // Dicas e orientações
  date: string; // YYYY-MM-DD
  updatedAt: string;
}

export interface ResultRow {
  pos: string; // "1º", "2º", ..., "7º"
  prize: string; // e.g., "5432"
  group: string; // e.g., "08"
  animal: string; // e.g., "Borboleta"
}

export interface LotteryResult {
  id: string;
  date: string; // YYYY-MM-DD
  lottery: "rio" | "look" | "nacional" | "lbr";
  drawName: "PTM" | "PT" | "PTV" | "PTN" | "COR" | "FED"; // PTM, PT, etc.
  rows: ResultRow[];
}

export interface ArticleComment {
  id: string;
  username: string;
  text: string;
  date: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  createdAt: string;
  comments: ArticleComment[];
}

export interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: "top_banner" | "sidebar" | "content_mid" | "footer_banner" | "popup";
  isActive: boolean;
  clicks: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface SystemSetting {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  supportWhatsapp: string;
  rulesText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  showPopupAd: boolean;
  mercadoPagoToken: string;
}
