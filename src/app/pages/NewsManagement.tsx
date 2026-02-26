'use client'

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit2, 
  EyeOff, 
  BarChart2, 
  Filter,
  CheckCircle2,
  Clock,
  Star,
  X,
  Paperclip,
  Trash2,
  Archive,
  ChevronRight,
  Info,
  Calendar,
  Save,
  Send,
  CloudUpload
} from "lucide-react";
import { clsx } from "clsx";
import { toast } from "sonner";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none" 
      className={className}
    >
      <path d="M12 1.7L14.9 8.6L22.2 9.2L16.8 13.9L18.4 21L12 17.3L5.6 21L7.2 13.9L1.8 9.2L9.1 8.6L12 1.7Z" />
    </svg>
  );
}

interface Article {
  id?: string;
  title: string;
  body: string;
  author_id: string;
  author_name?: string;
  image_path: string;
  image_alt: string;
  status: "pending" | "approved" | "archived";
  created_at?: string;
  approved_at?: string;
  archived_at?: string;
}

const INITIAL_ARTICLES: Article[] = [
  { id: "1", title: "Engineering Students Win National Innovation Award", body: "A team of Civil Engineering students won the prestigious National Innovation Award...", author_id: "auth_001", author_name: "Dr. Ahmed", image_path: "https://images.unsplash.com/photo-1517245386807?auto=format&fit=crop&q=80", image_alt: "Award ceremony", status: "approved", created_at: "2026-02-18" },
  { id: "2", title: "New Electrical Engineering Lab Equipment Arrives", body: "State-of-the-art testing equipment has arrived at the EE department...", author_id: "auth_002", author_name: "Prof. Sarah", image_path: "https://images.unsplash.com/photo-1517245386807?auto=format&fit=crop&q=80", image_alt: "Laboratory", status: "approved", created_at: "2026-02-15" },
  { id: "3", title: "IT Department Hosts Cybersecurity Workshop", body: "Industry experts conducted a comprehensive cybersecurity awareness workshop...", author_id: "auth_003", author_name: "Dr. Michael", image_path: "https://images.unsplash.com/photo-1517245386807?auto=format&fit=crop&q=80", image_alt: "Workshop", status: "pending", created_at: "2026-02-12" },
];

