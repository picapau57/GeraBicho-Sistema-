/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, Edit2, Trash2, ShieldAlert, Cpu, CheckCircle } from "lucide-react";
import { Prediction, PredictionType, User, UserRole } from "../types";
import { api } from "../services/api";

interface PredictionsPanelProps {
  currentUser: User | null;
  onRefreshTrigger?: () => void;
}

export default function PredictionsPanel({ currentUser, onRefreshTrigger }: PredictionsPanelProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedType, setSelectedType] = useState<PredictionType | "all">("all");
  const [loading, setLoading] = useState(true);
  
  // IA Generated state
  const [iaLoading, setIaLoading] = useState(false);
  const [iaPrediction, setIaPrediction] = useState<any>(null);

  // Form State for Admin Fast Add
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<PredictionType>("palpitao");
  const [formTitle, setFormTitle] = useState("");
  const [formNumbers, setFormNumbers] = useState("");
  const [formAnimals, setFormAnimals] = useState("");
  const [formContent, setFormContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const predictionTypes: { id: PredictionType; label: string }[] = [
    { id: "palpitao", label: "Palpitão" },
    { id: "milhar", label: "Milhar" },
    { id: "centena", label: "Centena" },
    { id: "dezena", label: "Dezena" },
    { id: "grupo", label: "Grupo" },
    { id: "terno_grupo", label: "Terno de Grupo" },
    { id: "terno_dezena", label: "Terno de Dezena" },
    { id: "duque_grupo", label: "Duque de Grupo" },
    { id: "duque_dezena", label: "Duque de Dezena" },
    { id: "cercamento", label: "Cercamento" },
    { id: "passe", label: "Passe" },
    { id: "combinacoes", label: "Combinações Especiais" }
  ];

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await api.getPredictions();
      setPredictions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleGenerateIA = async () => {
    try {
      setIaLoading(true);
      setIaPrediction(null);
      const data = await api.generateIAPrediction();
      setIaPrediction(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIaLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Deseja realmente remover este palpite?")) return;
    try {
      await api.deletePrediction(id);
      fetchItems();
      if (onRefreshTrigger) onRefreshTrigger();
    } catch (e: any) {
      alert("Erro ao excluir: " + e.message);
    }
  };

  const handleAddPrediction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formNumbers) {
      alert("Título e números são necessários!");
      return;
    }

    try {
      setSubmitting(true);
      const numsArray = formNumbers.split(",").map(n => n.trim());
      const animsArray = formAnimals ? formAnimals.split(",").map(a => a.trim()) : [];
      
      await api.createPrediction({
        type: formType,
        title: formTitle,
        numbers: numsArray,
        animals: animsArray,
        content: formContent
      });

      setSuccessMsg("Palpite adicionado com sucesso!");
      setFormTitle("");
      setFormNumbers("");
      setFormAnimals("");
      setFormContent("");
      fetchItems();
      if (onRefreshTrigger) onRefreshTrigger();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e: any) {
      alert("Erro ao salvar palpite: " + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPredictions = selectedType === "all" 
    ? predictions 
    : predictions.filter(p => p.type === selectedType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Upper header summary */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Palpites Automatizados do <span className="text-[#d4af37]">Jogo do Bicho</span>
        </h2>
        <p className="max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
          Nossa equipe analisa os ciclos astrológicos, numerologias e os gráficos históricos de atrasos clássicos para catalogar as dezenas e dezenas cercadas com maior probabilidade matemática de acerto.
        </p>
      </div>

      {/* AI Generator Bonus Panel */}
      <div className="bg-[#0d1526] rounded-3xl border border-slate-800 p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Cpu className="w-6 h-6 text-[#0a0f1d] stroke-[2.5]" />
            </span>
            <div>
              <p className="text-[#d4af37] text-xs font-bold uppercase tracking-wider">Mecanismo Exclusivo</p>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">Gerador de Palpites de Inteligência Artificial</h3>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Consulte instantaneamente a nossa IA treinada nas tabelas lendárias do bicho. Ela cruza horários de extração (PTM, PT, PTV, PTN, Federal) e extrai milhares, centenas e dezenas sincronizadas em tempo real.
          </p>
          <div>
            <button
              onClick={handleGenerateIA}
              disabled={iaLoading}
              className="px-6 py-3.5 bg-[#d4af37] text-[#0a0f1d] font-black text-sm uppercase tracking-wide rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
            >
              {iaLoading ? "Processando Algoritmo..." : "🔮 GERAR MEU PALPITE DE IA AGORA"}
            </button>
          </div>

          {/* AI Result Cards */}
          {iaPrediction && (
            <div className="p-6 bg-[#0a0f1d]/90 rounded-2xl border border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Resultado IA Encontrado com Sucesso</span>
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase border border-emerald-500/20">
                  Alta Frequência Provisória
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 bg-[#16213e]/20 rounded-xl border border-slate-850 text-center">
                  <p className="text-xs text-slate-400">Grupo Recomendado</p>
                  <p className="text-base font-black text-white mt-1">{iaPrediction.grupo}</p>
                </div>
                <div className="p-4 bg-[#16213e]/20 rounded-xl border border-slate-850 text-center">
                  <p className="text-xs text-slate-400">Milhar Seca</p>
                  <p className="text-lg font-black text-[#d4af37] tracking-wider mt-1">{iaPrediction.milhar}</p>
                </div>
                <div className="p-4 bg-[#16213e]/20 rounded-xl border border-slate-850 text-center">
                  <p className="text-xs text-slate-400">Centena</p>
                  <p className="text-lg font-black text-white tracking-wider mt-1">{iaPrediction.centena}</p>
                </div>
                <div className="p-4 bg-[#16213e]/20 rounded-xl border border-slate-850 text-center">
                  <p className="text-xs text-slate-400">Dezena Segura</p>
                  <p className="text-lg font-black text-white tracking-wider mt-1">{iaPrediction.dezena}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic bg-[#d4af37]/5 p-3 rounded-lg border border-[#d4af37]/10 leading-relaxed">
                <strong>Análise do Professor:</strong> {iaPrediction.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Fast Add Section */}
      {currentUser && currentUser.role === UserRole.ADMIN && (
        <div className="bg-rose-50/75 p-6 rounded-2xl border border-rose-300/40 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Gerencial do Administrador: Lançamento Rápido de Palpites</span>
            </h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold text-rose-600 hover:underline px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 transition"
            >
              {showAddForm ? "Fechar Lançador" : "Abrir Formulário"}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddPrediction} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Seção / Modalidade</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as PredictionType)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 font-semibold focus:outline-none focus:border-amber-500"
                >
                  {predictionTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título do Palpite</label>
                <input
                  type="text"
                  placeholder="Ex: Milhares Quentes do Dia"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Números (separados por vírgula)</label>
                <input
                  type="text"
                  placeholder="Ex: 5742, 1264, 8821"
                  value={formNumbers}
                  onChange={(e) => setFormNumbers(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Animais Indicados (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Leão, Cachorro"
                  value={formAnimals}
                  onChange={(e) => setFormAnimals(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Dicas e Orientações Técnicas (PDF/Estudos)</label>
                <input
                  type="text"
                  placeholder="Ex: Cercada do 1º ao 5º prêmio na Look ou Federal com terno de grupo cruzado."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-3 flex justify-end items-center pt-2">
                {successMsg && <span className="text-emerald-600 font-bold text-xs mr-4 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> {successMsg}</span>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-rose-600 text-white font-bold rounded-lg text-sm hover:bg-rose-700 shadow transition disabled:opacity-50"
                >
                  {submitting ? "Inserindo..." : "🚀 Publicar Palpite Oficial"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Category Pills Slider Selector */}
      <div className="space-y-4">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-400">Filtrar palpites por modalidade</label>
        <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-4">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
              selectedType === "all"
                ? "bg-[#d4af37] text-[#0a0f1d] font-bold shadow-lg"
                : "bg-[#0d1526] text-slate-400 border border-slate-800 hover:bg-[#16213e]/60"
            }`}
          >
            📋 Todos os Palpites
          </button>
          {predictionTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                selectedType === t.id
                  ? "bg-[#d4af37] text-[#0a0f1d] font-extrabold shadow-lg"
                  : "bg-[#0d1526] text-slate-350 border border-slate-800 hover:bg-[#16213e]/60"
              }`}
            >
              🎯 {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state indicator */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm text-slate-400 font-medium">Buscando palpites fresquinhos de hoje...</p>
        </div>
      ) : filteredPredictions.length === 0 ? (
        <div className="bg-[#0d1526] border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-4 shadow-xl max-w-lg mx-auto">
          <HelpCircle className="w-12 h-12 text-[#d4af37]/60 mx-auto" />
          <p className="text-sm font-semibold text-white">Nenhum palpite publicado nesta aba de hoje.</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consulte o nosso painel do Gerador IA acima para retirar palpites lógicos imediatos ou consulte nossos artigos de blog para entender o cálculo das puxadas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredPredictions.map((pred) => (
            <div 
              key={pred.id} 
              className="bg-[#0d1526] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl hover:brightness-105 transition duration-150 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-[#16213e]/40 text-[#d4af37] font-bold rounded-lg text-xs uppercase tracking-wider border border-slate-800">
                    {predictionTypes.find(t => t.id === pred.type)?.label || pred.type}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-400">Atu: {new Date(pred.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    {currentUser && currentUser.role === UserRole.ADMIN && (
                      <button
                        onClick={() => handleDelete(pred.id)}
                        className="p-1.5 text-rose-500 hover:bg-[#16213e]/50 rounded-lg transition"
                        title="Remover Palpite"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h4 className="text-lg font-extrabold text-white tracking-tight">{pred.title}</h4>
                
                {/* Large visual numbers presentation */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {pred.numbers.map((num, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-[#d4af37]/15 border border-[#d4af37]/35 text-[#d4af37] font-extrabold text-lg sm:text-xl rounded-xl shadow-md leading-none font-mono"
                    >
                      {num}
                    </span>
                  ))}
                </div>

                {/* Animals display list */}
                {pred.animals && pred.animals.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider self-center mr-1">Bichos indicativos:</span>
                    {pred.animals.map((anim, idx) => (
                      <span key={idx} className="bg-emerald-950/40 text-emerald-300 font-bold text-xs py-1 px-2.5 rounded-full border border-emerald-900/60">
                        ☘️ {anim}
                      </span>
                    ))}
                  </div>
                )}

                {pred.content && (
                  <p className="text-xs leading-relaxed text-slate-300 bg-[#0a0f1d]/50 p-3 rounded-xl border border-slate-800/80 font-medium">
                    {pred.content}
                  </p>
                )}
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                <span>📅 Válido para: {pred.date}</span>
                <span className="text-[#d4af37] font-bold">✨ Verificado Seguro</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
