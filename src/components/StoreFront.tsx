/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ShoppingBag, FileText, Check, Star, ShieldCheck, CreditCard, Loader2, Download, RefreshCw } from "lucide-react";
import { Product, User, Order } from "../types";
import { api } from "../services/api";

interface StoreFrontProps {
  currentUser: User | null;
  onAddToCart: (product: Product) => void;
  cart: Product[];
  onOpenCart: () => void;
  setCurrentTab: (tab: string) => void;
}

export default function StoreFront({
  currentUser,
  onAddToCart,
  cart,
  onOpenCart,
  setCurrentTab
}: StoreFrontProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Checkout process states
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<Product | null>(null);
  const [checkoutOrder, setCheckoutOrder] = useState<Order | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Load products list
  const loadProductCatalog = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductCatalog();
  }, []);

  const handleBuyNow = async (prod: Product) => {
    if (!currentUser) {
      alert("Crie uma conta gratuita ou faça login para efetuar compras no portal.");
      setCurrentTab("cliente");
      return;
    }

    try {
      setIsCreatingOrder(true);
      setActiveCheckoutProduct(prod);
      setCheckoutOrder(null);
      setPaymentSuccess(false);

      // Create order in backend
      const order = await api.createOrder([prod.id]);
      setCheckoutOrder(order);
    } catch (e: any) {
      alert("Erro ao abrir checkout: " + e.message);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleSimulatePaymentApproval = async () => {
    if (!checkoutOrder) return;

    try {
      setIsSimulatingPayment(true);
      const updatedOrder = await api.simulatePixPayment(checkoutOrder.id);
      setCheckoutOrder(updatedOrder);
      setPaymentSuccess(true);
    } catch (e: any) {
      alert("Erro ao simular aprovação: " + e.message);
    } finally {
      setIsSimulatingPayment(false);
    }
  };

  const handleDownloadDigitalGood = (prodId: string, filename: string) => {
    const token = localStorage.getItem("bicho_jwt_token");
    if (!token) return;
    
    // Direct pipe trigger download preserving auth tokens
    const downloadUrl = `/api/downloads/${prodId}?token=${token}`;
    
    // Create hidden download linkage trigger which safely triggers standard raw file saves
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = [
    { id: "all", label: "Todos os Produtos" },
    { id: "planilhas", label: "📊 Planilhas Excel" },
    { id: "sistemas", label: "💻 Softwares e Sistemas" },
    { id: "aplicativos", label: "📱 Aplicativos APK" },
    { id: "pdfs", label: "📕 Ebooks & Manuais PDF" },
    { id: "cursos", label: "🎓 Vídeo-Cursos" },
    { id: "estrategias", label: "⚡ Estratégias Premium" }
  ];

  const filteredCatalog = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header summary */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Páginas de <span className="text-[#d4af37]">Ferramentas Digitais e Softwares</span>
        </h2>
        <p className="max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
          Otimize seus jogos de Centena, Milhar, Grupos cruzados ou Cercamento do 1º ao 5º. Baixe nossas planilhas automáticas, sistemas e aplicativos com aprovação de PIX imediata.
        </p>
      </div>

      {/* Categories Filter tab list */}
      <div className="flex flex-wrap gap-2.5 justify-center border-b border-slate-800 pb-6">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 ${
              selectedCategory === c.id
                ? "bg-[#d4af37] text-[#0a0f1d] shadow-lg shadow-[#0a0f1d] font-black"
                : "bg-[#16213e]/45 text-slate-300 border border-slate-800 hover:bg-[#16213e]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Product Grid Listings */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xs text-slate-400 font-bold uppercase">Carregando catálogo de ferramentas...</p>
        </div>
      ) : filteredCatalog.length === 0 ? (
        <div className="py-16 text-center text-slate-450 bg-[#0d1526] border border-slate-800 rounded-2xl max-w-md mx-auto">
          <ShoppingBag className="w-10 h-10 mx-auto text-slate-500 mb-3" />
          <p className="font-bold text-white">Nenhum produto cadastrado nesta categoria</p>
          <p className="text-xs text-slate-450 mt-1">Consulte outras categorias ou retorne mais tarde.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCatalog.map((prod) => {
            const hasDiscount = prod.discountPrice !== undefined;
            return (
              <div 
                key={prod.id} 
                className="bg-[#0d1526] rounded-2xl border border-slate-800 shadow-xl hover:brightness-105 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Cover image */}
                <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-800">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {hasDiscount && (
                    <span className="absolute top-4 right-4 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                      Oferta Limitada
                    </span>
                  )}
                  <span className="absolute bottom-4 left-4 bg-slate-900/95 text-[10px] text-[#d4af37] border border-slate-800 font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                    ⚡ {prod.fileType}
                  </span>
                </div>

                {/* Cover Details information */}
                <div className="p-5 sm:p-6 space-y-4 flex-1">
                  <div className="space-y-1">
                    <p className="text-[10px] text-[#d4af37]/80 font-bold uppercase tracking-widest">{prod.category}</p>
                    <h3 className="font-extrabold text-white text-base sm:text-lg leading-snug tracking-tight group-hover:text-[#d4af37] transition">
                      {prod.title}
                    </h3>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    <div className="flex text-[#d4af37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400">{prod.rating || "5.0"}</span>
                    <span className="text-slate-700 text-xs">•</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{prod.salesCount + 12} vendidos</span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-400 line-clamp-3">
                    {prod.description}
                  </p>

                  {/* Highlights features bullet points lists */}
                  {prod.features && prod.features.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {prod.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-slate-405 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-450 shrink-0 stroke-[2.5]" />
                          <span className="truncate text-slate-300">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom checkout columns action buttons */}
                <div className="px-5 py-4 bg-gradient-to-r from-[#10192e] to-[#0d1526] border-t border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    {hasDiscount ? (
                      <>
                        <p className="text-slate-500 text-xs line-through leading-none">R$ {prod.price.toFixed(2)}</p>
                        <p className="font-extrabold text-white text-xl tracking-tight">R$ {prod.discountPrice?.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="font-extrabold text-white text-lg tracking-tight">R$ {prod.price.toFixed(2)}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {/* Add to Cart button */}
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="p-2.5 bg-[#16213e] hover:bg-[#203056] text-[#d4af37] border border-slate-805/40 rounded-xl transition"
                      title="Adicionar ao Carrinho"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                    {/* Quick checkout */}
                    <button
                      id={`buy-${prod.id}`}
                      onClick={() => handleBuyNow(prod)}
                      className="px-4 py-2.5 bg-[#d4af37] hover:brightness-110 text-[#0a0f1d] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition"
                    >
                      Comprar Pix
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Instant Checkout Mercado Pago PIX Payment Modal drawer block */}
      {activeCheckoutProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0d1526] rounded-3xl max-w-lg w-full border border-slate-800 overflow-hidden shadow-2xl relative animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#16213e] to-[#0d1526] p-5 text-white flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 bg-[#d4af37]/10 text-[#d4af37] rounded-lg border border-[#d4af37]/20">
                  <CreditCard className="w-5 h-5" />
                </span>
                <span className="font-extrabold text-sm sm:text-base tracking-tight">Checkout Rápido Mercado Pago PIX</span>
              </div>
              <button
                onClick={() => setActiveCheckoutProduct(null)}
                className="text-slate-400 hover:text-white px-2.5 py-1 bg-[#16213e] rounded-lg text-xs"
              >
                Voltar
              </button>
            </div>

            {/* Modal Body checkout state renderers */}
            <div className="p-6 space-y-6">
              {isCreatingOrder ? (
                <div className="py-12 text-center space-y-3">
                  <Loader2 className="w-10 h-10 animate-spin text-[#d4af37] mx-auto" />
                  <p className="text-sm font-bold text-white">Iniciando transação em Mercado Pago...</p>
                  <p className="text-xs text-slate-450">Gerando QR Code Pix de Liberação única.</p>
                </div>
              ) : checkoutOrder ? (
                <div className="space-y-6">
                  {/* Summary Product card */}
                  <div className="p-4 bg-[#16213e]/40 rounded-2xl border border-slate-800 flex items-center space-x-3">
                    <img
                      src={activeCheckoutProduct.image}
                      alt={activeCheckoutProduct.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-slate-900"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{activeCheckoutProduct.fileType} • {activeCheckoutProduct.fileSize}</p>
                      <h4 className="font-extrabold text-sm text-white truncate">{activeCheckoutProduct.title}</h4>
                      <p className="text-xs font-bold text-[#d4af37]">Total a pagar: R$ {checkoutOrder.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {!paymentSuccess ? (
                    <div className="space-y-5 text-center">
                      <p className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                        Para pagar, escaneie o QR Code abaixo pelo aplicativo do seu banco ou copie a chave Pix Copiar e Colar.
                      </p>

                      {/* Pix QR code mock representation */}
                      <div className="p-3 bg-white border border-slate-800 rounded-2xl inline-block shadow-sm">
                        <img
                          src={checkoutOrder.paymentDetails?.pixQrCode}
                          alt="PIX QR Code"
                          className="w-48 h-48 mx-auto"
                        />
                      </div>

                      {/* Paste area click trigger key */}
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">PIX Copia e Cola Código</p>
                        <div className="flex items-center space-x-2 max-w-sm mx-auto bg-[#0d1526] border border-slate-850 p-2 rounded-xl text-center">
                          <input
                            type="text"
                            readOnly
                            value={checkoutOrder.paymentDetails?.pixCopiarColar}
                            className="text-xs text-slate-400 w-full bg-transparent border-0 outline-none select-all truncate font-mono font-bold"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(checkoutOrder.paymentDetails?.pixCopiarColar || "");
                              alert("Chave Pix copiada para a área de transferência!");
                            }}
                            className="bg-[#d4af37] text-slate-950 font-extrabold text-[10px] py-1.5 px-3 rounded-lg hover:brightness-110 uppercase"
                          >
                            Copiar
                          </button>
                        </div>
                      </div>

                      {/* Simulator Trigger */}
                      <div className="pt-2 border-t mt-4 space-y-3 bg-[#d4af37]/5 p-4 rounded-xl border border-[#d4af37]/25">
                        <p className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center justify-center space-x-1">
                          <span>🔧</span> <span>Painel de Simulação de Pagamento</span>
                        </p>
                        <p className="text-[11px] text-slate-300 leading-normal">
                          Como você está no ambiente de desenvolvimento, clique no botão para simular a confirmação imediata da API do Mercado Pago sem despesa real:
                        </p>
                        <button
                          onClick={handleSimulatePaymentApproval}
                          disabled={isSimulatingPayment}
                          className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
                        >
                          {isSimulatingPayment ? "Aprovando..." : "✅ SIMULAR CONFIRMAÇÃO DO PAGAMENTO"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5 text-center py-4 animate-scale-in">
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-extrabold text-xl text-white">Pagamento Aprovado com Sucesso!</h4>
                        <p className="text-xs text-slate-400">Obrigado! Sua compra está aprovada no Mercado Pago de forma instantânea.</p>
                      </div>

                      {/* Deliver digital goods secure uploader */}
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2 text-center max-w-sm mx-auto">
                        <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Arquivo Liberado para Download</p>
                        <p className="text-[11px] text-emerald-550 leading-tight">Os dados estão protegidos por tokens únicos e já foram liberados em seu histórico.</p>
                        <button
                          onClick={() => handleDownloadDigitalGood(activeCheckoutProduct.id, activeCheckoutProduct.fileName)}
                          className="w-full py-2.5 bg-emerald-600 text-white font-extrabold text-xs uppercase rounded-xl tracking-wider shadow hover:bg-emerald-700 transition flex items-center justify-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>BAIXAR ARQUIVO AGORA ({activeCheckoutProduct.fileName})</span>
                        </button>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setActiveCheckoutProduct(null);
                            setCurrentTab("cliente");
                          }}
                          className="text-xs font-bold text-slate-400 hover:text-white hover:underline transition"
                        >
                          Ir para Histórico na Área do Cliente →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Trust warning badge banner */}
                  <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span className="flex items-center text-emerald-400"><ShieldCheck className="w-3.5 h-3.5 mr-1" /> Mercado Pago Conexão Ativa</span>
                    <span>Pedido ID: {checkoutOrder.id}</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-red-400">Erro ao criar pedido. Tente novamente.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
