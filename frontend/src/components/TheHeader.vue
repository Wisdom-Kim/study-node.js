<template>
	<header class="full__container">
		<div class="header__gnb" :style="style">
			<router-link to="/">
				<span>WHISHLOG</span>
			</router-link>
			<div class="gnb__menu">
				<router-link to="/wishlist">
					<span>위시리스트</span>
				</router-link>
			</div>
		</div>
		<div class="header__sign" :style="style">
			<div v-if="!isLoggedIn">
				<router-link to="/users/login-user">로그인</router-link>
				<router-link to="/users/join-user">회원가입</router-link>
			</div>
			<div v-else>
				<span class="logout__btn" @click="LOGOUT">로그아웃</span>
			</div>
		</div>
	</header>
</template>

<style scoped>
	header {
		top: 0;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 9;
	}
	header a {
		text-decoration: none;
		color: var(--color);
		font-size: 18px;
		cursor: pointer;
	}
	.header__gnb {
		display: flex;
		justify-content: flex-start;
		gap: 100px;
	}
	.header__gnb > a {
		font-size: 34px;
		font-weight: 700;
	}
	.gnb__menu {
		display: flex;
		gap: 30px;
		align-items: center;
	}
	.header__sign div {
		display: flex;
		gap: 30px;
	}
	.logout__btn {
		color: var(--color);
		font-size: 18px;
		cursor: pointer;
	}
</style>

<script>
	import { mapMutations } from "vuex";
	export default {
		name: "TheHeader",
		props: ["color"],
		computed: {
			style() {
				return { "--color": this.color };
			},
		},
		methods: {
			...mapMutations(["LOGOUT"]),
		},
	};
</script>
