import { getFallbackImage, resolveCloudinaryImage } from "./cloudinary";

export type PropertyDocument = {
  title: string;
  price: number;
  location: string;
  imageUrl?: string;
  imageUrls?: string[];
  images?: string[];
  cloudinaryPublicIds?: string[];
  amenities: string[];
  "for which"?: "boys only" | "girls only" | "both";
  description?: string;
  type?: string;
  distance?: string;
  owner?: string;
  contact?: string;
  features?: string[];
};

export type PropertyCategory = "Boys Only" | "Girls Only" | "Co-ed";

export function normalizePropertyImages(data: PropertyDocument): string[] {
  const rawValues = [
    ...(Array.isArray(data.imageUrls) ? data.imageUrls : []),
    ...(Array.isArray(data.images) ? data.images : []),
    ...(data.imageUrl ? [data.imageUrl] : []),
  ].filter(Boolean);

  const fromUrls = rawValues.map((v) => resolveCloudinaryImage(v));
  const fromPublicIds = (Array.isArray(data.cloudinaryPublicIds) ? data.cloudinaryPublicIds : [])
    .filter(Boolean)
    .map((id) => resolveCloudinaryImage(id));

  const all = [...fromUrls, ...fromPublicIds];
  return all.length > 0 ? all : [getFallbackImage()];
}

export function resolveCategory(data: PropertyDocument): PropertyCategory {
  const raw = data["for which"];
  if (raw === "boys only") return "Boys Only";
  if (raw === "girls only") return "Girls Only";
  return "Co-ed";
}
