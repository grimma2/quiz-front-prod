import { createStore } from 'vuex'
import {team} from '@/store/team'
import {game} from '@/store/game'
import {dialog} from "@/store/dialog";
import tracing from '@/tracing'

export default createStore({
  modules: {
    team: team,
    game: game,
    dialog: dialog
  }
})

tracing.addLoggingToNamespace(team.actions)
tracing.addLoggingToNamespace(game.actions)
