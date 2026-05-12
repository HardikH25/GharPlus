import { doc, onSnapshot } from "firebase/firestore";
import { Check, LoaderCircle, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import { db } from "../lib/firebase";
import type { PropertyDocument } from "../lib/properties";
import { normalizePropertyImages, resolveCategory } from "../lib/properties";
import { getWhatsAppLink } from "../lib/whatsapp";

type PropertyDetailViewModel = {
  id: string;
  title: string;
  location: string;
  price: string;
  gender: string;
  images: string[];
  description: string;
  type: string;
  amenities: string[];
  features: string[];
  owner: string;
  contact: string;
  distance: string;
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyDetailViewModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "properties", id),
      (snapshot) => {
        if (!snapshot.exists()) {
          setProperty(null);
          setIsLoading(false);
          return;
        }

        const data = snapshot.data() as PropertyDocument;
        const budget = Number(data.price ?? 0);

        setProperty({
          id: snapshot.id,
          title: data.title ?? "Untitled Property",
          location: data.location ?? "Location unavailable",
          price: `₹${budget.toLocaleString("en-IN")}/month`,
          images: normalizePropertyImages(data),
          description:
            data.description ??
            "Modern, fully furnished accommodation perfect for students.",
          type: data.type ?? "",
          gender: resolveCategory(data),
          amenities: data.amenities ?? [],
          features: data.features ?? [],
          owner: data.owner ?? "",
          contact: data.contact ?? "",
          distance: data.distance ?? "",
        });
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching property:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center pt-32">
        <LoaderCircle className="h-8 w-8 animate-spin text-[#688A71]" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="p-8 pt-32">
        <p className="text-[#4A5D50]">Property not found.</p>
        <Link to="/properties" className="mt-4 inline-flex text-[#688A71] font-medium">
          ← Back to listings
        </Link>
      </div>
    );
  }

  // Fallback GharPlus support link if no owner contact is available
  const fallbackLink = getWhatsAppLink(
    `Hi Ghar+, I want price and complete details for ${property.title}.`
  );

  // Normalise the contact string: remove spaces, dashes, parentheses so wa.me works
  const normalizedContact = property.contact
    ? property.contact.replace(/[\s\-().+]/g, "")
    : "";

  const callHref = normalizedContact
    ? `tel:+${normalizedContact}`
    : fallbackLink;

  // wa.me requires the number in international format without the leading +
  const whatsappHref = normalizedContact
    ? `https://wa.me/${normalizedContact}`
    : fallbackLink;

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl py-6 md:py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">

          {/* ── Left: Image Gallery ── */}
          <div className="min-w-0">
            <ImageGallery
              images={property.images}
              title={property.title}
              type={property.type || undefined}
            />
          </div>

          {/* ── Right: Property Details ── */}
          <div className="min-w-0 space-y-6">

            {/* Title, Location, Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#2A3B32]">{property.title}</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-[#4A5D50]">
                <MapPin size={14} />
                {property.location}
              </p>
              {property.distance && (
                <p className="mt-0.5 text-sm text-[#4A5D50]">
                  Distance from campus: {property.distance}
                </p>
              )}
              <p className="mt-3 text-2xl font-bold text-[#688A71]">
                {property.price}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-base font-semibold text-[#2A3B32] mb-1">
                Description
              </h2>
              <p className="text-sm text-[#4A5D50] leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-[#2A3B32] mb-3">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#4A5D50]">
                      <Check size={14} className="text-[#688A71] flex-shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div>
              <h2 className="text-base font-semibold text-[#2A3B32] mb-3">
                Property Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#4A5D50] mb-0.5">Type</p>
                  <p className="text-sm font-medium text-[#2A3B32]">
                    {property.type || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#4A5D50] mb-0.5">Gender</p>
                  <p className="text-sm font-medium text-[#2A3B32]">{property.gender}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <p className="text-xs text-[#4A5D50] mb-2">Features</p>
                <ul className="space-y-1.5 text-sm text-[#4A5D50]">
                  {property.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#688A71]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Information */}
            {(property.owner || property.contact) && (
              <div className="rounded-xl bg-white shadow-sm border border-black/5 p-4">
                <h2 className="text-sm font-semibold text-[#2A3B32] mb-2">
                  Owner Information
                </h2>
                {property.owner && (
                  <p className="text-sm text-[#4A5D50]">{property.owner}</p>
                )}
                {property.contact && (
                  <p className="text-sm text-[#4A5D50] mt-0.5">{property.contact}</p>
                )}
              </div>
            )}

            {/* CTA Buttons — desktop */}
            <div className="hidden md:flex gap-3">
              <a
                href={callHref}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2A3B32] py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#1e2e26] hover:shadow-lg active:scale-95"
              >
                <Phone size={15} />
                Call Owner
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white py-3.5 text-center text-sm font-bold text-[#2A3B32] shadow-sm transition hover:bg-black/5 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Share */}
            <div>
              <p className="text-sm font-semibold text-[#2A3B32] mb-1.5">
                Share this accommodation
              </p>
              <button
                className="flex items-center gap-2 text-sm text-[#4A5D50] hover:text-[#2A3B32] transition"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Link
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur-xl md:hidden safe-area-bottom">
        <div className="flex gap-3">
          <a
            href={callHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2A3B32] py-3.5 text-center text-sm font-bold text-white shadow-md active:scale-95"
          >
            <Phone size={15} />
            Call Owner
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white py-3.5 text-center text-sm font-bold text-[#2A3B32] shadow-sm active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
