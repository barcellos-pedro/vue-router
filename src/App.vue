<template>
  <div id="app">
    <div id="flashMessage" v-if="globalStore.flashMessage">
      {{ globalStore.flashMessage }}
    </div>
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link>
      <router-link :to="{ name: 'EventCreate' }">Create</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  inject: ['globalStore']
}
</script>

<style>
/* Global styles */
@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation: yellowfade 3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 1em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}

button {
  border: none;
  padding: 14px 18px;
  border-radius: 4px;
  background-color: #41bd84;
  color: aliceblue;
  font-weight: bold;
}

button:hover {
  cursor: pointer;
}
</style>
