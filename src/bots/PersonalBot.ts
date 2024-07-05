import { Gamestate, BotSelection } from '../models/gamestate';
import {isNumberObject} from "node:util/types";

class Bot {
    makeMove(gamestate: Gamestate): BotSelection {

        const nrMovesOpp : {
            'R': number,
            'P': number,
            'S': number,
            'D': number,
            'W': number
        }= {R: 0, D: 0 , S: 0, W: 0, P: 0};
        const nrMovesMine : {
            'R': number,
            'P': number,
            'S': number,
            'D': number,
            'W': number
        }= {R: 0, D: 0 , S: 0, W: 0, P: 0};
        this.checkNrOfDynamites(gamestate,"p2",nrMovesMine);
        this.checkNrOfDynamites(gamestate, "p1",nrMovesOpp);
        console.log(nrMovesMine,nrMovesOpp);
        return 'P';
    }

    checkNrOfDynamites(gamestate: Gamestate,player: string, nrMoves): void {
        let last;
        let contor: number = 0;
        for (let i in gamestate.rounds) {
            last=i;
            if (last != undefined) {
                let auxVar;
                if (player == "p1") {
                    auxVar = gamestate.rounds.at(last).p1;
                }
                else {
                    auxVar=gamestate.rounds.at(last).p2;
                }
                switch (auxVar){
                    case "S": nrMoves.S++; break;
                    case "R": nrMoves.R++; break;
                    case "P": nrMoves.P++; break;
                    case "W": nrMoves.W++; break;
                    case "D": nrMoves.D++; break;
                };
            }
        }
    }
}

export = new Bot();
