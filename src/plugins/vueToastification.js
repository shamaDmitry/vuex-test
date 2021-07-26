import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__fade",
  timeout: 1500
};

Vue.use(Toast, options);

export default Vue;