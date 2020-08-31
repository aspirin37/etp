<template>
  <v-dialog
    v-model="visible"
    max-width="620px"
  >
    <okpd2-modal
      v-model="okpd2ModalVisible"
      @submit="onOkpd2Select"
    />
    <v-form
      ref="form"
      class="modal-primary"
      @submit.prevent="onSubmit"
    >
      <div class="modal-primary__header">
        <span>Новая позиция</span>
        <v-btn
          icon="icon"
          dark="dark"
          @click="onClose"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      <div class="modal-primary__wrapper">
        <div class="modal-primary__content">
          <v-text-field
            v-model="position.name"
            class="mb-5 required"
            label="Наименование позиции контрагента"
            hide-details="hide-details"
            outlined="outlined"
          />
          <v-autocomplete
            v-model="position.okei"
            class="mb-5 required"
            :items="okeiList"
            label="Единицы измерения"
            item-text="fullName"
            item-value="id"
            hide-details="hide-details"
            outlined="outlined"
          />
          <div @click="okpd2ModalVisible = true">
            <v-text-field
              class="mb-5 text-field--link"
              :value="position.okpd2.name"
              append-icon="reorder"
              label="ОКПД2"
              hide-details="hide-details"
              outlined="outlined"
              readonly="readonly"
            />
          </div>
          <v-textarea
            v-model="position.description"
            label="Комментарий"
            hide-details="hide-details"
            outlined="outlined"
          />
        </div>
        <div class="modal-primary__actions">
          <v-btn
            class="ml-auto"
            depressed="depressed"
            @click="onClose"
          >
            Отмена
          </v-btn>
          <v-btn
            class="ml-2"
            depressed="depressed"
            color="primary"
            type="submit"
          >
            Сохранить
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
import getOkei from '@/utilities/dictionaries/okei';
import Okpd2Modal from '@/components/modals/Okpd2Modal.vue';

export default {
  name: 'PositionModal',
  components: {
    Okpd2Modal,
  },
  props: {
    value: {
      type: Boolean,
    },
    positionEdited: {
      type: Object,
    },
  },
  data() {
    return {
      okpd2ModalVisible: false,
      okeiList: [],
      position: {
        id: '',
        name: '',
        description: '',
        okpd2: {
          id: '',
          name: '',
        },
        okei: {
          id: '',
          fullName: '',
        },
      },
    };
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
  watch: {
    positionEdited(value) {
      if (value) {
        this.position = JSON.parse(JSON.stringify(value));
      }
    },
  },
  async created() {
    const okeiList = await getOkei();
    this.okeiList = okeiList.map((item) => ({
      id: item.id,
      fullName: item.name.national,
    }));
  },
  methods: {
    reset() {
      Object.assign(this.$data.position, this.$options.data().position);
    },
    onClose() {
      this.visible = false;
      this.reset();
    },
    async onSubmit() {
      this.$emit('submit', this.position);
      this.reset();
    },
    onOkpd2Select(item) {
      this.position.okpd2 = item;
    },
  },
};
</script>
