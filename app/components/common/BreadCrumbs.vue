<template>
  <nav class="breadcrumb is-hidden-desktop" aria-label="breadcrumbs">
    <ul>
      <li>
        <a role="button" aria-label="Назад" @click="$router.back()">
          <b-icon icon="arrow-left-line" />
          Назад
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb .icon {
  margin-left: 0;
}
</style>
