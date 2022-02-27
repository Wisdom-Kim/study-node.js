<template>
	<div class="feeds">
		<div class="head"><TheHeaderVue :color="black" /></div>

		<div class="wishlists__container">
			<div class="wishes__title">
				<h1>위시리스트</h1>
			</div>
			<div class="wishes__textbox">
				<input
					type="text"
					class="feeds__input"
					v-model="content"
					placeholder="가고 싶은 것, 하고 싶은 것을 적어보세요!."
				/>
			</div>
			<div class="btn">
				<input type="button" class="attachimage" @click="onSubmit" value="제출" style="display: inline" />
			</div>
			<TheWishCard v-for="feed in feeds" :key="feed.id" :feed="feed" />
		</div>
	</div>
</template>

<style scoped>
	.feeds {
		padding-top: 140px;
		background: #ededed;
	}
	.wishlists__container {
		width: 600px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.wishes__title {
		align-self: flex-start;
		width: 100%;
		padding-bottom: 18px;
		border-bottom: 1px solid #191919;
		margin-bottom: 50px;
	}
	.wishes__textbox {
		background: #fff;
		align-self: center;
		width: 500px;
		padding-bottom: 18px;
		margin-bottom: 20px;
		border-radius: 10px;
	}
	.wishes__title h1 {
		text-align: left;
		font-size: 36px;
		font-weight: 700;
	}
	.feeds__input {
		border: none;
		box-sizing: border-box;
		width: 100%;
		overflow: hidden;
		font-size: 20px;
		border-radius: 10px;
	}
	.feeds__input::placeholder {
		color: #767676;
	}
	.feeds__input:focus {
		outline: none;
	}
	.feeds__textbox {
		width: 100%;
		height: 100px;
		padding: 15px 20px;
		box-sizing: border-box;
		border-radius: 8px;
		background: #fff;
		box-shadow: 1px 1px 2px #00000029;
	}
	.btn {
		display: flex;
		justify-content: space-between;
	}
</style>

<script>
	import TheWishCard from "../components/WishList/WishListCard.vue";
	import TheHeaderVue from "../components/TheHeader.vue";

	export default {
		name: "Wishes",
		data() {
			return {
				black: "#191919",
				content: "",
				selectedFile: "",
				searchContent: "",
				Url: "https://honsuri-backend.herokuapp.com/post?keyword=",
				keywordUrl: "", //댓글쓰기 누르면 반복문을 멈추고 피드가 하나만 보이도록 하기 위함
			};
		},
		computed: {
			wishes() {
				return this.$store.state.wishes;
			},
		},
		components: {
			TheHeaderVue,
			TheWishCard,
		},
		methods: {
			onInputImage: function () {
				this.selectedFile = this.$refs.feedImage.files[0];
				console.log(this.$refs.feedImage.files[0]);
			},
			onSubmit: function () {
				this.$store.dispatch("POST_WISH", { content: this.content, image: this.selectedFile });
			},
		},
		mounted() {
			this.$store.dispatch("GET_WISHES");
		},
	};
</script>
