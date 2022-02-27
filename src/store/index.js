import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import api from "../api";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		bookmark: null,
		feeds: [],
		comments: [],
		account: null,
		isLiked: false,
		token: null,
		isLoggedIn: false,
		userInfo: null,
		myPosts: [],
		email: null,
		// 각 컴포넌트에서 get해서 저장할 question과 answer
		question: "",
		answer: [],
		// question id count
		qna_count: 1,
		// answer에 대한 value 저장
		dictMBTI: {
			E: 0,
			I: 0,
			S: 0,
			N: 0,
			T: 0,
			F: 0,
			P: 0,
			J: 0,
		},
		// user의 mbti 정보
		mbti_result: "",
		// true인 경우 추천 칵테일을 보여줌
		recommend: false,
		// recommend cocktail 에 대한 정보
		recommend_comment: "",
		recommend_cock_id: 999,
		recommend_cock: "",
		recommend_cock_photo: "",
	},
	mutations: {
		//feeds를 가져온다.
		SET_FEEDS(state, feeds) {
			state.feeds = feeds;
		},
		SET_COMMENTS(state, comments) {
			state.comments = comments;
		},
		LOGIN(state, payload) {
			state.isLoggedIn = true;
			state.token = payload.token;
			state.userInfo = payload.userData;
		},
		LOGOUT(state) {
			state.isLoggedIn = false;
			state.token = null;
			state.userInfo = null;
			localStorage.removeItem("token");
			router.push({ name: "Home" });
		},
		SET_USER(state, payload) {
			state.userInfo = payload.data;
		},
		SET_MYPOST(state, payload) {
			state.myPosts = payload.data;
		},
	},
	actions: {
		async GET_FEEDS({ commit, state }) {
			const response = await api.feeds(state.token);
			commit("SET_FEEDS", response.data);
		},
		async POST_FEED({ state, dispatch }, obj) {
			const formData = new FormData();
			formData.append("content", obj.content);
			formData.append("image", obj.image);
			console.log(obj.image);
			if (state.token === null) {
				alert("로그인해야합니다.");
			} else {
				const res = await api.createFeed(formData, state.token);
				if (res.status === 201) {
					dispatch("GET_FEEDS");
				}
			}
		},
		async GET_COMMENTS({ commit }, id) {
			axios.get("https://honsuri-backend.herokuapp.com/post/" + id + "/comment").then(response => {
				console.log("https://honsuri-backend.herokuapp.com/post/" + id + "/comment");
				commit("SET_COMMENTS", response.data);
			});
		},
		async POST_COMMENT({ state, dispatch }, obj) {
			const res = await api.createComments({ content: obj.content }, state.token, obj.id);
			if (res.status === 201) {
				dispatch("GET_COMMENTS", obj.id);
			}
		},
		async POST_LOGIN({ dispatch }, obj) {
			try {
				const {
					data: { token },
				} = await api.login(obj);
				if (token) {
					localStorage.setItem("token", token);
					dispatch("GET_USER");
					router.push({ name: "Home" });
				}
			} catch (e) {
				alert("아이디와 비밀번호를 확인해주세요.");
				console.warn(e);
			}
		},
		async POST_SIGNUP(_, obj) {
			try {
				const { status } = await api.createAccount(obj);
				if (status === 201) {
					router.push({ name: "SignIn" });
				}
			} catch (e) {
				console.warn(e);
			}
		},
		async GET_USER({ commit }) {
			const token = localStorage.getItem("token");
			const { data: userData } = await api.userInfo(token);
			commit("LOGIN", { token, userData });
		},
		async POST_FINDID({ state }, obj) {
			const { status, data } = await api.userFindId(obj);
			if (status === 401) {
				alert("일치하는 EMAIL이 없습니다.");
			} else if (status === 200) {
				state.email = data[0];
			}
		},
		async PATCH_USER({ state, commit }, obj) {
			try {
				const { status, data } = await api.userUpdate(obj, state.token);
				if (status === 200) {
					commit("SET_USER", { data });
				}
			} catch (e) {
				console.warn(e);
			}
		},
		async DELETE_USER({ state, commit }, obj) {
			try {
				const res = await api.userDelete(obj, state.token);
				console.log(res);
				commit("LOGOUT");
			} catch (e) {
				console.warn(e);
			}
		},
		async GET_MYPOST({ state, commit }) {
			try {
				const { status, data } = await api.userPost(state.token);
				if (status === 200) {
					commit("SET_MYPOST", { data });
				}
			} catch (e) {
				console.warn(e);
			}
		},
		async FATCH_PASSWORD({ state }, obj) {
			try {
				const { status } = await api.userPassword(obj, state.token);
				if (status === 201) {
					router.push({ name: "Me" });
				}
			} catch (e) {
				console.warn(e);
			}
		},
		async POST_LIKE({ state }, id) {
			try {
				await api.createLike(id, state.token);
			} catch (e) {
				console.warn(e);
			}
		},
	},
	modules: {},
});
