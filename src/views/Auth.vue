<template>
  <auth-modal :value="true" />
</template>

<script>
import AuthModal from '@/components/modals/AuthModal.vue';

export default {
  name: 'Auth',
  components: {
    AuthModal,
  },
};
</script>
