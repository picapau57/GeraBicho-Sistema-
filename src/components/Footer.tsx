/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PlayCircle, ShieldCheck, PhoneCall, Mail, MessageSquare } from "lucide-react";
import { SystemSetting } from "../types";

interface FooterProps {
  settings: SystemSetting;
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ settings, setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#0d1526] text-slate-400 border-t border-slate-800">
      {/* Top Footer Banner Info columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1 - Profile Description */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-tight text-white">
                Gera<span className="text-amber-400">Bicho</span>
              </span>
              <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/10">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Desenvolvemos as melhores ferramentas digitais de análise estatística, planilhas inteligentes de cercamento e palpites estruturados para maximizar sua intuição de forma lógica nos sorteios tradicionais.
            </p>
            <div className="flex space-x-3 text-slate-400 pt-1">
              <div className="p-2 hover:text-amber-400 hover:bg-slate-900 rounded-lg cursor-pointer transition">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="p-2 text-slate-500 text-xs flex items-center">
                Autotransações seguras SSL
              </div>
            </div>
          </div>

          {/* Col 2 - Pages Link */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Navegar no Portal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentTab("inicio")} className="hover:text-white hover:underline transition text-left">
                  Página Inicial
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("palpites")} className="hover:text-white hover:underline transition text-left">
                  Palpites Diários
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("resultados")} className="hover:text-white hover:underline transition text-left">
                  Histórico de Resultados
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("loja")} className="hover:text-white hover:underline transition text-left">
                  Planilhas e Softwares
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab("blog")} className="hover:text-white hover:underline transition text-left">
                  Blog e Vídeo-Aulas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 - Payment & Guarantee */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Meios de Pagamentos
            </h4>
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-slate-500">
                Integração direta protegida API Mercado Pago. Liberação de downloads imediata em tempo real em Pix.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-slate-900 border border-slate-800 text-white px-2.5 py-1 rounded font-black text-xs tracking-wider flex items-center space-x-1">
                  <span className="text-cyan-400">⚡</span> Pix Imediato
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded font-bold text-xs tracking-wide">
                  Mercado Pago
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded font-bold text-xs tracking-wide">
                  SSL Protegido
                </span>
              </div>
            </div>
          </div>

          {/* Col 4 - Contacts */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-2">
              Suporte ao Cliente
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center space-x-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hover:text-white transition">{settings.contactPhone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hover:text-white transition">{settings.contactEmail}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-bold">Atendimento VIP WhatsApp</p>
                  <a 
                    href={`https://wa.me/${settings.supportWhatsapp}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline inline-block mt-0.5"
                  >
                    Fale Direto Conosco
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Area */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] leading-relaxed text-slate-600">
          <p className="font-semibold text-slate-400 uppercase tracking-widest text-xs mb-3 flex items-center space-x-2">
            <span>Aviso Legal e Regras do Portal</span>
          </p>
          <p>
            {settings.rulesText}
          </p>
          <p className="mt-2.5">
            Ao navegar neste portal de dicas e palpites matemáticos, você declara estar ciente de que as mídias, planilhas e softwares comercializados são ferramentas lógicas e não representam garantias financeiras ou promessas de lucros absolutos. Os fechamentos reduzem os custos operacionais do desdobramento de volantes, ampliando as possibilidades empíricas de combinações correspondentes.
          </p>
        </div>

        {/* Bottom clean footer */}
        <div className="mt-8 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} GeraBicho Premium. Todos os direitos reservados.</p>
          <div className="flex space-x-6 text-[11px]">
            <a href="#" className="hover:text-white transition">Termos de Uso</a>
            <a href="#" className="hover:text-white transition">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition">Garantia Reembolso</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
