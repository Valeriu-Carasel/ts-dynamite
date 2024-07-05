import { Gamestate, BotSelection } from '../models/gamestate';
import {isNumberObject} from "node:util/types";
import {randomInt} from "node:crypto";

class Bot {
    nrOfRounds: number = 0;
    equalRounds: number = 0;
    makeMove(gamestate: Gamestate): BotSelection {
        this.nrOfRounds++;
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

        this.checkNrOfDynamites(gamestate,"p1",nrMovesMine);
        this.checkNrOfDynamites(gamestate, "p2",nrMovesOpp);
        this.countRepeating(gamestate);

        const string1 = 'S';
        const string2 = 'R';
        const string3 = 'P';

        const randomD = this.getRandomInt(1,20);

        if (nrMovesMine.D < 90) {
           if (this.equalRounds == 1)
                return 'D';
            if (this.equalRounds == -1)
                return 'W';
            if (this.nrOfRounds%randomD == 0 )
                return 'D';
        }
        const eStart = this.getRandomInt(75,100)
        const e200 = this.getRandomInt(150,175);
        if (this.nrOfRounds<=e200 && eStart<= this.nrOfRounds) {
            if (this.nrOfRounds % 17 ==0)
                return 'D';
            return string1;
        }
        let toBeCompared = this.getRandomInt(1, this.nrOfRounds + nrMovesOpp.D);
        if (toBeCompared % 7 == 0)
            return string1;
        if (toBeCompared % 2 == 0) {
            if (gamestate.rounds.length>3 && gamestate.rounds.at(-3).p2 == 'P')
                return string1;
            else
                return string2;
        }
        else {
            if (gamestate.rounds.length>3 &&  gamestate.rounds.at(-3).p2 == 'S')
                return string2;
            else
                return string3;
        }
    }

    checkNrOfDynamites(gamestate: Gamestate,player: string, nrMoves): void {
        let last;
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
                }
            }
        }
    }

    countRepeating(gamestate: Gamestate){
        const nrOfR = gamestate.rounds.length;
        const nr = this.nrOfRounds % 2 ==0? 1:2;
        if (nrOfR > nr)
        {
            let equals: boolean = true;
            for (let i=nrOfR-1; i>=nrOfR - nr; i--){
                if (gamestate.rounds.at(i).p1 != gamestate.rounds.at(i).p2)
                    equals = false;
            }
            if (equals == true) {
                if (gamestate.rounds.at(nrOfR - 1).p1 == 'D')
                    this.equalRounds = -1;
                else
                    this.equalRounds = 1;
            }
            else
                this.equalRounds = 0;
        }
    }

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export = new Bot();
