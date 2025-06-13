const DICE_VALUE = {
    NONE: 0,
    BLACK: 1,
    RED: 2,
    JACK: 3,
    QUEEN: 4,
    KING: 5,
    ACE: 6
}



class Dice{

constructor(){
    this.symbol = DICE_VALUE.NONE;
    this.is_marked = false;
    this.is_markable = false;
    this.is_rollable = true;
    this.is_hidden = false;
}

GetIsMarked(){
    return this.is_marked;
}

GetIsMarkable(){
    return this.is_markable;
}

GetIsRollable(){
    return this.is_rollable;
}

GetIsHidden(){
    return this.is_hidden;
}

GetSymbol(){
    return this.symbol;
}

SetHiddenStatus(status){
    this.is_hidden = status;
}

ChangeHiddenImage(number){
    if(this.is_hidden)
        document.getElementById(this.GetID(number)).src = "Verdeckter-Würfel.png";
    else
        this.SetDiceImage(number);
}

SetRollableStatus(status){
    this.is_rollable = status;
}

SetIsMarked(number){
    if(this.is_marked){
        this.is_marked = false;
        this.SetDiceImage(number);
    }
    else{
        if(!this.is_hidden){
            this.is_marked = true;
            this.SetMarkedImage(number);
        }
    }
}

SetIsMarkable(status){
    this.is_markable = status;
}

SetDiceImage(number){
    switch(this.GetSymbol()){
        case DICE_VALUE.BLACK:
            document.getElementById(this.GetID(number)).src = "Schwarzer-Würfel.png"; break;
        case DICE_VALUE.RED:
            document.getElementById(this.GetID(number)).src = "Roter-Würfel.png"; break;
        case DICE_VALUE.JACK:
            document.getElementById(this.GetID(number)).src = "Bube-Würfel.png"; break;
        case DICE_VALUE.QUEEN:
            document.getElementById(this.GetID(number)).src = "Dame-Würfel.png"; break;
        case DICE_VALUE.KING:
            document.getElementById(this.GetID(number)).src = "König-Würfel.png"; break;
        case DICE_VALUE.ACE:
            document.getElementById(this.GetID(number)).src = "Ass-Würfel.png"; break;
        default: break;
    }
}

SetMarkedImage(number){
    switch(this.GetSymbol()){
        case DICE_VALUE.BLACK:
            document.getElementById(this.GetID(number)).src = "Schwarzer-Würfel-Markiert.png"; break;
        case DICE_VALUE.RED:
            document.getElementById(this.GetID(number)).src = "Roter-Würfel-Markiert.png"; break;
        case DICE_VALUE.JACK:
            document.getElementById(this.GetID(number)).src = "Bube-Würfel-Markiert.png"; break;
        case DICE_VALUE.QUEEN:
            document.getElementById(this.GetID(number)).src = "Dame-Würfel-Markiert.png"; break;
        case DICE_VALUE.KING:
            document.getElementById(this.GetID(number)).src = "König-Würfel-Markiert.png"; break;
        case DICE_VALUE.ACE:
            document.getElementById(this.GetID(number)).src = "Ass-Würfel-Markiert.png"; break;
        default: break;
    }
}

DiceRoll(number, status){
    if(this.GetIsRollable()){
        let random = Math.floor(Math.random() * 6) + 1;

        switch(random){
            case 1: this.symbol = DICE_VALUE.BLACK;break;
            case 2: this.symbol = DICE_VALUE.RED; break;
            case 3: this.symbol = DICE_VALUE.JACK; break;
            case 4: this.symbol = DICE_VALUE.QUEEN; break;
            case 5: this.symbol = DICE_VALUE.KING; break;
            case 6: this.symbol = DICE_VALUE.ACE; break;
            default: break;
        }

        this.is_marked = false;
        this.SetRollableStatus(false);
        this.SetIsMarkable(false);
        this.SetHiddenStatus(status);
        this.ChangeHiddenImage(number);
    }
}

GetID(number){
    switch(number){
        case 0: return "würfel_eins";
        case 1: return "würfel_zwei";
        case 2: return "würfel_drei";
        case 3: return "würfel_vier";
        case 4: return "würfel_fünf";
        default: return;
    }
}

Cover_Reveal_Image(number, covered){
    if(this.is_hidden){
        if(covered)
            this.SetDiceImage(number);
        else
            document.getElementById(this.GetID(number)).src = "Verdeckter-Würfel.png";
    }
}
};



class Game{

dice_array = [];

constructor(){
    for(let i = 0; i < 5; i++){
        this.dice_array[i] = new Dice();
    }

    this.is_confirmed = false;
    this.is_confirmable = true;
    this.is_covered = true;
}

Restart(){
    this.is_confirmable = true;
    this.is_confirmed = false;
    this.ChangeConfirmButton(false);

    for(let i = 0; i < 5; i++){
        this.dice_array[i].SetRollableStatus(true);
    }

    this.dice_array[0].DiceRoll(0, false);
    this.dice_array[1].DiceRoll(1, false);

    for(let i = 2; i < 5; i++){
        this.dice_array[i].DiceRoll(i, true);
    }
}

CheckIfMarked(){
    for(let i = 0; i < 5; i++){
        if(this.dice_array[i].GetIsMarked())
            return true;
    }
    return false;
}

Shuffle_Open(){
    if(this.CheckIfMarked()){
        for(let i = 0; i < 5; i++){
            if(this.dice_array[i].GetIsMarked()){
                this.dice_array[i].DiceRoll(i, false);
                this.is_confirmable = true;    
            }
        }
    }
}

Shuffle_Hidden(){
    if(this.CheckIfMarked()){
        for(let i = 0; i < 5; i++)
        {
            if(this.dice_array[i].GetIsHidden()){
                this.dice_array[i].SetHiddenStatus(false);
                this.dice_array[i].ChangeHiddenImage(i);
            }

            if(this.dice_array[i].GetIsMarked()){
                this.dice_array[i].DiceRoll(i, true);
                this.is_confirmable = true;    
            }
        }
    }
}

Reset(){
    for(let i = 0; i < 5; i++){
        this.dice_array[i].SetRollableStatus(true);
        this.dice_array[i].SetIsMarkable(true);
        this.dice_array[i].SetHiddenStatus(false);
        this.dice_array[i].ChangeHiddenImage(i);
    }
}

Cover_Reveal(){
    if(this.is_confirmed){
        for(let i = 0; i < 5; i++){
            this.dice_array[i].Cover_Reveal_Image(i, true);
        }

        this.ChangeConfirmButton(false);
        this.is_confirmable = false;
        this.is_confirmed = false;
        this.Reset();
    }
    else{
        if(this.is_covered)
            this.is_covered = false;
        else
            this.is_covered = true;
        for(let i = 0; i < 5; i++){
            this.dice_array[i].Cover_Reveal_Image(i, !this.is_covered);
        }
    }
}

ChangeConfirmButton(status){
    if(status)
        document.getElementById("confirm_button").style.backgroundColor = '#ffff00';
    else
        document.getElementById("confirm_button").style.backgroundColor = '#808080';
}

Confirm(){
    if(this.is_confirmable){
        if(!this.is_confirmed && this.is_covered){
            this.is_confirmed = true;
            this.ChangeConfirmButton(true);
        }
        else{
            this.is_confirmed = false;
            this.ChangeConfirmButton(false);
        }
    }
}

MarkDice(number){
    if(this.dice_array[number].GetIsMarkable())
        this.dice_array[number].SetIsMarked(number);
}
};

let game = new Game();
