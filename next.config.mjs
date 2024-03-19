/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**', // This allows all paths under "res.cloudinary.com"
          },
        ],
      },    
};

export default nextConfig;
