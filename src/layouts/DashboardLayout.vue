<script setup lang="ts">
import {
  HomeIcon,
  LaptopIcon,
  ListTodoIcon,
  LogOutIcon,
  MoonIcon,
  PanelLeftCloseIcon,
  PanelRightCloseIcon,
  SunIcon,
  UserIcon,
  XIcon,
} from 'lucide-vue-next';
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Button from '@/components/ui/button/Button.vue';

import { useAuthStore } from '@/stores/auth';
import { useColorMode } from '@vueuse/core';
import { DialogClose } from 'radix-vue';

const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'Tasks',
    path: '/dashboard/tasks',
    icon: ListTodoIcon,
  },
];

const isSidebarCollapsed = ref(true);

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}

const authStore = useAuthStore();

const { store: mode } = useColorMode();

const router = useRouter();
</script>

<template>
  <div class="dashboard-container min-h-dvh pr-4 max-lg:pl-4">
    <!-- header -->
    <header class="dashboard-header sticky top-0 z-10 py-4 pb-8">
      <div
        class="flex h-16 items-center justify-between rounded-xl bg-zinc-900/5 px-4 backdrop-blur-md dark:bg-zinc-900/60"
      >
        <div class="flex h-full items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                as-child
                class="flex items-center justify-center max-lg:hidden"
                @click="toggleSidebar"
              >
                <button>
                  <PanelRightCloseIcon v-if="isSidebarCollapsed" />
                  <PanelLeftCloseIcon v-else />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar' }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <!-- mobile nav -->
          <Sheet>
            <SheetTrigger>
              <button class="lg:hidden">
                <PanelRightCloseIcon />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader class="sr-only">
                <SheetTitle>Toggle mobile nav</SheetTitle>
                <SheetDescription> Toggle mobile nav </SheetDescription>
              </SheetHeader>

              <div class="container flex h-full flex-col overscroll-y-contain pb-4">
                <!-- logo and close button -->
                <div class="flex h-16 items-center justify-between">
                  <DialogClose>
                    <RouterLink to="/dashboard" class="flex h-10 items-center">
                      <img
                        alt="DashyVue Logo"
                        src="/logo.png"
                        class="bg-muted text-muted-foreground aspect-square h-full rounded-full object-cover object-center italic"
                      />
                      <p
                        class="from-foreground to-muted-foreground ml-2 bg-linear-to-r bg-clip-text text-lg font-semibold text-transparent md:text-xl"
                      >
                        DashyVue
                      </p>
                    </RouterLink>
                  </DialogClose>
                  <DialogClose>
                    <XIcon class="text-muted-foreground" />
                  </DialogClose>
                </div>

                <!-- nav links -->
                <nav class="mt-8">
                  <ul class="flex min-w-full flex-col gap-y-4">
                    <li v-for="{ icon, path, title } of links" :key="title">
                      <DialogClose class="w-full">
                        <RouterLink
                          :to="path"
                          class="text-muted-foreground hover:text-foreground dark:hover:bg-accent grid h-10 min-w-full grid-cols-[auto_1fr] items-center justify-items-start rounded-md p-2 hover:bg-zinc-900/10"
                          exact-active-class="bg-primary text-primary-foreground hover:bg-primary! hover:text-primary-foreground!"
                        >
                          <component :is="icon" />
                          <p class="ml-4">{{ title }}</p>
                        </RouterLink>
                      </DialogClose>
                    </li>
                  </ul>
                </nav>

                <!-- logout -->
                <button
                  class="text-muted-foreground hover:text-foreground dark:hover:bg-accent mt-auto grid h-10 min-w-full grid-cols-[auto_1fr] items-center justify-items-start rounded-md p-2 hover:bg-zinc-900/10"
                  @click="
                    () => {
                      authStore.logout();
                      router.push('/');
                    }
                  "
                >
                  <LogOutIcon />
                  <span class="ml-4">Log out</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="size-fit p-0 hover:bg-transparent [&_svg]:size-auto">
              <MoonIcon class="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <SunIcon
                class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
              />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <!-- sidebar -->
    <aside class="dashboard-aside sticky top-0 max-h-dvh overflow-hidden p-4 pr-8 max-lg:hidden">
      <div
        :class="[
          'flex h-full flex-col items-center rounded-xl bg-zinc-900/5 p-4 text-sm transition-[width] duration-300 ease-in-out dark:bg-zinc-900/60',
          isSidebarCollapsed ? 'w-16' : 'w-60',
        ]"
      >
        <!-- logo -->
        <RouterLink
          to="/dashboard"
          :class="['flex h-10 min-w-full items-center', isSidebarCollapsed && 'aspect-square']"
        >
          <img
            alt="DashyVue Logo"
            src="/logo.png"
            class="bg-muted text-muted-foreground aspect-square h-full truncate rounded-full object-cover object-center italic"
          />
          <p
            :class="[
              'from-foreground to-muted-foreground ml-4 bg-linear-to-r bg-clip-text text-xl font-semibold text-transparent',
              isSidebarCollapsed && 'hidden',
            ]"
          >
            DashyVue
          </p>
        </RouterLink>
        <!-- links -->
        <ul class="mt-16 flex min-w-full flex-col gap-y-4">
          <li v-for="{ icon, path, title } of links" :key="title" class="w-full">
            <TooltipProvider :disabled="!isSidebarCollapsed" :delay-duration="0">
              <Tooltip>
                <TooltipTrigger
                  as-child
                  :class="[
                    'text-muted-foreground hover:text-foreground dark:hover:bg-accent grid h-10 min-w-full grid-cols-[auto_1fr] items-center justify-items-start rounded-md p-2 hover:bg-zinc-900/10',
                    isSidebarCollapsed && 'inline-grid aspect-square',
                  ]"
                >
                  <RouterLink
                    :to="path"
                    exact-active-class="bg-primary text-primary-foreground hover:bg-primary! hover:text-primary-foreground!"
                  >
                    <component :is="icon" />
                    <p :class="['ml-4', isSidebarCollapsed && 'hidden']">{{ title }}</p>
                  </RouterLink>
                </TooltipTrigger>
                <TooltipContent side="right" :side-offset="10">
                  <p>{{ title }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
        <!-- togglers -->
        <DropdownMenu>
          <DropdownMenuTrigger
            :class="[
              'text-muted-foreground hover:text-foreground dark:hover:bg-accent mt-auto grid h-10 min-w-full grid-cols-[auto_1fr] items-center justify-items-start rounded-md p-2 hover:bg-zinc-900/10',
              isSidebarCollapsed && 'inline-grid aspect-square',
            ]"
          >
            <UserIcon />
            <p :class="['ml-4', isSidebarCollapsed && 'hidden']">{{ authStore.username }}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" :side-offset="10">
            <div class="grid grid-cols-3 rounded-md bg-zinc-900/5 p-2 dark:bg-zinc-900/60">
              <DropdownMenuItem
                :class="[
                  'text-muted-foreground grid place-items-center gap-y-0.5',
                  mode === 'light' && 'text-foreground',
                ]"
                @select="mode = 'light'"
              >
                <SunIcon />
                <p>Light</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                :class="[
                  'text-muted-foreground grid place-items-center gap-y-0.5',
                  mode === 'dark' && 'text-foreground',
                ]"
                @select="mode = 'dark'"
              >
                <MoonIcon />
                <p>Dark</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                :class="[
                  'text-muted-foreground grid place-items-center gap-y-0.5',
                  mode === 'auto' && 'text-foreground',
                ]"
                @select="mode = 'auto'"
              >
                <LaptopIcon />
                <p>System</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              @select="
                () => {
                  authStore.logout();
                  router.push('/');
                }
              "
              >Log out</DropdownMenuItem
            >
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
    <!-- main content -->
    <main class="dashboard-main">
      <RouterView />
    </main>
    <!-- footer -->
    <footer class="dashboard-footer py-4 pt-8">
      <div
        class="flex h-16 items-center justify-center rounded-xl bg-zinc-900/5 dark:bg-zinc-900/60"
      >
        <p class="text-muted-foreground">
          Built by&nbsp;
          <a
            href="https://x.com/gybex_enock"
            class="text-foreground underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GyBex
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>
