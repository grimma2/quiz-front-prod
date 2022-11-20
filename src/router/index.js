import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import UserGames from "@/views/UserGames";
import CodeInput from "@/views/CodeInput";
import GameDetail from "@/views/GameDetail";
import GameEdit from "@/views/GameEdit";
import GameCreate from "@/views/GameCreate";
import TeamPlay from "@/views/TeamPlay";

const routes = [
  {
    path: '/',
    component: Home,
    meta: {title: 'Викторина'}
  },
  {
    path: '/games',
    component: UserGames,
    meta: {title: 'Список игр'}
  },
  {
    path: '/code-input',
    component: CodeInput,
    meta: {title: 'Ввод кода команды'}
  },
  {
    path: '/game/:pk',
    component: GameDetail,
    meta: {title: 'Страница игры'}
  },
  {
    path: '/game/:pk/edit',
    component: GameEdit,
    meta: {title: 'Редактировать игру'}
  },
  {
    path: '/game/create',
    component: GameCreate,
    meta: {title: 'Создать игру'}
  },
  {
    path: '/play/team/:code',
    component: TeamPlay,
    meta: {title: 'Процесс игры'}
  }
]

console.log(process.env.BASE_URL)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
