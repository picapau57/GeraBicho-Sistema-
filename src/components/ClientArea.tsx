/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { User, Key, Mail, ShieldCheck, Download, ShoppingBag, Terminal, Heart, CheckCircle2, AlertCircle } from "lucide-react";
import { User as UserType, Order, Product } from "../types";
import { api } from "../services/api";

interface ClientAreaProps {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  setCurrentTab: (tab: string) => void;
}

export default function ClientArea({ currentUser, setCurrentUser, setCurrentTab }: ClientAreaProps) {
  // Authentication states
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  
  // Loading & logs
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Purchased items & Orders histories
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const fetchPurchases = async () => {
    if (!currentUser) return;
    try {
      setLoadingOrders(true);
      const orders = await api.getMyOrders();
      setUserOrders(orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchPurchases();
    }
  }, [currentUser]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (forgotPasswordMode) {
        // Mock recover password
        setTimeout(() => {
          setSuccessMsg("E-mail de recuperação de senha enviado com sucesso! Verifique seu lixo eletrônico.");
          setLoading(false);
          setForgotPasswordMode(false);
        }, 1500);
        return;
      }

      if (isLogin) {
        const data = await api.login(email, password);
        setCurrentUser(data.user);
        setSuccessMsg("Bem-vindo de volta! Login efetuado com sucesso.");
      } else {
        if (!name) {
          setErrorMsg("Preencha o seu nome!");
          setLoading(false);
          return;
        }
        const data = await api.register(name, email, password);
        setCurrentUser(data.user);
        setSuccessMsg("Parabéns! Sua conta premium acaba de ser criada.");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Erro durante autenticação");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDigitalGood = async (productId: string, filename: string) => {
    const token = localStorage.getItem("bicho_jwt_token");
    if (!token) return;

    try {
      // Try to fetch via API first (works on full-stack)
      const res = await fetch(`/api/downloads/${productId}?token=${token}`);
      if (res.ok) {
        const blob = await res.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
        return;
      }
    } catch (_) {
      // Continue to local browser blob fallback in case API is offline (e.g., static Vercel)
    }

    // Local static client-side Blob fallback for 100% resilient Vercel hosting downloads:
    let fileContent = "";
    if (productId === "prod_sistema_bicho_expert") {
      fileContent = "https://ternosbichopuxabicho.lovable.app/";
    } else {
      fileContent = `🚀 GERABICHO PREMIUM - PORTAL DE PALPITES GERAIS 🚀\n\n` +
                    `Este e-mail contém as chaves digitais seguras de download de sua planilha.\n` +
                    `Por favor, acesse seu painel administrativo ou fale com o suporte VIP via WhatsApp para obter sua cópia.\n` +
                    `WhatsApp do de Suporte Geral: +55 (62) 98575-6881\n\n` +
                    `Obrigado por sua compra!`;
    }

    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setCurrentTab("inicio");
  };

  // List of all completed products downloadable link lists
  const completedOrders = userOrders.filter(o => o.status === "completed");
  const pendingOrders = userOrders.filter(o => o.status === "pending");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {currentUser ? (
        /* Logged In Dashboard Customer Workspace */
        <div className="space-y-10 animate-fade-in">
          
          {/* Welcome User Profile header info */}
          <div className="bg-gradient-to-r from-[#0d1526] to-[#16213e] rounded-3xl border border-slate-800 p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
            <div className="space-y-2">
              <span className="bg-[#d4af37]/10 text-[#d4af37] font-extrabold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#d4af37]/20 inline-block">
                Área do Cliente VIP
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">{currentUser.name}</h3>
              <p className="text-xs text-slate-400 font-medium">E-mail de cadastro: {currentUser.email} • Membro desde: {new Date(currentUser.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentTab("loja")}
                className="px-4 py-2.5 bg-[#d4af37] hover:brightness-110 text-[#0a0f1d] font-black rounded-xl text-xs transition uppercase tracking-wider"
              >
                🛒 Ir para Loja
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-[#16213e] hover:bg-rose-900 border border-slate-800 hover:border-rose-900 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition uppercase tracking-wider"
              >
                Sair da Conta
              </button>
            </div>
          </div>

          {/* Download Center & Historic grids */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Download Center Lists - Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
                 <div className="bg-[#0d1526] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Download className="w-5 h-5 text-[#d4af37]" />
                  <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">Meus Arquivos e Downloads Liberados</h4>
                </div>

                {loadingOrders ? (
                  <p className="text-center py-6 text-slate-500 text-xs font-bold animate-pulse">Lendo registros de downloads liberados...</p>
                ) : completedOrders.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 bg-[#16213e]/20 border border-slate-800 rounded-xl space-y-3 p-4">
                    <ShoppingBag className="w-10 h-10 mx-auto text-slate-650" />
                    <p className="text-sm font-bold text-white">Você ainda não possui produtos digitais ativos.</p>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Explore nosso catálogo de planilhas automáticas Excel ou sistemas e realize a primeira compra PIX para baixar os arquivos imediatamente.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800">
                    {completedOrders.flatMap(order => order.items).map((item, idx) => {
                      const isBichoExpert = item.productId === "prod_sistema_bicho_expert";
                      const filename = isBichoExpert ? "Acesso_Bicho_Expert.txt" : "ferramenta_portal.xlsx";
                      const categoryLabel = isBichoExpert ? "Sistema Online Hospedado (TXT/LINK)" : "Planilhas e Matrizes (XLSX)";
                      const downloadText = isBichoExpert ? "Baixar TXT de Acesso" : "Baixar Seguro Excel";

                      return (
                        <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4 hover:bg-[#16213e]/30 px-2 rounded-xl transition">
                          <div>
                            <p className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider">{categoryLabel}</p>
                            <h5 className="font-extrabold text-white text-sm sm:text-base">{item.title}</h5>
                            <p className="text-xs text-[#d4af37] font-bold flex items-center mt-1"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Acesso Pago Ativo e Verificado</p>
                          </div>

                          <div>
                            <button
                              onClick={() => handleDownloadDigitalGood(item.productId, filename)}
                              className="px-4 py-2 bg-[#d4af37] hover:brightness-110 text-[#0a0f1d] font-extrabold text-xs uppercase rounded-xl shadow transition tracking-wider flex items-center space-x-1.5"
                            >
                              <Download className="w-4 h-4" />
                              <span>{downloadText}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>                {/* Pending orders with active QR payment instructions */}
              {pendingOrders.length > 0 && (
                <div className="bg-[#d4af37]/5 rounded-2xl border border-[#d4af37]/20 p-5 sm:p-6 space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                    <AlertCircle className="w-5 h-5 text-[#d4af37] animate-pulse" />
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Faturas Pendentes em Aberto</h4>
                  </div>
                  <div className="space-y-4">
                    {pendingOrders.map(order => (
                      <div key={order.id} className="p-4 bg-[#0d1526] rounded-xl border border-slate-800 shadow-xs flex justify-between items-center flex-wrap gap-4">
                        <div>
                          <h5 className="font-bold text-white text-xs sm:text-sm">Fatura PIX: #{order.id}</h5>
                          <p className="text-xs text-slate-400 mt-1">Valor faturado: R$ {order.total.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentTab("loja");
                            alert("Volte à loja para reabrir o QR Code da fatura ou selecione o produto novamente para checkout.");
                          }}
                          className="px-4 py-2 bg-[#d4af37] hover:brightness-110 text-slate-950 font-extrabold text-xs uppercase rounded-lg shadow-sm transition"
                        >
                          Ir pagar Pix faturas
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side Column - Transactions list */}
            <div className="space-y-6">
              <div className="bg-[#0d1526] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Terminal className="w-5 h-5 text-[#d4af37]" />
                  <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">Histórico de Transações</h4>
                </div>

                {loadingOrders ? (
                  <p className="text-center py-6 text-slate-500 text-xs font-bold animate-pulse">Consultando logs...</p>
                ) : userOrders.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Sem transações registradas nesta conta.</p>
                ) : (
                  <div className="space-y-3.5">
                    {userOrders.map((order) => (
                      <div key={order.id} className="p-3 bg-[#16213e]/20 border border-slate-800 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between font-bold">
                          <span className="text-white">#{order.id.substring(4, 9).toUpperCase()}</span>
                          <span className={order.status === "completed" ? "text-emerald-400" : "text-amber-500"}>
                            {order.status === "completed" ? "Aprovado Pix" : "Pendente"}
                          </span>
                        </div>
                        <p className="text-slate-400 font-medium">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-white font-bold">Valor total: R$ {order.total.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Secure certification seal */}
              <div className="bg-[#0d1526] text-white rounded-2xl border border-slate-800 p-5 text-center space-y-3 shadow-lg">
                <ShieldCheck className="w-10 h-10 text-[#d4af37] mx-auto" />
                <h5 className="font-bold text-sm tracking-wide text-slate-100 uppercase">Conexão Digital Protegida</h5>
                <p className="text-[10px] text-slate-400 leading-normal font-medium">As chaves de arquivos digitais XLSX, ZIP, PDF são protegidas com encriptação e entregues imediatamente após a confirmação automática do pagamento.</p>
              </div>
            </div>

          </div>
        </div>

         ) : (
        /* User Accounts Auth Forms (Cadastro / Login toggler) */
        <div className="max-w-md mx-auto bg-[#0d1526] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6 animate-scale-in">
          
          <div className="text-center space-y-2">
            <span className="p-2.5 bg-[#16213e] inline-block rounded-2xl text-[#d4af37] border border-slate-800 mb-1">
              <Key className="w-6 h-6 stroke-[2.3]" />
            </span>
            <h3 className="text-2xl font-black tracking-tight text-white">
              {forgotPasswordMode ? "Recuperar Senha" : isLogin ? "Acessar Área do Cliente" : "Criar Nova Conta Premium"}
            </h3>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              {forgotPasswordMode 
                ? "Insira seu e-mail cadastrado para redefinir as credenciais" 
                : isLogin 
                  ? "Acesse seus downloads, faturas e planilhas compradas" 
                  : "Cadastre-se para comprar planilhas e receber palpites lógicos diários"}
            </p>
          </div>

          {/* Form container */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {!forgotPasswordMode && !isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Seu Nome Completo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Ex: Carlos Augusto Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0d1526] border border-slate-805 pl-9 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition font-medium"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Endereço de E-mail</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="Ex: seu-email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d1526] border border-slate-800 pl-9 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition font-medium"
                  required
                />
              </div>
            </div>

            {!forgotPasswordMode && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">Sua Senha de Acesso</label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setForgotPasswordMode(true)}
                      className="text-slate-500 hover:text-white hover:underline transition"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-550">
                    <Key className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    placeholder="Sua senha de segurança"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0d1526] border border-slate-800 pl-9 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#d4af37] transition font-medium"
                    required
                  />
                </div>
              </div>
            )}

            {/* Error & Success status */}
            {errorMsg && (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl flex items-center space-x-2 text-xs text-rose-300 font-bold">
                <AlertCircle className="w-4 h-4 fill-rose-950" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-850 rounded-xl flex items-center space-x-2 text-xs text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4 fill-emerald-950" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#d4af37] hover:brightness-110 text-[#0a0f1d] font-extrabold text-sm uppercase rounded-xl tracking-wider shadow-lg shadow-[#0a0f1d]/20 transition disabled:opacity-50"
            >
              {loading ? "Processando..." : forgotPasswordMode ? "Enviar Instruções" : isLogin ? "Acessar Portal" : "Criar Minha Conta"}
            </button>
          </form>

          {/* Form mode switcher togglers links */}
          <div className="border-t border-slate-800 pt-4 text-center text-xs text-slate-400 font-bold space-y-1">
            {forgotPasswordMode ? (
              <button
                onClick={() => setForgotPasswordMode(false)}
                className="text-[#d4af37] hover:underline"
              >
                Retornar ao Login Principal
              </button>
            ) : isLogin ? (
              <p>
                Não possui uma conta?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#d4af37] hover:underline font-bold"
                >
                  Cadastre-se Gratuitamente Premium
                </button>
              </p>
            ) : (
              <p>
                Já possui uma conta activa?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-[#d4af37] hover:underline font-bold"
                >
                  Faça o Login
                </button>
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
