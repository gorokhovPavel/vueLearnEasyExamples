# vbind

vbind allows an html property to mirror a javascript variable. You can think of it as setting an html variable to a javascript variable by reference so that changes to the javascript variable appear in the html variable or property.

```
<img :src="image" v-bind:alt="altText" />
```

And the Vue Javascript code changes this to

```
<img :src="./assets/vmSocks-blue.jpg" v-bind:alt="altText" />
```

by using v-binding to bing the Vue component to the html div tag and then assigning a new value to the image attribute.

https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding/
