<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { ChevronRight } from 'lucide-vue-next';
import {
  DropdownMenuSubTrigger,
  useForwardProps,
  type DropdownMenuSubTriggerProps,
} from 'radix-vue';

import { cn } from '@/lib/utils';

const props = defineProps<
  DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
        props.class,
      )
    "
  >
    <slot />
    <ChevronRight class="ml-auto h-4 w-4" />
  </DropdownMenuSubTrigger>
</template>
