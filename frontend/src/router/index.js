import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
	},
	//회원가입
	{
		path: "/users/join-user",
		name: "SignIn",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "signin" */ "../views/Auth/SignIn.vue"),
	},
	//로그인
	{
		path: "/users/login-user",
		name: "SignUp",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "signin" */ "../views/Auth/SignUp.vue"),
	},
	//로그아웃
	{
		path: "/users/logout-user",
		name: "SignOut",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "signin" */ "../views/Auth/SignOut.vue"),
	},
	{
		path: "/wishlists",
		name: "Wishlist",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "wishlust" */ "../views/Wishlist.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
