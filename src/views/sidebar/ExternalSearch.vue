<template>
  <div class="external-search">
    <div class="title">
      Расширенный поиск
    </div>
    <div>
      Не выбрано
      Новые позиции
      Выгодное предложение от …

      Номер ЦЗ
      ФИО создавшего пользователя
      Заказчик
      Тип ЦЗ
      Регион поставки: г. Москва
      Дата создания ЦЗ: 15.08.2020 – 15.09.2020
      Дата предоставления ответа: 15.08.2020 – 15.09.2020
      Предполагаемая дата поставки: 15.08.2020 – 15.09.2020
      <v-btn
        class="ml-auto"
        depressed
      >
        Сохранить активный поиск
      </v-btn>
    </div>
    <div class="wizard__actions">
      <v-btn
        class="ml-auto"
        depressed
        color="primary"
      >
        Применить
      </v-btn>
      <v-btn
        class="ml-auto"
        depressed
      >
        Сбросить
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExternalSearch',
};
</script>

<style lang="scss">
  .external-search {
  }
</style>
