
import{createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js"

const url = 'https://vue3-course-api.hexschool.io/v2'; 

const app={
    //資料
    data(){
        return{
            user:{
                username:'',
                password:'',
            }
        }
    },
    //方法
    methods:{
        login(){
            axios.post(`${url}/admin/signin`,this.user)
            .then((res)=>{
                const {token,expired}=res.data;
                //取出token跟expired

                //將token跟expired存到cookie
                document.cookie = `mjweek2=${token}; expires=${new Date(expired)};`;

                //轉址到第2周頁面
                window.location="./product.html";

            })
            .catch((err)=>{
                alert(`${err.data.message}，請重新登入`);

                //登入失敗 轉回登入頁
                window.location="./login.html";

            })

        }

    },


};
createApp(app).mount("#app")

