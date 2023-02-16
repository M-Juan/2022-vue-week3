import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2'; 
const path = 'mjweek2';

let productModal = null;
let delProductModal = null;

const app={
  //資料
    data() {
      return {
        products: [],
        //單一產品資訊
        tempProduct:{
            imagesUrl:[],
        },

        isNew:false,
      }
    },

    //方法
    methods:{

        //取得產品
      getProducts(){
        axios.get(`${url}/api/${path}/admin/products`)
        .then((res)=>{
          this.products=res.data.products;
          console.log(this.products);
        })
        .catch((err)=>{
          alert(err.data.message);
        })
      },

      //更新產品
      updateProduct(){
        //用this.isNew判斷api運行
        let updateProductUrl=`${url}/api/${path}/admin/product`;
        let method=`post`;

        if(!this.isNew){
            //不是新增時執行
            updateProductUrl=`${url}/api/${path}/admin/product/${this.tempProduct.id}`;
            method=`put`;
        }

        axios[method](updateProductUrl,{data:this.tempProduct})
        .then((res)=>{
            //重新取得產品列表
            this.getProducts();
            alert(`新增產品成功`)


            //更新完關閉model
            productModal.hide();
        })
        .catch((err)=>{
          alert(err.data.message);
        })
      },

      openModel(status,product){
        if(status==="create"){
            productModal.show();
            this.isNew=true;
            //帶入初始化資料
            this.tempProduct={
                imagesUrl:[],
            }


        } else if(status==="edit"){
            productModal.show();
            this.isNew=false;
            //帶入要編輯的資料
            this.tempProduct={...product}
        } else if(status==="delete"){
          delProductModal.show();
          this.tempProduct={...product}//取id用


        }
      },

      //刪除單一品項
      deleteProduct(){
        axios.delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
        .then((res)=>{
          this.getProducts();
          alert(`刪除成功`)
          delProductModal.hide();//openModel有打開，在此關閉
        })
        .catch((err)=>{
          alert(err.data.message);
        })
      },

      createImages() {
        this.tempProduct.imagesUrl = [];
        this.tempProduct.imagesUrl.push('');
      },

    },

    mounted(){
      //取出存在cookie的token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)mjweek2\s*\=\s*([^;]*).*$)|^.*$/, "$1");

      //發出請求headers預設帶入token
      axios.defaults.headers.common['Authorization'] = token;
      this.getProducts();


      //先初始化new
      productModal = new bootstrap.Modal("#productModal");
      //再呼叫方法

      //刪除的model
      delProductModal= new bootstrap.Modal("#delProductModal");


    }
  };

createApp(app).mount('#app');