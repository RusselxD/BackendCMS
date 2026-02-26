'use client'

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Archive,
  Search,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Calendar,
  User,
  AlertCircle,
  ChevronDown,
  Filter,
} from "lucide-react";
import { clsx } from "clsx";
import { toast } from "sonner";

type ArticleStatus = "pending" | "approved" | "archived";

interface Article {
  id: string;
  title: string;
  body: string;
  author_id: string;
  author_name: string;
  status: ArticleStatus;
  image_path: string;
  image_alt: string;
  created_at: string;
  approved_at?: string;
  archived_at?: string;
}

// Mock data - replace with real API calls
const ARTICLES_DATA: Article[] = [
  {
    id: "1",
    title: "Engineering Students Win National Innovation Award",
    body: "A team of Civil Engineering students from our institution has won the prestigious National Innovation Award for their groundbreaking sustainable construction project...",
    author_id: "author_ce_001",
    author_name: "Dr. Ahmed Hassan",
    status: "pending",
    image_path: "/images/award.jpg",
    image_alt: "Students receiving award",
    created_at: "2026-02-25T10:30:00Z",
  },
  {
    id: "2",
    title: "New Electrical Engineering Lab Equipment Arrives",
    body: "The EE department has received state-of-the-art testing and measurement equipment sponsored by leading industry partners...",
    author_id: "author_ee_001",
    author_name: "Prof. Sarah Williams",
    status: "pending",
    image_path: "/images/lab.jpg",
    image_alt: "New lab equipment",
    created_at: "2026-02-24T14:15:00Z",
  },
  {
    id: "3",
    title: "IT Department Hosts Cybersecurity Workshop",
    body: "Industry experts from major tech companies conducted a comprehensive cybersecurity awareness workshop for all IT students...",
    author_id: "author_it_001",
    author_name: "Dr. Michael Chen",
    status: "pending",
    image_path: "/images/workshop.jpg",
    image_alt: "Workshop in progress",
    created_at: "2026-02-23T09:45:00Z",
  },
  {
    id: "4",
    title: "Annual Engineering Expo Successfully Concludes",
    body: "The annual engineering expo showcased innovative student projects and attracted industry recruiters...",
    author_id: "author_ce_001",
    author_name: "Dr. Ahmed Hassan",
    status: "approved",
    image_path: "/images/expo.jpg",
    image_alt: "Expo booths",
    created_at: "2026-02-20T11:00:00Z",
    approved_at: "2026-02-21T10:30:00Z",
  },
];

export default function ArticleApprovalsPage() {
  const [articles, setArticles] = useState<Article[]>(ARTICLES_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<ArticleStatus | "all">("pending");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || article.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = articles.filter((a) => a.status === "pending").length;
  const approvedCount = articles.filter((a) => a.status === "approved").length;
  const archivedCount = articles.filter((a) => a.status === "archived").length;

  const handleApprove = (id: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, status: "approved", approved_at: new Date().toISOString() }
          : article
      )
    );
    toast.success("Article approved successfully");
    setReviewComment("");
  };

  const handleReject = (id: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id
          ? { ...article, status: "archived", archived_at: new Date().toISOString() }
          : article
      )
    );
    toast.error("Article archived");
    setReviewComment("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: ArticleStatus) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      approved: "bg-green-50 text-green-700 border-green-200",
      archived: "bg-slate-50 text-slate-700 border-slate-200",
    };

    const icons = {
      pending: Clock,
      approved: CheckCircle2,
      archived: Archive,
    };

    const Icon = icons[status];
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${styles[status]}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">Pending Review</p>
              <p className="text-3xl font-black text-amber-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">Approved</p>
              <p className="text-3xl font-black text-green-600">{approvedCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1">Archived</p>
              <p className="text-3xl font-black text-slate-600">{archivedCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <Archive className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ArticleStatus | "all")}
              className="bg-gray-50 text-sm font-semibold text-gray-900 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">No articles found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Card Header */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setExpandedArticle(expandedArticle === article.id ? null : article.id)
                }
              >
                <div className="flex items-start gap-6">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                    <img
                      src={article.image_path}
                      alt={article.image_alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {!article.image_path && (
                      <Eye className="w-8 h-8 text-blue-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-black text-slate-900 leading-tight">
                        {article.title}
                      </h3>
                      <ChevronDown
                        className={clsx(
                          "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform",
                          expandedArticle === article.id && "rotate-180"
                        )}
                      />
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {article.body}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span className="font-semibold">{article.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.created_at)}</span>
                        </div>
                      </div>
                      {getStatusBadge(article.status)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedArticle === article.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="mb-6">
                    <h4 className="text-sm font-black text-gray-700 mb-3 uppercase tracking-wider">
                      Full Content
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{article.body}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-black text-gray-700 mb-3 uppercase tracking-wider">
                      Review Notes
                    </h4>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Add your review comments here (optional)..."
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  {/* Action Buttons */}
                  {article.status === "pending" && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApprove(article.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors active:scale-95"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Approve Article
                      </button>
                      <button
                        onClick={() => handleReject(article.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors active:scale-95"
                      >
                        <XCircle className="w-5 h-5" />
                        Reject & Archive
                      </button>
                    </div>
                  )}

                  {article.status === "approved" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-2 text-green-700 text-sm font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Approved
                      </div>
                      <p className="text-xs text-green-600">
                        Approved on {formatDate(article.approved_at!)}
                      </p>
                    </div>
                  )}

                  {article.status === "archived" && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold mb-1">
                        <Archive className="w-4 h-4" />
                        Archived
                      </div>
                      <p className="text-xs text-slate-600">
                        Archived on {formatDate(article.archived_at!)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
