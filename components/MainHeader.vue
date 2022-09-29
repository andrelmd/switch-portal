<template>
  <div class="main-header-wrapper">
    <img src="../static/icon.png" alt="switch-portal" />
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/devices">Dispositivos</NuxtLink>
    </nav>
  </div>
</template>
<script lang="ts"></script>
<style>
.main-header-wrapper {
  width: 100%;
  height: 100px;
  background-color: rgb(6, 64, 112);
  display: flex;
  flex-direction: row;
}
</style>
