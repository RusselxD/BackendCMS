'use client'

import React, { useState } from "react";
import { 
  Library,
  GalleryHorizontal,
  Plus, 
  Calendar,
  Clock,
  Trash2,
  Search,
  Filter,
  MoreVertical
} from "lucide-react";
import { Reorder } from "motion/react";
import { toast } from "sonner";
import { clsx } from "clsx";

// Carousel Slides
const INITIAL_SLIDES = [
  {
    id: "1",
    title: "April Joy: Student of the Year",
    subtitle: "Recognition for outstanding academic achievement in Civil Engineering.",
    image: "https://images.unsplash.com/photo-1523240715181-014b9f30d741?auto=format&fit=crop&q=80&w=800",
    status: "active",
    expiresAt: "2026-03-01"
  },
  {
    id: "2",
    title: "Enrollment for SY 2026-2027",
    subtitle: "Official registration is now open for all engineering programs.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800",
    status: "active",
    expiresAt: "2026-04-15"
  },
  {
    id: "3",
    title: "New Research Lab Opening",
    subtitle: "Modern facilities for innovation in Electronics and IT.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    status: "active",
    expiresAt: "2026-02-28"
  }
];

// Media Files
const MEDIA_DATA = [
  { id: 1, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", alt: "Students in engineering lab", size: "2.4 MB" },
  { id: 2, url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600", alt: "Electronic circuit testing", size: "1.8 MB" },
  { id: 3, url: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200", alt: "University building facade", size: "4.2 MB" },
  { id: 4, url: "https://images.unsplash.com/photo-1523240715181-014b9f30d741?auto=format&fit=crop&q=80&w=800", alt: "Group study session", size: "1.2 MB" },
  { id: 5, url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600", alt: "Software development meeting", size: "3.5 MB" },
  { id: 6, url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800", alt: "Server room infrastructure", size: "5.1 MB" },
];

export function MediaCarousel() {
  const [activeTab, setActiveTab] = useState<"carousel" | "media">("carousel");
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [selectedMedia, setSelectedMedia] = useState<typeof MEDIA_DATA[0] | null>(null);

  const handlePublish = () => {
    toast.success("Changes published successfully!");
  };

  const handleDeleteSlide = (id: string) => {
    setSlides(slides.filter(s => s.id !== id));
    toast.success("Slide removed");
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab("carousel")}
            className={clsx(
              "px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all",
              activeTab === "carousel"
                ? "bg-[#0A192F] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <GalleryHorizontal className="w-4 h-4 inline mr-2" />
            Carousel
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={clsx(
              "px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all",
              activeTab === "media"
                ? "bg-[#0A192F] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Library className="w-4 h-4 inline mr-2" />
            Media Library
          </button>
        </div>

        {activeTab === "media" && (
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0A192F] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#112240] transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
            <Plus className="w-4 h-4 text-orange-500" />
            Add Media
          </button>
        )}
      </div>

      {/* Carousel Tab */}
      {activeTab === "carousel" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                Active Carousel Slides
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Manage homepage carousel
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                <Calendar className="w-4 h-4" />
                Schedule
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0A192F] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#112240]">
                <Plus className="w-4 h-4" />
                New Slide
              </button>
            </div>
          </div>

          {/* Slides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <div key={slide.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white">
                    <Clock className="w-3 h-3 text-orange-500" />
                    <span className="text-[10px] font-bold">Expires {slide.expiresAt}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-sm font-black text-slate-900 mb-2 line-clamp-2">{slide.title}</h4>
                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">{slide.subtitle}</p>
                  <button
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3 inline mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePublish}
            className="w-full px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-black uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg"
          >
            Publish Changes
          </button>
        </div>
      )}

      {/* Media Library Tab */}
      {activeTab === "media" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search media..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 ml-4">
              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MEDIA_DATA.map((media) => (
              <div
                key={media.id}
                onClick={() => setSelectedMedia(media)}
                className={clsx(
                  "group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-105",
                  selectedMedia?.id === media.id ? "border-blue-500 shadow-lg" : "border-slate-200"
                )}
              >
                <img src={media.url} alt={media.alt} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-white text-xs font-bold truncate">{media.alt}</p>
                  <p className="text-white/60 text-[10px]">{media.size}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedMedia && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-sm font-black text-slate-900 mb-4">Selected: {selectedMedia.alt}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">File Size</p>
                  <p className="text-sm font-black text-slate-900">{selectedMedia.size}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">ID</p>
                  <p className="text-sm font-mono text-slate-600">IMG-{String(selectedMedia.id).padStart(3, '0')}</p>
                </div>
              </div>
              <button className="w-full mt-4 px-6 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase hover:bg-blue-100 transition-colors">
                Use in Article
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
