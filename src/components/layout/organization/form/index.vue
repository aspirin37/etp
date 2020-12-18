<template>
  <v-sheet>
    <v-form @submit.prevent="save">
      <v-expansion-panels
        v-model="contentPanels"
        flat
        multiple
      >
        <organization-form-basic
          :form="form"
          :mode="mode"
        />
        <organization-form-bank
          :form="form"
          :mode="mode"
        />
        <organization-form-ceo
          :form="form"
          :mode="mode"
        />
        <organization-form-contact
          :form="form"
          :mode="mode"
        />
        <organization-form-account
          :form="form"
          :mode="mode"
        />
      </v-expansion-panels>
      <v-divider />
      <v-btn
        v-if="mode === 'view'"
        class="ma-8"
        color="primary"
        depressed
        @click="$emit('edit')"
      >
        Редактировать
      </v-btn>
      <div
        v-else-if="mode === 'edit'"
        class="d-flex justify-space-between"
      >
        <div class="d-inline-flex ma-8">
          <v-btn
            class=""
            depressed
            @click="toView"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            color="primary"
            depressed
            type="submit"
          >
            Сохранить
          </v-btn>
        </div>
        <v-btn
          class="ma-8"
          depressed
          @click="remove"
        >
          Удалить профиль
        </v-btn>
      </div>
    </v-form>
    <delete-organization-modal
      v-if="deleteModal"
      v-model="deleteModal"
      @submit="onDelete"
    />
  </v-sheet>
</template>

<script>
import { get, isNil } from 'lodash-es';
import DeleteOrganizationModal from '@/components/modals/DeleteOrganization.vue';
import OrganizationFormBasic from './basic.vue';
import OrganizationFormBank from './bank.vue';
import OrganizationFormCeo from './ceo.vue';
import OrganizationFormContact from './contact.vue';
import OrganizationFormAccount from './account.vue';

export default {
  name: 'OrganizationForm',
  components: {
    DeleteOrganizationModal,
    OrganizationFormBasic,
    OrganizationFormBank,
    OrganizationFormCeo,
    OrganizationFormContact,
    OrganizationFormAccount,
  },
  model: {
    prop: 'form',
  },
  props: {
    form: Object,
    mode: String,
  },
  data: () => ({
    contentPanels: [0, 1, 2, 3, 4],
    deleteModal: false,
  }),
  methods: {
    getField(field, defaultValue = '—') {
      const value = get(this.form, field);
      if (isNil(value)) {
        return defaultValue;
      }
      return value;
    },
    onDelete() {
      console.warn('@delete API'); // eslint-disable-line no-console
    },
    toView() {
      this.$router.push({ name: 'Organization' });
    },
    remove() {
      this.deleteModal = true;
    },
    save() {
      console.warn('@save'); // eslint-disable-line no-console
    },
  },
};
</script>

<style lang="sass">
</style>
