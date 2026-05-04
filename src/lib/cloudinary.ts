const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80";
const CLOUDINARY_DELIVERY = "f_auto,q_auto:best,dpr_auto,c_limit,w_3200";

function applyCloudinaryDelivery(url: string): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }

  if (url.includes(`/${CLOUDINARY_DELIVERY}/`)) {
    return url;
  }

  return url.replace("/image/upload/", `/image/upload/${CLOUDINARY_DELIVERY}/`);
}

export function getCloudinaryUrl(publicId: string): string {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const normalizedPublicId = publicId.trim().replace(/^\/+/, "");

  if (!cloudName || !normalizedPublicId) {
    return FALLBACK_IMAGE;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${CLOUDINARY_DELIVERY}/${normalizedPublicId}`;
}

export function resolveCloudinaryImage(value: string): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return FALLBACK_IMAGE;
  }

  if (normalizedValue.startsWith("http://") || normalizedValue.startsWith("https://")) {
    return applyCloudinaryDelivery(normalizedValue);
  }

  return getCloudinaryUrl(normalizedValue);
}

export function getFallbackImage(): string {
  return FALLBACK_IMAGE;
}
