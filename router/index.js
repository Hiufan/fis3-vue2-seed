import VueRouter from 'vue-router'

import Home from '../views/home/home'
import About from '../views/about/about'
const Default = { template: '<div class="default">default</div>' }
const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }

const router = new VueRouter({
	base: __dirname,
	routes: [
		{ path: '/', component: Home },
		{ path: '/default', component: Default },
		{ path: '/foo', component: Foo },
		{ path: '/bar', component: Bar },
		{ path: '/about', component: About}
	]
})

export default router

// export default {
//   '/': 'Home',
//   '/about': 'About'
// }