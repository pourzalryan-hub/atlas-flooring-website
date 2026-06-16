import type { MetadataRoute } from "next";
import { locations } from "@/lib/locations";
import { projects } from "@/lib/projects";
import { articles } from "@/lib/blog";

const BASE_URL = "https://atlasrugflooring.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/locations`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    "/hardwood",
    "/carpet",
    "/vinyl",
    "/laminate",
    "/stair-runners",
    "/refinishing",
    "/area-rugs",
    "/commercial",
    "/engineered-hardwood",
    "/condo-flooring",
    "/basement-flooring",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...projectPages,
    ...blogPages,
  ];
}
