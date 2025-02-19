<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { DialogTitle, useForwardProps, type DialogTitleProps } from 'radix-vue';

import { cn } from '@/lib/utils';

const props = defineProps<
  DialogTitleProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogTitle
    v-bind="forwardedProps"
    :class="
      cn('text-lg leading-none font-semibold tracking-tight', props.class)
    "
  >
    <slot />
  </DialogTitle>
</template>
