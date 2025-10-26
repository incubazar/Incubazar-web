/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['pdf-lib'],
  
  images: {
    domains: ['localhost', 'supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  async redirects() {
    return [
      // Redirect Vercel subdomain to custom domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'incubazar.vercel.app',
          },
        ],
        destination: 'https://incubazar.com/:path*',
        permanent: true,
      },
      // Also handle www subdomain redirect if needed
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.incubazar.vercel.app',
          },
        ],
        destination: 'https://incubazar.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
