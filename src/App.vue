<template>
  <section id="app">
    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

  body { font-family: 'Montserrat', sans-serif; background: #fafafa; }
  .container { max-width: 100%; width: 100%; padding: 0 15px; display: grid; grid-template-columns: 350px 1fr; grid-gap: 30px; }
  .container .card-title { font-size: 1.2em; font-weight: 600;  }
  .container [type="checkbox"]:checked:disabled+span:before { border-right: 2px solid #26a69a; border-bottom: 2px solid #26a69a; }
  .container section { margin-bottom: 3em; }
  .alert { border-radius: 0; border-width: 4px 0 0 0; border-style: solid; color: #fff; display: flex; font-size: 14px; margin: 4px auto 15px; padding: 16px; position: relative; transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1); border-color: rgba(0,0,0,0.12) !important; font-weight: 600; }
  .alert-danger { background-color: #f44336 !important; }
  .alert-success { background-color: #4caf50 !important; }
  .overflow { display: none; position: fixed; top: 0; left: 0; width: 100%; min-height: 100vh; height: 100%; background: rgba(0, 0, 0, 0.486); z-index: 998; }
  .modal { top: 50px; left: 0; right: 0; z-index: 999; max-height: 100%; }
  .modal .row { margin-bottom: 0; }
  .modal .row.mb { margin-bottom: 2em; }
</style>
