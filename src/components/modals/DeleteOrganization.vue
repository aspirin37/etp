<template>
  <v-dialog
    v-model="visible"
    class="modal-primary"
    max-width="620px"
  >
    <v-form
      id="delete-organization-form"
      autocomplete="off"
      class="modal-primary"
      @submit.prevent="$emit('submit')"
    >
      <div class="modal-primary__header">
        <span>Удалить карточку организации</span>
        <v-btn
          icon
          dark
          @click="visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <p>
            Компания будет удалена из списка компаний, но факты деятельности компании останутся доступными для других пользователей.
          </p>
          <p>
            Действие обратимое, компанию можно восстановить. Для восстановления обратитесь к специалисту технической поддержки
          </p>
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="visible = false"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            depressed="depressed"
            color="primary"
            type="submit"
          >
            Удалить
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteOrganizationModal',
  props: {
    value: {
      type: Boolean,
    },
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss">
  #delete-organization-form {
    .modal-primary__content {
      font-weight: 300;
      font-size: 14px;
      line-height: 22px;
    }
  }
</style>
