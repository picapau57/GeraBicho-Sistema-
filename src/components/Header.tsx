/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Trophy, Calendar, ShoppingBag, BookOpen, User, Settings, LogOut, Menu, X } from "lucide-react";
import { User as UserType } from "../types";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserType | null;
  onLogout: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  currentUser,
  onLogout,
  cartCount,
  onOpenCart
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "inicio", label: "Início", icon: Trophy },
    { id: "palpites", label: "Palpitos", icon: Sparkles },
    { id: "resultados", label: "Resultados e Estatísticas", icon: Calendar },
    { id: "loja", label: "Loja Virtual", icon: ShoppingBag },
    { id: "blog", label: "Blog", icon: BookOpen }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d1526] border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick("inicio")} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#aa8a2e] rounded-xl flex items-center justify-center text-[#0a0f1d] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-200 group-hover:scale-105">
              <Trophy className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Gera<span className="text-[#d4af37]">Bicho</span>
              </span>
              <span className="hidden sm:inline-block ml-1.5 font-semibold text-[10px] tracking-widest text-[#d4af37] uppercase bg-[#d4af37]/10 px-2.5 py-0.5 rounded-full border border-[#d4af37]/20">
                Premium
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === "palpites" && currentTab.startsWith("palpites-"));
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-[#d4af37] text-[#0a0f1d] shadow-md shadow-[#d4af37]/20 font-bold scale-[1.02]"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 bg-slate-800/40 hover:bg-slate-800 text-[#d4af37] rounded-xl border border-slate-700/50 transition"
              title="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 font-black text-xs w-5.5 h-5.5 rounded-full flex items-center justify-center border border-slate-900 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Controls */}
            {currentUser && currentUser.role === "admin" && (
              <button
                id="admin-btn"
                onClick={() => setCurrentTab("admin")}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl border border-rose-500/30 text-xs font-bold uppercase transition`}
              >
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>Painel Admin</span>
              </button>
            )}

            {/* Profile / Login */}
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-800/40 pl-3.5 pr-2.5 py-1.5 rounded-xl border border-slate-700/50">
                <div 
                  onClick={() => setCurrentTab("cliente")}
                  className="cursor-pointer text-right group"
                >
                  <p className="text-xs text-slate-400 group-hover:text-amber-400 transition">Área do Cliente</p>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-white max-w-[120px] truncate">{currentUser.name}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition"
                  title="Sair da Conta"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="login-btn"
                onClick={() => setCurrentTab("cliente")}
                className="flex items-center space-x-2 px-5 py-2.5 bg-[#d4af37] text-[#0a0f1d] rounded-xl font-extrabold shadow-md hover:brightness-110 text-sm transition"
              >
                <User className="w-4 h-4" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Mobile Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#16213e]/80 border border-slate-700/50 text-[#d4af37] rounded-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-[#16213e]/80 hover:bg-[#16213e] rounded-xl border border-slate-700/50 text-slate-300 hover:text-white transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1526]/95 border-b border-slate-800 p-4 space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg text-left text-sm font-semibold ${
                    isActive
                      ? "bg-[#d4af37] text-[#0a0f1d] font-bold"
                      : "text-slate-350 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {currentUser && currentUser.role === "admin" && (
              <button
                onClick={() => handleNavClick("admin")}
                className="flex items-center space-x-2 p-3 bg-rose-950/45 text-rose-300 hover:bg-rose-905 rounded-lg text-left text-sm font-bold uppercase transition"
              >
                <Settings className="w-5 h-5" />
                <span>Painel Admin Geral</span>
              </button>
            )}

            {currentUser ? (
              <div className="border-t border-slate-800/80 pt-3 mt-1 space-y-3">
                <div className="flex items-center justify-between px-3">
                  <div onClick={() => handleNavClick("cliente")} className="cursor-pointer">
                    <p className="text-xs text-slate-500">Minha Conta</p>
                    <p className="text-sm font-bold text-white">{currentUser.name}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 rounded-lg text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("cliente")}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#d4af37] text-[#0a0f1d] font-extrabold rounded-lg mt-2 shadow-lg"
              >
                <User className="w-4 h-4" />
                <span>Entrar / Cadastrar Conta</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
