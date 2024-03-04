<template>
    <article class="prose dark:prose-invert max-w-none prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300">
        <ContentDoc>
            <template #not-found>
                <h1>Document not found (404)</h1>
                <p>This blog could not be found.</p>
            </template>
            <template #default="{ doc }">
                <div class="grid grid-cols-6 gap-16">
                    <div :class="[doc.toc ? 'col-span-6 md:col-span-4' : 'col-span-6']">
                        <ContentRenderer :value="doc" />
                    </div>
                    <div
                        v-if="doc.toc"
                        class="hidden md:col-span-2 md:block not-prose"
                    >
                        <aside class="sticky top-8">
                            <div class="font-semibold mb-2">
                                Table of Contents
                            </div>
                            <nav>
                                <TocLinks
                                    :links="doc.body.toc.links"
                                    :active-id="activeId"
                                />
                            </nav>
                        </aside>
                    </div>
                </div>
            </template>
        </ContentDoc>
    </article>
</template>

<script setup lang="ts">
const activeId = ref<string | null>(null);
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries.find((entry) => entry.isIntersecting);
        if (entry) {
            activeId.value = entry.target.id;
        }
    }, {
        threshold: 0.5,
        root: null
    });
    const elements = document.querySelectorAll('h2, h3');
    elements.forEach((element) => {
        observer.observe(element);
    });

    onBeforeUnmount(() => {
        elements.forEach((element) => {
            observer.unobserve(element);
        });
    });
});
</script>
