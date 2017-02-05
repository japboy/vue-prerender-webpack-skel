<template>
  <!-- Make sure the root component has the same id as the element it's replacing -->
  <div id="app">
    <main>
      <p class="warning">{{ message }}</p>
      <p>{{ counter }}</p>
    </main>
    <aside :style="{ minHeight: `${minHeight}px` }">
      <p>{{ message }}</p>
    </aside>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        message: 'Hello, world.',
        counter: 0,
        minHeight: 0
      }
    },
    created () {
      const that = this
      setInterval(function () {
        that.$data.counter += 1
      }, 1000)
      window.addEventListener('resize', function () {
        that.$data.minHeight = window.innerHeight
      })
      this.$data.minHeight = window.innerHeight
    }
  }
</script>

<style lang="postcss">
  :root {
    --color-main: rgb(255, 0, 0);
    --color-background: rgb(200, 200, 200);
  }

  #app {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }

  main {
    box-sizing: border-box;
    padding: 10px;
    width: 80%;
  }

  .warning {
    color: var(--color-main);
  }

  aside {
    border-left: solid 1px var(--color-background);
    box-sizing: border-box;
    padding: 10px;
    width: 20%;
  }
</style>
