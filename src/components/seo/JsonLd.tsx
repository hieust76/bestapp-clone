import React from "react";

export function OrganizationJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BestApp.vn",
    url: "https://bestapp.vn",
    logo: "https://bestapp.vn/logo.png",
    description: "Nền tảng mua sắm sản phẩm số, tài khoản AI và phần mềm bản quyền tự động 24/7",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-988-123-456",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  rating = 5.0,
  reviewsCount = 100,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  reviewsCount?: number;
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
    brand: {
      "@type": "Brand",
      name: "BestApp",
    },
    offers: {
      "@type": "Offer",
      url: "https://bestapp.vn",
      priceCurrency: "VND",
      price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviewsCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}
