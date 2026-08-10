import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{const base="https://mamsangtao.vn";return ["","/cong-cu/ve-tranh-tu-y-tuong","/cong-cu/tao-truyen-cho-be","/cong-cu/lap-trinh-cho-tre-em"].map((path,priority)=>({url:base+path,lastModified:new Date(),changeFrequency:priority?"weekly":"daily",priority:priority?.8:1}))}