export function NewsManagement() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Article>({
    title: "",
    body: "",
    author_id: "current_user_id", // Replace with actual current user
    author_name: "Dr. Elizabeth Grant",
    image_path: "",
    image_alt: "",
    status: "pending",
  });

  const filteredArticles = articles.filter(article => {
    if (filter === "All") return true;
    // You can add category/department filtering here
    return true;
  });

  const openCreateModal = () => {
    setFormData({
      title: "",
      body: "",
      author_id: "current_user_id",
      author_name: "Dr. Elizabeth Grant",
      image_path: "",
      image_alt: "",
      status: "pending",
    });
    setIsEditMode(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setFormData(article);
    setIsEditMode(true);
    setEditingId(article.id || null);
    setIsModalOpen(true);
  };

  const handleInputChange = (field: keyof Article, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveDraft = () => {
    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Title and content are required");
      return;
    }

    if (isEditMode && editingId) {
      setArticles(prev =>
        prev.map(a => a.id === editingId ? { ...formData, id: editingId, status: "pending" } : a)
      );
      toast.success("Article draft updated");
    } else {
      const newArticle: Article = {
        ...formData,
        id: `article_${Date.now()}`,
        created_at: new Date().toISOString(),
        status: "pending",
      };
      setArticles(prev => [newArticle, ...prev]);
      toast.success("Article draft saved");
    }
  };

  const handlePublish = () => {
    if (!formData.title.trim() || !formData.body.trim() || !formData.image_path || !formData.image_alt) {
      toast.error("Please fill all required fields including image");
      return;
    }

    if (isEditMode && editingId) {
      setArticles(prev =>
        prev.map(a => a.id === editingId ? { ...formData, id: editingId, status: "pending" } : a)
      );
      toast.success("Article submitted for approval");
    } else {
      const newArticle: Article = {
        ...formData,
        id: `article_${Date.now()}`,
        created_at: new Date().toISOString(),
        status: "pending",
      };
      setArticles(prev => [newArticle, ...prev]);
      toast.success("Article submitted for approval");
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (editingId) {
      setArticles(prev => prev.filter(a => a.id !== editingId));
      toast.error("Article deleted");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit shadow-sm">
          {["All", "Pending", "Approved", "Archived"].map((pill) => (
            <button
              key={pill}
              onClick={() => setFilter(pill)}
              className={clsx(
                "px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                filter === pill ? "bg-[#0A192F] text-white shadow-lg" : "text-slate-400 hover:bg-slate-50"
              )}
            >
              {pill}
            </button>
          ))}
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A192F] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#112240] transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 w-fit"
        >
          <Plus className="w-4 h-4 text-orange-500" />
          Create New Article
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Article</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Author</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredArticles.map((article) => (
              <tr key={article.id} className="group hover:bg-slate-50/30 transition-colors">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                      <img src={article.image_path} alt={article.image_alt} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{article.title}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{article.created_at || "Feb 1, 2026"}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className="text-xs font-black text-slate-600">{article.author_name}</span>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    {article.status === "pending" && (
                      <>
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-black text-amber-600 uppercase">Pending</span>
                      </>
                    )}
                    {article.status === "approved" && (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-black text-green-600 uppercase">Approved</span>
                      </>
                    )}
                    {article.status === "archived" && (
                      <>
                        <Archive className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-black text-slate-500 uppercase">Archived</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(article)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-white hover:shadow-md transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Article Creator/Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F8FAFC]">
          {/* Header */}
          <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
              <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{isEditMode ? "Edit Article" : "Create Article"}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Based on Article Schema • Database v1.0</p>
              </div>
            </div>
          </header>

          {/* Main Content (Split-Screen) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Side (Input Fields) */}
            <div className="flex-1 overflow-y-auto p-12 bg-white space-y-12">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Article Title *</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter a compelling title..."
                  className="w-full text-4xl font-black text-[#0A192F] placeholder:text-slate-100 outline-none border-none p-0 uppercase leading-tight tracking-tighter"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Article Content / Body *</label>
                <div className="min-h-[400px] bg-slate-50/50 rounded-3xl border border-slate-100 p-10 font-medium text-slate-700 leading-relaxed text-lg outline-none focus:bg-white transition-colors">
                  <textarea 
                    value={formData.body}
                    onChange={(e) => handleInputChange("body", e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none resize-none"
                    placeholder="Write the full article content here..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Image File Path *</label>
                 <input 
                   type="text" 
                   value={formData.image_path}
                   onChange={(e) => handleInputChange("image_path", e.target.value)}
                   placeholder="/images/article-cover.jpg"
                   className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Image Alt Text *</label>
                 <input 
                   type="text" 
                   value={formData.image_alt}
                   onChange={(e) => handleInputChange("image_alt", e.target.value)}
                   placeholder="Describe the image for accessibility..."
                   className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
              </div>
            </div>

            {/* Right Side (Configuration Sidebar) */}
            <div className="w-[420px] bg-[#F8FAFC] border-l border-slate-100 overflow-y-auto p-12 space-y-12">
               {/* Cover Image Preview */}
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cover Image Preview</label>
                  <div className="aspect-video bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group cursor-pointer">
                     {formData.image_path ? (
                       <img src={formData.image_path} alt={formData.image_alt} className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all" onError={(e) => (e.currentTarget.style.display = 'none')} />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center bg-slate-50">
                         <CloudUpload className="w-10 h-10 text-slate-300" />
                       </div>
                     )}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase text-center tracking-widest italic">Preview of cover image</p>
               </div>

               {/* Article Metadata */}
               <div className="space-y-6">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Article Information</label>
                  
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <label className="text-[9px] font-black text-slate-300 uppercase block mb-2">Author ID (UUID)</label>
                    <input 
                      type="text" 
                      value={formData.author_id}
                      onChange={(e) => handleInputChange("author_id", e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-600"
                      placeholder="UUID value"
                    />
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <label className="text-[9px] font-black text-slate-300 uppercase block mb-2">Author Name</label>
                    <input 
                      type="text" 
                      value={formData.author_name || ""}
                      onChange={(e) => handleInputChange("author_name", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs font-bold text-slate-700"
                      placeholder="Display name"
                    />
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <label className="text-[9px] font-black text-slate-300 uppercase block mb-2">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      <option value="pending">Pending Review</option>
                      <option value="approved">Approved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
               </div>

               <div className="p-6 bg-[#0A192F] rounded-[2rem] text-white space-y-4 shadow-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <Info className="w-3 h-3 text-orange-500" />
                    Required Fields
                  </h4>
                  <div className="space-y-2">
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                        <span className="text-white/40 tracking-wider">Title</span>
                        <span className={formData.title.trim() ? "text-green-400 tracking-widest" : "text-red-400 tracking-widest"}>{formData.title.trim() ? "✓ Done" : "✗ Required"}</span>
                     </div>
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                        <span className="text-white/40 tracking-wider">Body</span>
                        <span className={formData.body.trim() ? "text-green-400 tracking-widest" : "text-red-400 tracking-widest"}>{formData.body.trim() ? "✓ Done" : "✗ Required"}</span>
                     </div>
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                        <span className="text-white/40 tracking-wider">Image Path</span>
                        <span className={formData.image_path ? "text-green-400 tracking-widest" : "text-red-400 tracking-widest"}>{formData.image_path ? "✓ Done" : "✗ Required"}</span>
                     </div>
                     <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                        <span className="text-white/40 tracking-wider">Alt Text</span>
                        <span className={formData.image_alt ? "text-green-400 tracking-widest" : "text-red-400 tracking-widest"}>{formData.image_alt ? "✓ Done" : "✗ Required"}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Action Bar (Workflow Controls) */}
          <footer className="h-24 bg-white border-t border-slate-100 flex items-center justify-between px-10 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
             <div className="flex items-center gap-4">
                {isEditMode && (
                  <button onClick={handleDelete} className="flex items-center gap-2 px-6 py-3 text-red-500 bg-red-50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all">
                     <Trash2 className="w-4 h-4" />
                     Delete
                  </button>
                )}
             </div>

             <div className="flex items-center gap-4">
                <button 
                  onClick={handleSaveDraft}
                  className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 shadow-sm"
                >
                  Save Draft
                </button>
                <button 
                   onClick={handlePublish}
                   className="flex items-center gap-2 px-10 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Submit for Approval
                </button>
             </div>
          </footer>
        </div>
      )}
    </div>
  );
}
