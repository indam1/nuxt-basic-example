<template>
    <div class="not-prose">
        <section>{{ msg }}</section>
        <section v-if="!pending && !error">
            <ul class="grid grid-cols-1 gap-4">
                <li
                    v-for="repo in repos"
                    :key="repo.id"
                    class="border border-gray-200 dark:border-gray-800 rounded-sm p-4 hover:bg-gray-200 dark:hover:bg-gray-800 font-mono"
                >
                    <a
                        :href="repo.html_url"
                        target="_blank"
                    >
                        <div class="flex items-center justify-between">
                            <div class="font-semibold">{{ repo.name }}</div>
                            <div>{{ repo.stargazers_count }} *</div>
                        </div>
                        <p class="text-sm">{{ repo.description }}</p>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
}

const { error, pending, data } = await useFetch<Repo[]>('https://api.github.com/users/indam1/repos');

const msg = computed(
    () => {
        if (pending.value) {
            return 'Loading...';
        }

        if (error.value) {
            return 'Something went wrong';
        }

        return 'Here we display the repos';
    }
);

const repos = computed(
    () => data.value?.sort((a, b) => b.stargazers_count - a.stargazers_count) ?? []
);
</script>
