<template>
	<div class="home">
		<full-page ref="fullpage" :options="options" id="fullpage">
			<SectionMainVue />
		</full-page>
	</div>
</template>

<style></style>

<script>
	// @ is an alias to /src
	import SectionMainVue from "../components/home/SectionMain.vue";

	export default {
		name: "Home",
		data: function () {
			return {
				options: {
					licenseKey: "YOUR_KEY_HEERE",
					anchors: ["01", "02", "03", "04", "05"],
					navigation: true,
					scrollBar: false,
				},
			};
		},
		methods: {},
		components: {
			SectionMainVue,
		},
	};
</script>
