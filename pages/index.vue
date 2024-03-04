<script setup lang="ts">
useSeoMeta({
    title: 'Title Home',
    description: 'Description Home',
    ogTitle: 'Og Title Home',
    ogDescription: 'Og Description Home',
    twitterTitle: 'Twitter Title Home',
    twitterCard: 'summary',
});

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png'
        },
    ],
});
</script>

<template>
    <article class="prose dark:prose-invert">
        <ContentDoc path="/" />
    </article>
</template>
