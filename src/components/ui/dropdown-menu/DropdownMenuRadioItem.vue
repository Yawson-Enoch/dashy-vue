<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { Circle } from 'lucide-vue-next';
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  useForwardPropsEmits,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
} from 'radix-vue';

import { cn } from '@/lib/utils';

const props = defineProps<
  DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }
>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Circle class="h-2 w-2 fill-current" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
