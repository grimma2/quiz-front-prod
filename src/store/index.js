import { createStore } from 'vuex'
import {team} from '@/store/team'
import {game} from '@/store/game'
import {dialog} from "@/store/dialog";

export default createStore({
  modules: {
    team: team,
    game: game,
    dialog: dialog
  }
})
