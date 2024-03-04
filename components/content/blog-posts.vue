<template>
    <slot :posts="posts">
        <section class="not-prose font-mono">
            <div class="column text-gray-400 text-sm">
                <div>date</div>
                <div>title</div>
            </div>
            <ul>
                <li
                    v-for="post in posts"
                    :key="post._path"
                >
                    <NuxtLink
                        :to="post._path"
                        class="column group hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <div :class="[post.displayYear ? 'text-gray-400 dark:text-gray-500' : 'text-white group-hover:text-gray-100 dark:text-gray-900 dark:group-hover:text-gray-800']">
                            {{ post.year }}
                        </div>
                        <div>{{ post.title }}</div>
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </slot>
</template>

<script setup lang="ts">
const props = defineProps({
    limit: { type: Number, default: null },
});
const { data, error, pending } = await useAsyncData(
    'blog-list',
    () => {
        const query = queryContent('/blog')
            .where({_path: {$ne: '/blog'}})
            .only(['_path', 'title', 'publishedAt'])
            .sort({'publishedAt': -1});

        if (props.limit) {
            query.limit(props.limit);
        }

        return query.find();
    }
);

let lastYear: number | null = null;
const posts = computed(() => (data.value ?? []).map(post => {
    const year = new Date(post.publishedAt).getFullYear();
    const displayYear = lastYear !== year;
    lastYear = year;
    return {...post, displayYear, year };
}));
</script>

<style scoped>
.column {
    @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700
}
</style>
