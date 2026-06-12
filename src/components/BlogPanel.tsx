/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { BookOpen, User, Calendar, MessageSquare, ChevronLeft, ArrowRight, ShieldAlert, CheckCircle, PlusCircle } from "lucide-react";
import { Article, User as UserType, UserRole } from "../types";
import { api } from "../services/api";

interface BlogPanelProps {
  currentUser: UserType | null;
  onRefreshTrigger?: () => void;
}

export default function BlogPanel({ currentUser, onRefreshTrigger }: BlogPanelProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Comments state
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Form State for Admin Article Add
  const [showAddForm, setShowAddForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState("Dicas & Estratégias");
  const [formTags, setFormTags] = useState("");
  const [formImage, setFormImage] = useState("");
  const [submittingArticle, setSubmittingArticle] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getArticles();
      setArticles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleReadArticle = async (slug: string) => {
    try {
      const art = await api.getArticleBySlug(slug);
      setActiveArticle(art);
      setCommentName(currentUser ? currentUser.name : "");
      setCommentText("");
    } catch (e) {
      alert("Erro ao buscar conteúdo");
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle) return;
    if (!commentName || !commentText) {
      alert("Preencha seu nome e comentário!");
      return;
    }

    try {
      setIsSubmittingComment(true);
      const updated = await api.addArticleComment(activeArticle.id, commentName, commentText);
      setActiveArticle(updated);
      setCommentText("");
      loadArticles();
    } catch (e: any) {
      alert("Erro ao comentar: " + e.message);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      alert("Título e Conteúdo do Artigo são obrigatórios!");
      return;
    }

    try {
      setSubmittingArticle(true);
      const tagsArray = formTags ? formTags.split(",").map(t => t.trim()) : [];
      await api.createArticle({
        title: formTitle,
        summary: formSummary,
        content: formContent,
        category: formCategory,
        tags: tagsArray,
        image: formImage || "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=600",
        author: currentUser?.name || "Professor Bicho"
      });

      setSuccessMsg("Artigo científico de estudos publicado!");
      setFormTitle("");
      setFormSummary("");
      setFormContent("");
      setFormTags("");
      setFormImage("");
      loadArticles();
      if (onRefreshTrigger) onRefreshTrigger();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (e: any) {
      alert("Erro ao salvar artigo: " + e.message);
    } finally {
      setSubmittingArticle(false);
    }
  };

  const handleDeleteArticle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Deseja realmente excluir este artigo informativo?")) return;
    try {
      await api.deleteArticle(id);
      loadArticles();
      if (onRefreshTrigger) onRefreshTrigger();
    } catch (e: any) {
      alert("Erro ao excluir: " + e.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title block summary */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Blog de <span className="text-[#d4af37]">Estudos e Métodos Matemáticos</span>
        </h2>
        <p className="max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
          O Jogo do Bicho desmistificado sob a ótica de probabilidade combinatória pura. Leia artigos do nosso mestre das dezenas e tire suas dúvidas comentando nos artigos.
        </p>
      </div>

      {/* Admin Quick Add Blog Article */}
      {currentUser && currentUser.role === UserRole.ADMIN && !activeArticle && (
        <div className="bg-rose-50/75 p-6 rounded-2xl border border-rose-300/40 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Gerencial do Administrador: Nova Publicação de Blog</span>
            </h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold text-rose-600 hover:underline px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 transition"
            >
              {showAddForm ? "Fechar Form" : "Criar Artigo"}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleCreateArticle} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Título da Matéria</label>
                <input
                  type="text"
                  placeholder="Ex: Como apostar usando matriz cruzada de Terno de Grupo"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoria</label>
                <input
                  type="text"
                  placeholder="Ex: Dicas & Estratégias"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  placeholder="Ex: Puxadas, Matematica, Fechamentos"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Imagem Capa do Artigo (Link de endereço)</label>
                <input
                  type="text"
                  placeholder="Ex: https://images.unsplash.com/photo-..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Resumo Rápido</label>
                <input
                  type="text"
                  placeholder="Breve sumário atraente de 1 linha de texto para aparecer no mural."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Conteúdo Editor Visual HTML</label>
                <textarea
                  rows={6}
                  placeholder="Digite o texto do tutorial em parágrafos de estudos lógicos."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-sm text-slate-900 focus:outline-none font-mono"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2 flex justify-end items-center pt-2">
                {successMsg && <span className="text-emerald-700 font-bold text-xs mr-4 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> {successMsg}</span>}
                <button
                  type="submit"
                  disabled={submittingArticle}
                  className="px-6 py-2.5 bg-rose-600 text-white font-bold rounded-lg text-sm hover:bg-rose-700 transition"
                >
                  {submittingArticle ? "Publicando..." : "🚀 Publicar Artigo do Blog"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xs text-slate-400 font-bold uppercase">Procurando estudos e notícias...</p>
        </div>
      ) : activeArticle ? (
        /* Full Article reading detail mode */
        <div className="bg-[#0d1526] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl max-w-4xl mx-auto animate-fade-in">
          {/* Back Action button header */}
          <button
            onClick={() => setActiveArticle(null)}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-white hover:underline transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar para Lista de Artigos</span>
          </button>

          {/* Banner Capa Image */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-[#d4af37] text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-lg">
              {activeArticle.category}
            </span>
          </div>

          {/* Article Info Details */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {activeArticle.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-bold">
              <span className="flex items-center space-x-1"><User className="w-4 h-4 text-[#d4af37]" /> <span>{activeArticle.author}</span></span>
              <span>•</span>
              <span className="flex items-center space-x-1"><Calendar className="w-4 h-4 text-[#d4af37]" /> <span>{activeArticle.createdAt}</span></span>
              <span>•</span>
              <span className="flex items-center space-x-1"><MessageSquare className="w-4 h-4 text-[#d4af37]" /> <span>{activeArticle.comments.length} Comentários</span></span>
            </div>
          </div>

          {/* HTML Raw Content Render */}
          <div 
            className="prose max-w-none text-sm text-slate-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: activeArticle.content }}
          ></div>

          {/* Tags list */}
          {activeArticle.tags && activeArticle.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-850">
              {activeArticle.tags.map((tg) => (
                <span key={tg} className="bg-[#16213e]/70 text-[#d4af37] text-xs py-1 px-2.5 rounded-lg border border-slate-800 font-bold">
                  #{tg}
                </span>
              ))}
            </div>
          )}

          {/* Public Comments System */}
          <div className="space-y-6 pt-6 border-t border-slate-800">
            <h4 className="font-extrabold text-white text-lg flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#d4af37]" />
              <span>Dúvidas e Comentários ({activeArticle.comments.length})</span>
            </h4>

            {activeArticle.comments.length === 0 ? (
              <p className="text-xs text-slate-450 italic">Nenhum comentário publicado! Seja o primeiro a tirar suas dúvidas com o Professor.</p>
            ) : (
              <div className="space-y-4">
                {activeArticle.comments.map((comm) => (
                  <div key={comm.id} className="p-4 bg-[#16213e]/20 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                      <span className="text-[#d4af37] font-black">👤 {comm.username}</span>
                      <span>📅 {comm.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">{comm.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Post comment form */}
            <form onSubmit={handlePostComment} className="bg-[#16213e]/40 p-5 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-wide">Deixe sua opinião ou dúvida profissional</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Seu Nome / Apelido</label>
                  <input
                    type="text"
                    placeholder="Ex: Francisco B."
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="w-full bg-[#0d1526] border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sua Mensagem / Pergunta Lógica</label>
                <textarea
                  rows={3}
                  placeholder="Tem alguma dúvida sobre os cálculos estocásticos ou tabelas? Pergunte aqui..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-[#0d1526] border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isSubmittingComment}
                  className="px-5 py-2 bg-[#d4af37] hover:brightness-110 text-[#0a0f1d] font-bold rounded-lg text-xs tracking-wider uppercase transition"
                >
                  {isSubmittingComment ? "Salvando..." : "📢 Publicar Comentário Público"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Articles list grids presentation */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => handleReadArticle(art.slug)}
              className="bg-[#0d1526] rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:brightness-105 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Cover cover layout */}
              <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-slate-800">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-[#0d1526]/95 text-[10px] text-[#d4af37] border border-slate-800 font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                  📂 {art.category}
                </span>

                {currentUser && currentUser.role === UserRole.ADMIN && (
                  <button
                    onClick={(e) => handleDeleteArticle(art.id, e)}
                    className="absolute top-4 right-4 p-2 bg-rose-650/90 hover:bg-rose-700 text-white rounded-lg transition"
                    title="Excluir Matéria"
                  >
                    Excluir
                  </button>
                )}
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1">
                {/* Meta details list */}
                <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                  <span>👤 {art.author}</span>
                  <span>•</span>
                  <span>📅 {art.createdAt}</span>
                </div>

                <h3 className="font-extrabold text-white text-base sm:text-lg group-hover:text-[#d4af37] transition line-clamp-2 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-medium">
                  {art.summary}
                </p>
              </div>

              <div className="px-5 py-4 bg-gradient-to-r from-[#10192e] to-[#0d1526] border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition">
                <span>Leitura rápida de 5 min</span>
                <span className="flex items-center space-x-1 text-[#d4af37] group-hover:translate-x-1 transition-transform">
                  <span>Acessar Estudos</span> <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
