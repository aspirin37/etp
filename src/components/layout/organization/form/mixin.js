import { getField } from '@/utilities/form';

export default {
  props: {
    form: Object,
    mode: String,
  },
  computed: {
    view: ({ mode }) => mode === 'view',
  },
  methods: {
    getField,
  },
};
