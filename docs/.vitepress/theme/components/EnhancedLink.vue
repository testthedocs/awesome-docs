<template>
  <a
    v-if="!metadata && !customTitle"
    :href="url"
    class="enhanced-link enhanced-link--fallback"
    target="_blank"
    rel="noopener noreferrer"
  >
    {{ url }}
  </a>
  <a
    v-else
    :href="url"
    :class="['enhanced-link', `enhanced-link--${layout}`]"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="displayTitle || url"
  >
    <div class="enhanced-link__icon">
      <img
        v-if="displayIcon"
        :src="displayIcon"
        :alt="`${displayTitle} logo`"
        class="enhanced-link__logo"
        loading="lazy"
        decoding="async"
        @error="handleImageError"
      />
      <component
        v-else
        :is="placeholderIcon"
        class="enhanced-link__placeholder"
      />
    </div>
    <div class="enhanced-link__content">
      <div class="enhanced-link__title">{{ displayTitle }}</div>
      <div v-if="displayDescription && layout !== 'inline'" class="enhanced-link__description">
        {{ displayDescription }}
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMetadata } from '../composables/useMetadata';
import { selectIconForUrl } from '../composables/useIconSelection';
import LinkIcon from './icons/LinkIcon.vue';
import CodeIcon from './icons/CodeIcon.vue';
import BookIcon from './icons/BookIcon.vue';
import VideoIcon from './icons/VideoIcon.vue';

interface Props {
  url: string;
  layout?: 'card' | 'inline' | 'compact';
  title?: string;
  description?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'card',
});

const { metadata } = useMetadata(props.url);
const imageError = ref(false);

const displayTitle = computed(() => {
  return props.title || metadata.value?.title || new URL(props.url).hostname;
});

const displayDescription = computed(() => {
  return props.description || metadata.value?.description || null;
});

const displayIcon = computed(() => {
  if (imageError.value) return null;
  return props.icon || metadata.value?.image || metadata.value?.favicon || null;
});

const placeholderIcon = computed(() => {
  const iconType = selectIconForUrl(props.url);
  switch (iconType) {
    case 'code':
      return CodeIcon;
    case 'book':
      return BookIcon;
    case 'video':
      return VideoIcon;
    default:
      return LinkIcon;
  }
});

const customTitle = computed(() => !!props.title);

function handleImageError() {
  imageError.value = true;
}
</script>

<style scoped>
.enhanced-link {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  background-color: var(--vp-c-bg-soft);
}

.enhanced-link:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-alt);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.enhanced-link:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* Card layout (default) */
.enhanced-link--card {
  flex-direction: row;
}

.enhanced-link--card .enhanced-link__icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
}

/* Inline layout */
.enhanced-link--inline {
  display: inline-flex;
  padding: 0.5rem 0.75rem;
  gap: 0.5rem;
  vertical-align: middle;
}

.enhanced-link--inline .enhanced-link__icon {
  width: 20px;
  height: 20px;
}

.enhanced-link--inline .enhanced-link__title {
  font-size: 0.95em;
}

/* Compact layout */
.enhanced-link--compact {
  padding: 0.75rem;
  gap: 0.75rem;
}

.enhanced-link--compact .enhanced-link__icon {
  width: 32px;
  height: 32px;
}

/* Icon styles */
.enhanced-link__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.enhanced-link__logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.enhanced-link__placeholder {
  width: 100%;
  height: 100%;
}

/* Content styles */
.enhanced-link__content {
  flex: 1;
  min-width: 0;
}

.enhanced-link__title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.enhanced-link__description {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fallback link */
.enhanced-link--fallback {
  display: inline;
  padding: 0;
  border: none;
  background: none;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.enhanced-link--fallback:hover {
  transform: none;
  box-shadow: none;
  background: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .enhanced-link--card {
    flex-direction: column;
  }

  .enhanced-link--card .enhanced-link__icon {
    width: 40px;
    height: 40px;
  }

  .enhanced-link {
    padding: 0.875rem;
  }
}
</style>
