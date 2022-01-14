module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
      domains: ['fakestoreapi.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products/Fall_Limited_Edition_Sneakers/999',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/products/Fall_Limited_Edition_Sneakers/999',
        permanent: true,
      },
    ]
  },
}
