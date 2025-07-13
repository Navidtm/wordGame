<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app';

const emit = defineEmits<{
  refresh: [];
}>();

defineProps<{
  status: AsyncDataRequestStatus;
}>();
</script>
<template>
  <div class="">
    <div v-if="status == 'success'">
      <slot></slot>
    </div>
    <div
      v-else-if="status == 'error'"
      class="text-center flex justify-center items-center gap-4"
    >
      <div class="">خطا</div>
      <UButton
        type="button"
        color="error"
        @click="emit('refresh')"
      >
        تلاش مچدد
      </UButton>
    </div>
  </div>
</template>
