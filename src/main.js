import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import { createApp } from 'vue'
import liff from '@line/liff';
import router from "./Router/Router";

async function LiffInit() {
    await liff.init({
        liffId: '2006768109-93myxPab',
    }).then(() => {
        if (!liff.isLoggedIn()) {
            liff.login({redirectUri:"https://x1423221.github.io/MySharing/"});
        }
    }).catch((err) => {

        console.log(err.code, err.message);
    });
}

LiffInit().then(() => {
    const app = createApp(App);

    app.use(router)
    app.mount('#app')
});

