import { useRouter } from "vue-router";

export const gotoHome = () => {
    const router = useRouter();
    router.push("/");
};
