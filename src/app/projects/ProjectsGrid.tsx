"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface ProjectsGridProps {
  projects: Project[];
  types: string[];
}

export default function ProjectsGrid({ projects, types }: ProjectsGridProps) {
  const [activeType, setActiveType] = useState<string>("All");

  const filters = ["All", ...types];
  const visible =
    activeType === "All"
      ? projects
      : projects.filter((p) => p.type === activeType);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveType(filter)}
            className={`px-5 py-2 rounded-full font-lato text-sm font-semibold transition-colors border ${
              activeType === filter
                ? "bg-gold text-white border-gold"
                : "bg-white text-charcoal border-stone-200 hover:border-gold hover:text-gold"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group rounded-2xl shadow-sm overflow-hidden border border-stone-100 bg-white hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="aspect-video relative bg-stone-200 overflow-hidden">
              <Image
                src={p.imageSrc}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="text-gold font-lato text-xs font-semibold uppercase tracking-wide">
                {p.type} · {p.area}
              </span>
              <h3 className="font-playfair text-xl text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors">
                {p.title}
              </h3>
              <p className="font-lato text-warm-grey text-sm leading-relaxed flex-1">
                {p.product} — {p.scope}.
              </p>
              <span className="mt-4 text-gold font-semibold text-sm">
                View project →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
