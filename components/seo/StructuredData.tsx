import Script from 'next/script'

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  address?: {
    city: string
    country: string
  }
}

export function OrganizationSchema({
  name = 'Incubazar',
  url = 'https://incubazar.com',
  logo = 'https://incubazar.com/logo.png',
  description = "We connect visionaries and help them turn ideas into investments. India's trusted platform connecting startup founders with angel investors.",
  address = { city: 'Bangalore', country: 'India' }
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.city,
      addressCountry: address.country,
    },
    sameAs: [
      'https://twitter.com/incubazar',
      'https://linkedin.com/company/incubazar',
      'https://instagram.com/incubazar',
      'https://github.com/incubazar',
    ],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Incubazar',
    url: 'https://incubazar.com',
    description: "We connect visionaries and help them turn ideas into investments. India's trusted startup-investor connection platform.",
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://incubazar.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

