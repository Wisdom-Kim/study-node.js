<template>
	<div class="section section__main">
		<TheHeaderVue :color="white" />
		<div class="full__container bg__container">
			<h1>WHISHLOG</h1>
			<h4>공간은 개개인에게 또 하나의 추억으로 다가옵니다.<br />당신의 발자취를 추억들로 남겨주세요</h4>
		</div>

	</div>
</template>

<style scoped>
	.section__main {
		background: center/cover no-repeat url("../../assets/bgMain.jpg");
		position: relative;
	}
	.section__main::before {
		content: "";
		opacity: 0.4;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background-color: #000;
	}
	.bg__container {
		text-align: left;
		color: #f2f2f2;
	}
	.bg__container h1 {
		font-size: 60px;
		font-weight: 700;
		margin-bottom: 30px;
		line-height: 1.2;
	}
	.bg__container h4 {
		font-size: 20px;
	}
</style>

<script>
	import TheHeaderVue from "../TheHeader.vue";

	export default {
		name: "SectionMain",
		components: {
			TheHeaderVue,
		},
		data: function () {
			return {
				isActive: false,
				white: "#ffffff",
			};
		},
	};
</script>
