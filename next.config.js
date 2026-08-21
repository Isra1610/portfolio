const path = require('path')
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
  // Force the CV to download instead of opening in the browser's PDF viewer.
  async headers() {
    return [
      {
        source: '/Israel_Rojas_Desarrollador_Web.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Israel_Rojas_Desarrollador_Web.pdf"',
          },
        ],
      },
    ]
  },
}