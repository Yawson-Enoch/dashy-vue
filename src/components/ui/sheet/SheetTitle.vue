<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DialogTitle, type DialogTitleProps } from 'radix-vue';

import { cn } from '@/lib/utils';

const props = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogTitle
    :class="cn('text-foreground text-lg font-semibold', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
