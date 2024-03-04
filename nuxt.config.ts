// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true, timeline: { enabled: true } },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
    modules: [
        ['@nuxtjs/eslint-module', { fix: true }],
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
        '@nuxt/content',
    ],
    content: {
        highlight: {
            theme: {
                default: 'min-light',
                dark: 'min-dark',
            },
        },
    },
    typescript: {
        strict: true,
    },
    colorMode: {
        classSuffix: '',
    },
    nitro: {
        prerender: {
            routes: ['/sitemap.xml']
        }
    }
});
