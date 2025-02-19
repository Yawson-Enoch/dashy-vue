<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import {
  DialogDescription,
  useForwardProps,
  type DialogDescriptionProps,
} from 'radix-vue';

import { cn } from '@/lib/utils';

const props = defineProps<
  DialogDescriptionProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
