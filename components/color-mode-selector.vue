<template>
    <div class="flex space-x-2 items-center">
        <div
            v-if="showNextModelLabel"
            class="text-gray-500 text-xs"
        >
            Change to {{ nextMode }}
        </div>
        <button
            class="hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 text-gray-500 text-4xl md:text-base"
            @click="toggleMode"
            @mouseenter="showNextModelLabel = true"
            @mouseleave="showNextModelLabel = false"
        >
            {{ nextModeIcon }}
        </button>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const showNextModelLabel = ref(false);

const modes = ['system', 'light', 'dark'];

const nextModeIcons = { system: '🌓', light: '🌕', dark: '🌑' };

const nextMode = computed(
    () => modes[(modes.indexOf(colorMode.preference) + 1) % modes.length]
);

const nextModeIcon = computed(
    () => nextModeIcons[nextMode.value]
);

const toggleMode = () => colorMode.preference = nextMode.value;
</script>
