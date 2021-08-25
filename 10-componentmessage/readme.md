
/* This demonstrates message component functionality. It shows two different components and the ability to manipulate their data. Components are frequently used in Vue and its important to understand the fundamentals to build on later. */

## Usage

Vue.component('blog-post', {
    props: ['post'],
    template: `
    <div class="blog-post">
        <h3>{{ post.title }}</h3>
        <button v-on:click="$emit('enlarge-text')">
        Enlarge text
        </button>
        <div v-html="post.content"></div>
    </div>
})

new Vue({
    el: '#blog-posts-events-demo',
    data: {
    posts: [{
        id: 1,
        title: 'My journey with Vue'
        },
        {
        id: 2,
        title: 'Blogging with Vue'
        },
        {
        id: 3,
        title: 'Why Vue is so fun'
        }
    ],
    postFontSize: 1
    }
})

Vue.component('alert-box', {
    template: `
    <div class="demo-alert-box">
        <strong>Error!</strong>
        <slot></slot>
    </div>
})

new Vue({
    el: '#app'})

<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-on:enlarge-text="postFontSize += 0.1"
    ></blog-post>
  </div>
</div>
<br/><br/><br/><br/>

<div id="app">
<alert-box>
  Something bad happened.
</alert-box>
</div>

https://codesandbox.io/s/o4rmyj7m86
