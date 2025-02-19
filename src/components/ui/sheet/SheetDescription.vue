<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue';

import { cn } from '@/lib/utils';

const props = defineProps<
  DialogDescriptionProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogDescription
    :class="cn('text-muted-foreground text-sm', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogDescription>
</template>
