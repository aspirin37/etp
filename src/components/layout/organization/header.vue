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
              :color="form.checked ? 'green' : 'orange'"
              small
              text-color="white"
            >
              Компания{{ form.checked ? ' ' : ' не ' }}проверена
            </v-chip>
            <a
              class="link-edit ma-6 no-underline"
              :href="mode !== 'edit' ? '@edit' : '@cancel'"
              @click.prevent="mode !== 'edit' ? $emit('edit') : $emit('cancel')"
            >
              <svg-icon
                v-if="mode !== 'edit'"
                name="pencil"
              />
              <v-icon v-else>mdi-close</v-icon>
            </a>
          </div>
          <div class="logo-holder ma-auto">
            <v-img
              class="rounded-circle"
              height="100"
              width="100"
              src="@/assets/images/lukoil-example.jpg"
            />
            <a
              v-if="mode === 'edit'"
              class="logo-uploader-trigger"
              href="@uploadLogo"
              @click.prevent
            >
              <svg-icon name="photo" />
            </a>
          </div>
          <!-- v-img dynamic src is bad, please research it -->
          <h3 class="mt-5 organization-header--title">
            {{ form.full_name }}
          </h3>
          <a
            :href="form.site"
            target="_blank"
          >
            {{ form.site }}
          </a>
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
              <span>ЦЗ создано</span>
              <p>234</p>
            </v-col>
            <v-col>
              <span>Ответов на ЦЗ</span>
              <p>989</p>
            </v-col>
            <v-col>
              <span>Создано позиций</span>
              <p>22 009</p>
            </v-col>
            <v-col>
              <span>Ответов на позиций</span>
              <p>7 002</p>
            </v-col>
            <v-col>
              <span>Выиграно ЦЗ</span>
              <p>500</p>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
// import '@/assets/images/organization-default.jpg';
import SvgIcon from '@/components/common/SvgIcon.vue';

export default {
  components: {
    SvgIcon,
  },
  model: {
    prop: 'form',
    event: 'changed',
  },
  props: {
    form: {
      type: Object,
      default: () => ({
        checked: false,
        logo: '@/assets/images/organization-default.jpg',
        full_name: '—',
        site: '—',
      }),
    },
    mode: String,
  },
};
</script>

<style lang="scss">
#organization-header {
  text-align: center;
  .v-chip {
    border-radius: 6px;
    padding: 0 6px;
    height: 20px
  }
  .v-sheet {
    height: 400px;
    .name-with-logo {
      height: 280px;
      .top-widgets {
        display: flex;
        justify-content: space-between;
        height: 80px;
      }
      .organization-header--title {
        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
      }
      .logo-holder {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: #fff;
        .logo-uploader-trigger {
          position: absolute;
          bottom: 0;
          right: 0;
          height: 30px;
          width: 30px;
          background-color: #fff;
          border-radius: 50%;
          padding: 6px;
          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .header--counters {
      .col {
        span {
          font-size: 13px;
          line-height: 22px;
          color: $gray;
        }
        p {
          font-weight: 300;
          font-size: 35px;
          line-height: 27px;
          color: $blue;
          margin-bottom: 0;
          padding-top: .5em;
        }
      }
    }
  }
}
</style>
