# [Vue Chart](https://cinwell.com/vue-trend/)

Asyncronous calls is vital in modern development. This clean example from jsfiddle shows how to send a async call with a one second delay. 

## Usage

```javascript

Vue.component('async-example', function (resolve, reject) {
  console.log('resolving component...')
  setTimeout(function () {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})


// New VueJS instance
var app = new Vue({
	// CSS selector of the root DOM element
  el: '#app',
  // Some data
  data: () => ({
    show: false,
  }),
})
```

```html
// Includes
<!-- Include the library in the page -->
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <button @click="show ^= 1">Toggle</button>
  <async-example v-if="show"/>
</div>
```

https://jsfiddle.net/Akryum/ft0dmoex/
