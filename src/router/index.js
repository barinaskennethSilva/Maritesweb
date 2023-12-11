import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import firebase from 'firebase/compat/app';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
{
        path: "/login",
        name: "Login_form", 
        component: () => import("../views/login.vue")
    },
    {
        path: "/signup",
        name: "Signup_form", 
        component: () => import("../views/signup.vue")
    },
            {
        path: "/Create_Room",
        name: "Create_Room", 
        component: () => import("../views/CreateRoom.vue"),
        meta: {
  hideNavbar: true,
 }
    },
        {
        path: "/main_form",
        name: "main_form", 
        component: () => import("../views/Main.vue"),
        meta: {
  hideNavbar: true,
 }
    },
            {
        path: "/header_main",
        name: "header_main", 
        component: () => import("../views/header_main.vue")
    },
                {
        path: "/Chat_user/:roomName",
        name: "Chat_user", 
        component: () => import("../views/Chat_user.vue"),
        meta:{
          hideNavbar:true,
        }
    },
    
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
 const authenticatedUser = firebase.auth().currentUser;
 const requiresAuth = to.matched.some(record=>record.meta.requiresAuth);
 
 if (requiresAuth && !authenticatedUser){
   next('login');
 }  else {
   next();
 }
});
export default router
