<template>
  <v-row
    id="organization-header"
    class="page__header"
  >
    <v-col>
      <v-sheet>
        <v-chip
          class="ma-6"
          color="green"
          small
          text-color="white"
        >
          Компания проверена
        </v-chip>
        <v-img
          class="rounded-circle"
          height="100"
          width="100"
          src="@/assets/images/lukoil-example.jpg"
        />
        <h3>ПАО «Нефтяная компания Лукойл»</h3>
        <a href="lukoil.ru">lukoil.ru</a>
        <v-divider />
        <v-container
          class="grey lighten-5 mb-6"
        >
          <v-row
            align="center"
            align-content="center"
            justify="center"
          >
            <v-col>
              ЦЗ создано
              <p class="primary--text">
                234
              </p>
            </v-col>
            <v-col>
              Ответов на ЦЗ
              <p class="primary--text">
                989
              </p>
            </v-col>
            <v-col>
              Создано позиций
              <p class="primary--text">
                22 009
              </p>
            </v-col>
            <v-col>
              Ответов на позиций
              <p class="primary--text">
                7 002
              </p>
            </v-col>
            <v-col>
              Выиграно ЦЗ
              <p class="primary--text">
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
export default {

};
</script>

<style lang="scss">
#organization-header {
  height: 400px;
}
</style>
