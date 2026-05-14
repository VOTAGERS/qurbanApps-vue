<template>
  <footer class="pc-footer">
    <div class="footer-wrapper container-fluid">
      <div class="row">
        <div class="col-sm-6 my-1">
          <p class="m-0">
            ILM Qurban &copy; {{ new Date().getFullYear() }}
          </p>
        </div>
        <div class="col-sm-6 ms-auto my-1">
          <ul class="list-inline footer-link mb-0 justify-content-sm-end d-flex">
            <li class="list-inline-item"><router-link to="/">Home</router-link></li>
            <li class="list-inline-item"><a href="#" target="_blank">Support</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
