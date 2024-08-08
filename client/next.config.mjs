/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, {dev}) => {
        if (dev) {
            config.watchOptions = {
                ignored: ['**/node_modules/'],
                poll: 1000
            }
        }

        return config
    }
};

export default nextConfig;
