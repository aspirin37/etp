<template>
  <v-row
    id="organization-header"
    class="page__header"
  >
    <v-col>
      <v-sheet>
        <v-flex class="name-with-logo">
          <div class="top-widgets">
            <v-chip
              class="ma-6"
              color="green"
              small
              text-color="white"
            >
              Компания проверена
            </v-chip>
            <a
              class="link-edit ma-6"
              href="@edit"
              @click.prevent="edit"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.1038 1.66853C13.6804 1.09196 14.5207 0.866781 15.3083 1.07782C16.0959 1.28886 16.7111 1.90405 16.9222 2.69166C17.1332 3.47927 16.908 4.31964 16.3315 4.8962L5.43806 15.7896L1 17L2.21038 12.5619L13.1038 1.66853Z"
                  stroke="#AABDCD"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.9062 4L13.7811 6.81818"
                  stroke="#AABDCD"
                  stroke-width="1.5"
                />
              </svg>
            </a>
          </div>
          <v-img
            class="rounded-circle ma-auto"
            height="100"
            width="100"
            src="@/assets/images/lukoil-example.jpg"
          />
          <!-- v-img dynamic src is bad, please research it -->
          <h3 class="mt-5 organization-header--title">
            {{ form.full_name }}
          </h3>
          <a :href="form.site">{{ form.site }}</a>
        </v-flex>
        <v-divider />
        <v-container
          class="grey lighten-5 mb-6"
        >
          <v-row
            align="center"
            align-content="center"
            justify="center"
            class="header--counters"
          >
            <v-col>
              ЦЗ создано
              <p>
                234
              </p>
            </v-col>
            <v-col>
              Ответов на ЦЗ
              <p>
                989
              </p>
            </v-col>
            <v-col>
              Создано позиций
              <p>
                22 009
              </p>
            </v-col>
            <v-col>
              Ответов на позиций
              <p>
                7 002
              </p>
            </v-col>
            <v-col>
              Выиграно ЦЗ
              <p>
                500
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
// import '@/assets/images/organization-default.jpg';

export default {
  model: {
    prop: 'form',
    event: 'changed',
  },
  props: {
    form: {
      type: Object,
      default: () => ({
        logo: '@/assets/images/organization-default.jpg',
        full_name: '—',
        site: '—',
      }),
    },
  },
  methods: {
    edit() {
      this.$router.push({ name: 'Organization-edit' });
    },
  },
};
</script>

<style lang="scss">
#organization-header {
  height: 400px;
  text-align: center;
  .name-with-logo {
    height: 280px;
    .top-widgets {
      display: flex;
      justify-content: space-between;
    }
    .organization-header--title {
      font-size: 20px;
      font-weight: 400;
      line-height: 28px;
    }
    .header--counters {
      .col {
        color: $gray;
        p {
          color: $blue;
        }
      }
    }
  }
}
</style>
