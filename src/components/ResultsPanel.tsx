/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Calendar, Search, Trophy, ShieldAlert, CheckCircle, TrendingUp, AlertTriangle } from "lucide-react";
import { LotteryResult, User, UserRole, ResultRow } from "../types";
import { api } from "../services/api";

interface ResultsPanelProps {
  currentUser: User | null;
  onRefreshTrigger?: () => void;
}

export default function ResultsPanel({ currentUser, onRefreshTrigger }: ResultsPanelProps) {
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search parameters
  const [searchDate, setSearchDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [searchLottery, setSearchLottery] = useState<string>("all");
  
  // Statistical lists
  const [stats, setStats] = useState<any>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Lançador de resultados (Admin forms)
  const [showAddForm, setShowAddForm] = useState(false);
  const [formDate, setFormDate] = useState(new Date().toISOString().split("T")[0]);
  const [formLottery, setFormLottery] = useState<"rio" | "look" | "nacional" | "lbr">("rio");
  const [formDrawName, setFormDrawName] = useState<"PTM" | "PT" | "PTV" | "PTN" | "COR" | "FED">("PT");
  const [rows, setRows] = useState<ResultRow[]>([
    { pos: "1º", prize: "", group: "", animal: "" },
    { pos: "2º", prize: "", group: "", animal: "" },
    { pos: "3º", prize: "", group: "", animal: "" },
    { pos: "4º", prize: "", group: "", animal: "" },
    { pos: "5º", prize: "", group: "", animal: "" },
    { pos: "6º", prize: "", group: "", animal: "" },
    { pos: "7º", prize: "", group: "", animal: "" }
  ]);
  const [submittingResult, setSubmittingResult] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchResultsData = async () => {
    try {
      setLoading(true);
      const formattedLottery = searchLottery === "all" ? undefined : searchLottery;
      const data = await api.getResults(searchDate, formattedLottery);
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsData = async () => {
    try {
      setLoadingStats(true);
      const data = await api.getStats();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchResultsData();
  }, [searchDate, searchLottery]);

  useEffect(() => {
    fetchStatsData();
  }, []);

  const handleRowChange = (index: number, field: keyof ResultRow, value: string) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const handleCreateResult = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate if rows contain values
    const hasInvalObj = rows.some(r => !r.prize || !r.group || !r.animal);
    if (hasInvalObj) {
      alert("Preencha todos os prêmios do 1º ao 7º por completo antes de publicar.");
      return;
    }

    try {
      setSubmittingResult(true);
      await api.createResult({
        date: formDate,
        lottery: formLottery,
        drawName: formDrawName,
        rows
      });

      setSuccessMsg("Resultado de extração publicado com sucesso!");
      setRows([
        { pos: "1º", prize: "", group: "", animal: "" },
        { pos: "2º", prize: "", group: "", animal: "" },
        { pos: "3º", prize: "", group: "", animal: "" },
        { pos: "4º", prize: "", group: "", animal: "" },
        { pos: "5º", prize: "", group: "", animal: "" },
        { pos: "6º", prize: "", group: "", animal: "" },
        { pos: "7º", prize: "", group: "", animal: "" }
      ]);
      fetchResultsData();
      fetchStatsData();
      if (onRefreshTrigger) onRefreshTrigger();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e: any) {
      alert("Erro ao salvar resultado: " + e.message);
    } finally {
      setSubmittingResult(false);
    }
  };

  const handleDeleteResult = async (id: string) => {
    if (!window.confirm("Remover este resultado definitivamente?")) return;
    try {
      await api.deleteResult(id);
      fetchResultsData();
      fetchStatsData();
      if (onRefreshTrigger) onRefreshTrigger();
    } catch (e: any) {
      alert("Erro ao excluir: " + e.message);
    }
  };

  const lotteryLabels: Record<string, string> = {
    rio: "Loteria Rio de Janeiro",
    look: "Loteria Look Goiás",
    nacional: "Loteria Federal Nacional",
    lbr: "Loteria L-BR de Brasília"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Upper Title banner summary */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Quadro de <span className="text-[#d4af37]">Resultados Oficiais</span> em Tempo Real
        </h2>
        <p className="max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
          Verifique a apuração de todas as principais bancas do Brasil. Filtre os resultados históricos de sorteios por data e consulte as estatísticas integradas dos animais mais atrasados.
        </p>
      </div>

      {/* Admin Quick Upload Draw Results Form */}
      {currentUser && currentUser.role === UserRole.ADMIN && (
        <div className="bg-rose-50/75 p-6 rounded-2xl border border-rose-300/40 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Gerencial do Administrador: Lançador Diário de Resultados</span>
            </h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold text-rose-600 hover:underline px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 transition"
            >
              {showAddForm ? "Fechar Lançador" : "Abrir Preenchimento"}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleCreateResult} className="space-y-6 pt-2">
              {/* Top Details metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Data da Extração</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Banca de Extração</label>
                  <select
                    value={formLottery}
                    onChange={(e) => setFormLottery(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 font-semibold focus:outline-none"
                  >
                    <option value="rio">Loteria Rio de Janeiro</option>
                    <option value="look">Loteria Look Goiás</option>
                    <option value="nacional">Loteria Federal Nacional</option>
                    <option value="lbr">Loteria L-BR de Brasília</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Horário / Extração</label>
                  <select
                    value={formDrawName}
                    onChange={(e) => setFormDrawName(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 font-semibold focus:outline-none"
                  >
                    <option value="PTM">PTM (11:20h)</option>
                    <option value="PT">PT (14:20h)</option>
                    <option value="PTV">PTV (16:20h)</option>
                    <option value="PTN">PTN (18:20h)</option>
                    <option value="COR">Corujinha (21:20h)</option>
                    <option value="FED">Federal (Quarta/Sábado)</option>
                  </select>
                </div>
              </div>

              {/* Draw Prizes input row lists */}
              <div className="bg-white p-4 rounded-xl border border-rose-200/50 space-y-3">
                <p className="text-xs font-bold text-rose-800 uppercase tracking-widest border-b pb-2">Preenchimento Prêmios do Sorteio</p>
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
                  {rows.map((row, idx) => (
                    <div key={row.pos} className="space-y-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-xs text-slate-600 block">{row.pos} Prêmio</span>
                      <input
                        type="text"
                        placeholder="Milhar (ex: 5432)"
                        maxLength={4}
                        value={row.prize}
                        onChange={(e) => handleRowChange(idx, "prize", e.target.value)}
                        className="w-full text-center bg-white border rounded p-1 text-sm text-slate-950 font-black focus:outline-none focus:border-amber-400"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Grupo (ex: 08)"
                        maxLength={2}
                        value={row.group}
                        onChange={(e) => handleRowChange(idx, "group", e.target.value)}
                        className="w-full text-center bg-white border rounded p-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-amber-400"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Animal (ex: Cobra)"
                        value={row.animal}
                        onChange={(e) => handleRowChange(idx, "animal", e.target.value)}
                        className="w-full text-center bg-white border rounded p-1 text-xs text-slate-700 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end items-center">
                {successMsg && <span className="text-emerald-700 font-bold text-xs mr-4 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> {successMsg}</span>}
                <button
                  type="submit"
                  disabled={submittingResult}
                  className="px-6 py-2.5 bg-rose-600 text-white font-bold rounded-lg text-sm hover:bg-rose-700 transition disabled:opacity-50"
                >
                  {submittingResult ? "Salvando..." : "📌 Publicar Quadro de Resultados"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Dynamic Statistical Intelligence Modules Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns - Search Filters and Results Listings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters Area banner */}
          <div className="bg-[#0d1526] p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-100">
              <Search className="w-5 h-5 text-[#d4af37]" />
              <span className="font-bold text-sm uppercase tracking-wider text-slate-300">Busca Rápida de Resultado</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="bg-[#16213e]/40 border border-slate-800 rounded-xl p-2 text-sm text-white focus:outline-none font-bold"
                />
              </div>

              <div>
                <select
                  value={searchLottery}
                  onChange={(e) => setSearchLottery(e.target.value)}
                  className="bg-[#16213e]/40 border border-slate-800 rounded-xl p-2 text-sm text-white font-bold focus:outline-none"
                >
                  <option value="all">Todas as Loterias</option>
                  <option value="rio">Loteria Rio de Janeiro</option>
                  <option value="look">Loteria Look Goiás</option>
                  <option value="nacional">Loteria Federal Nacional</option>
                  <option value="lbr">Loteria L-BR Brasília</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sorteios Results Table renderer */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-xs text-slate-400 font-bold uppercase_tracking-wider">Pesquisando registros no arquivo...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-[#0d1526] border border-slate-800 rounded-2xl p-12 text-center text-slate-450 space-y-3">
              <Calendar className="w-10 h-10 text-slate-550 mx-auto" />
              <p className="text-sm font-bold text-white">Apuração não cadastrada para esta data.</p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                As extrações oficiais atualizam sequencialmente conforme horários oficiais. Modifique a busca ou utilize o seletor de outras datas no painel superior de busca.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((res) => (
                <div key={res.id} className="bg-[#0d1526] rounded-2xl border border-slate-800 overflow-hidden shadow-xl hover:brightness-105 transition duration-155">
                  {/* Result Card Header */}
                  <div className="bg-gradient-to-r from-[#16213e] to-[#0d1526] px-5 py-4 border-b border-slate-800 text-white flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="p-2 bg-[#d4af37]/10 text-[#d4af37] rounded-lg border border-[#d4af37]/20 font-bold text-xs uppercase tracking-normal">
                        {res.drawName}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base tracking-tight text-white">{lotteryLabels[res.lottery] || res.lottery}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Sorteio efetuado em {new Date(res.date).toLocaleDateString([], {day:'2-digit', month: 'long', year: 'numeric'})}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] bg-[#16213e] text-[#d4af37] border border-slate-800 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                        OFICIAL ⚙️
                      </span>
                      {currentUser && currentUser.role === UserRole.ADMIN && (
                        <button
                          onClick={() => handleDeleteResult(res.id)}
                          className="p-1 px-2.5 bg-rose-500/10 text-rose-400 font-bold rounded hover:bg-rose-600 hover:text-white transition text-xs"
                          title="Remover Resultado"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Result Rows grid table representation */}
                  <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0d1526]/40 to-[#0a0f1d]/50">
                    <div className="grid grid-cols-1 divide-y divide-slate-800/60">
                      {res.rows.map((row) => (
                        <div key={row.pos} className="flex justify-between items-center py-2.5 hover:bg-[#16213e]/20 px-2.5 rounded-lg transition duration-150">
                          <span className="font-bold text-slate-400 text-xs sm:text-sm w-12">{row.pos}</span>
                          <span className="font-black text-[#d4af37] text-base sm:text-lg tracking-wider font-mono">{row.prize}</span>
                          <span className="font-bold text-slate-400 text-xs font-mono">Páscoa {row.group}</span>
                          <span className="bg-[#16213e]/60 text-emerald-300 text-xs font-black tracking-wide py-1 px-3.5 rounded-full border border-slate-800/80 flex items-center space-x-1">
                            <span>{row.animal}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Column - Statistical insights */}
        <div className="space-y-6">
          {/* Quick Statistics details */}
          <div className="bg-[#0d1526] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <TrendingUp className="w-5 h-5 text-[#d4af37]" />
              <h4 className="font-black text-white text-sm tracking-wide uppercase">Frequência: Animais em Destaque</h4>
            </div>

            {loadingStats ? (
              <div className="py-8 text-center text-xs text-slate-400 font-bold animate-pulse">Calculando ocorrências estatísticas...</div>
            ) : stats && stats.frequentes ? (
              <div className="space-y-3.5">
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">Os bichos mais sorteados em primeiro prêmio no último período:</p>
                {stats.frequentes.map((item: any, idx: number) => (
                  <div key={item.animal} className="flex items-center justify-between p-2.5 hover:bg-[#16213e]/20 border border-slate-800 rounded-xl transition">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-400 w-4">#{idx+1}</span>
                      <span className="font-bold text-white text-sm">{item.animal}</span>
                      <span className="text-[10px] text-slate-400 font-semibold font-mono">Gr. {item.group}</span>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-black px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                      {item.count} aparições
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Delayed Numbers */}
          <div className="bg-[#0d1526] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h4 className="font-black text-white text-sm tracking-wide uppercase">Dezenas mais Atrasadas</h4>
            </div>

            {loadingStats ? (
              <div className="py-8 text-center text-xs text-slate-400 font-bold animate-pulse">Filtrando ciclos de intervalos...</div>
            ) : stats && stats.atrasados ? (
              <div className="space-y-3.5">
                <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">Bichos ausentes em sorteio que estão acumulados por maior ciclo cronológico:</p>
                {stats.atrasados.map((item: any, idx: number) => (
                  <div key={item.animal} className="flex items-center justify-between p-2.5 hover:bg-[#16213e]/20 border border-slate-800 rounded-xl transition">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-slate-400 w-4">#{idx+1}</span>
                      <span className="font-bold text-white text-sm">{item.animal}</span>
                      <span className="text-[10px] text-slate-400 font-semibold font-mono">Gr. {item.group}</span>
                    </div>
                    <span className="bg-rose-500/10 text-rose-400 text-xs font-black px-2.5 py-0.5 rounded-lg border border-rose-500/20">
                      {item.daysDelayed} turnos atrasado
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Expert Tendency Cards */}
          <div className="bg-[#16213e]/40 text-white rounded-2xl border border-slate-800 p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4af37]/5 rounded-full blur-2xl"></div>
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Trophy className="w-5 h-5 text-[#d4af37]" />
              <h4 className="font-black text-[#d4af37] text-sm tracking-wide uppercase">Tendências Recomendadas</h4>
            </div>

            {loadingStats ? (
              <div className="py-8 text-center text-xs text-slate-400 animate-pulse">Gerando recomendações lógicas...</div>
            ) : stats && stats.tendencias ? (
              <div className="space-y-4 pt-3">
                {stats.tendencias.map((item: any) => (
                  <div key={item.animal} className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-1.5 font-extrabold text-sm text-[#d4af37]">
                      <span>☘️</span>
                      <span>{item.animal} (Grupo {item.group})</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed mt-1 font-medium">{item.reason}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
