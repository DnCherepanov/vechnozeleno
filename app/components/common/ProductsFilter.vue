<template>
  <section class="pt-4">
    <div class="filterSort">
      <a class="filterSort__button" role="button" @click="open = true">
        Фильтр
        <span v-show="checkboxGroup.length">
          ( {{ checkboxGroup.length }} )
          <b-icon type="is-primary" icon="check"></b-icon>
        </span>
      </a>
      <b-field class="filterSort__button">
        <b-select
          v-model="sortValue"
          placeholder="Сортировка"
          @input="$emit('update:sortValue', sortValue)"
        >
          <option
            v-for="option in sortData"
            :key="option.id"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
      <b-sidebar
        v-model="open"
        :fullheight="true"
        mobile="fullwidth"
        :overlay="true"
      >
        <section class="p-4">
          <div class="sidebar__header">
            <h2 class="has-text-centered pb-4">Фильтр</h2>
            <a role="button" @click="open = false">
              <b-icon icon="close-line" />
            </a>
          </div>
          <div class="sidebar__content">
            <b-checkbox-button
              v-for="category in categories"
              :key="category._id"
              v-model="checkboxGroup"
              type="is-white"
              :native-value="category.slug"
              @input="$emit('update:checkboxGroup', checkboxGroup)"
            >
              <span>{{ category.title }}</span>
              <b-icon icon="check-line"></b-icon>
            </b-checkbox-button>
          </div>
          <b-button type="is-dark" class="mt-4" expanded @click="open = false">
            Смотреть товары
          </b-button>
        </section>
      </b-sidebar>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      sortValue: null,
      checkboxGroup: [],
      sortData: [
        {
          label: 'Новинки',
          value: 'new',
        },
        {
          label: 'Цена ↓',
          value: 'priceLow',
        },
        {
          label: 'Цена ↑',
          value: 'priceHigh',
        },
      ],
    }
  },
}
</script>
