class Dice{

open_dice_odds_array = [];
hidden_dice_odds_array = [];
individual_dice_odds_array = [];

constructor(){
    this.symbol_number = 0;
    this.is_marked = false;
    this.is_markable = false;
    this.is_rollable = true;
    this.is_hidden = false;

    //Arrays

    for(let i = 0; i < 6; i++){
        this.open_dice_odds_array[i] = 5;
    }

    for(let j = 0; j < 6; j++){
        this.hidden_dice_odds_array[j] = 5;
    }

    for(let k = 0; k < 6; k++){
        this.individual_dice_odds_array[k] = 5;
    }

    //Dice-Odds
    
    this.open_shuffled_dices = 5;
    this.open_shuffled_dices_active = false;
    this.hidden_shuffled_dices = 5;
    this.hidden_shuffled_dices_active = false;
    this.total_dice_odds_count = 30;
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

GetSymbolNumber(){
    return this.symbol_number;
}

GetID(number){
    switch(number){
        case 0: return "dice_one";
        case 1: return "dice_two";
        case 2: return "dice_three";
        case 3: return "dice_four";
        case 4: return "dice_five";
        default: return;
    }
}

SetHiddenStatus(status){
    this.is_hidden = status;
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
    switch(this.GetSymbolNumber()){
        case 1: document.getElementById(this.GetID(number)).src = "Schwarzer-Würfel.png"; break;
        case 2: document.getElementById(this.GetID(number)).src = "Roter-Würfel.png"; break;
        case 3: document.getElementById(this.GetID(number)).src = "Bube-Würfel.png"; break;
        case 4: document.getElementById(this.GetID(number)).src = "Dame-Würfel.png"; break;
        case 5: document.getElementById(this.GetID(number)).src = "König-Würfel.png"; break;
        case 6: document.getElementById(this.GetID(number)).src = "Ass-Würfel.png"; break;
        default: break;
    }
}

SetMarkedImage(number){
    switch(this.GetSymbolNumber()){
        case 1: document.getElementById(this.GetID(number)).src = "Schwarzer-Würfel-Markiert.png"; break;
        case 2: document.getElementById(this.GetID(number)).src = "Roter-Würfel-Markiert.png"; break;
        case 3: document.getElementById(this.GetID(number)).src = "Bube-Würfel-Markiert.png"; break;
        case 4: document.getElementById(this.GetID(number)).src = "Dame-Würfel-Markiert.png"; break;
        case 5: document.getElementById(this.GetID(number)).src = "König-Würfel-Markiert.png"; break;
        case 6: document.getElementById(this.GetID(number)).src = "Ass-Würfel-Markiert.png"; break;
        default: break;
    }
}

DiceRoll(number, hidden, rollable){
    if(this.GetIsRollable()){
        if(hidden === false && this.open_shuffled_dices_active === true)
            this.symbol_number = this.DiceRollRandomOpen();
        else if(hidden === true && this.hidden_shuffled_dices_active === true)
            this.symbol_number = this.DiceRollRandomHidden();
        else
            this.symbol_number = this.DiceRollRandomIndividual();
        
        this.is_marked = false;
        this.SetRollableStatus(rollable);
        this.SetIsMarkable(rollable);
        this.SetHiddenStatus(hidden);
        this.ChangeHiddenImage(number);
    }
}

DiceRollRandomOpen(){
    let random_number = Math.floor(Math.random() * 30) + 1;
    let limit = 0;

    for(let i = 0; i < this.open_dice_odds_array.length; i++){
        limit += this.open_dice_odds_array[i];
        if(random_number <= limit)
            return i + 1;
    }
}

DiceRollRandomHidden(){
    let random_number = Math.floor(Math.random() * 30) + 1;
    let limit = 0;

    for(let i = 0; i < this.hidden_dice_odds_array.length; i++){
        limit += this.hidden_dice_odds_array[i];
        if(random_number <= limit)
            return i + 1;
    }
}

DiceRollRandomIndividual(){
    let random_number = Math.floor(Math.random() * this.total_dice_odds_count) + 1;
    let limit = 0;

    for(let i = 0; i < this.individual_dice_odds_array.length; i++){
        limit += this.individual_dice_odds_array[i];
        if(random_number <= limit)
            return i + 1;
    }
}

UpdateOpenDiceOdds(number){
    this.open_shuffled_dices += number;

    switch(this.open_shuffled_dices){
        case 0:  this.open_dice_odds_array = [8, 7, 6, 4, 3, 2]; break;
        case 1:  this.open_dice_odds_array = [7, 7, 6, 4, 3, 3]; break;
        case 2:  this.open_dice_odds_array = [7, 6, 6, 4, 4, 3]; break;
        case 3:  this.open_dice_odds_array = [6, 6, 5, 5, 4, 4]; break;
        case 4:  this.open_dice_odds_array = [6, 5, 5, 5, 5, 4]; break;
        case 5:  this.open_dice_odds_array = [5, 5, 5, 5, 5, 5]; break;
        case 6:  this.open_dice_odds_array = [4, 5, 5, 5, 5, 6]; break;
        case 7:  this.open_dice_odds_array = [4, 4, 5, 5, 6, 6]; break;
        case 8:  this.open_dice_odds_array = [3, 4, 4, 6, 6, 7]; break;
        case 9:  this.open_dice_odds_array = [3, 3, 4, 6, 7, 7]; break;
        case 10: this.open_dice_odds_array = [2, 3, 4, 6, 7, 8]; break;
        default: break;
    }

    if(this.open_shuffled_dices === 5)
        this.open_shuffled_dices_active = false;
    else
        this.open_shuffled_dices_active = true;
}

UpdateHiddenDiceOdds(number){
    this.hidden_shuffled_dices += number;

    switch(this.hidden_shuffled_dices){
        case 0:  this.hidden_dice_odds_array = [8, 7, 6, 4, 3, 2]; break;
        case 1:  this.hidden_dice_odds_array = [7, 7, 6, 4, 3, 3]; break;
        case 2:  this.hidden_dice_odds_array = [7, 6, 6, 4, 4, 3]; break;
        case 3:  this.hidden_dice_odds_array = [6, 6, 5, 5, 4, 4]; break;
        case 4:  this.hidden_dice_odds_array = [6, 5, 5, 5, 5, 4]; break;
        case 5:  this.hidden_dice_odds_array = [5, 5, 5, 5, 5, 5]; break;
        case 6:  this.hidden_dice_odds_array = [4, 5, 5, 5, 5, 6]; break;
        case 7:  this.hidden_dice_odds_array = [4, 4, 5, 5, 6, 6]; break;
        case 8:  this.hidden_dice_odds_array = [3, 4, 4, 6, 6, 7]; break;
        case 9:  this.hidden_dice_odds_array = [3, 3, 4, 6, 7, 7]; break;
        case 10: this.hidden_dice_odds_array = [2, 3, 4, 6, 7, 8]; break;
        default: break;
    }

    if(this.hidden_shuffled_dices === 5)
        this.hidden_shuffled_dices_active = false;
    else
        this.hidden_shuffled_dices_active = true;
}

UpdateIndividualDiceOdds(ID_number, number){
    this.individual_dice_odds_array[ID_number - 1] += number;
    this.total_dice_odds_count += number;
}

ResetAllDiceOdds(){
    this.open_shuffled_dices_active = false;
    this.hidden_shuffled_dices_active = false;
    this.total_dice_odds_count = 30;
    
    this.open_dice_odds_array = [5, 5, 5, 5, 5, 5];
    this.hidden_dice_odds_array = [5, 5, 5, 5, 5, 5];
    this.individual_dice_odds_array = [5, 5, 5, 5, 5, 5];
}

ChangeHiddenImage(number){
    if(this.is_hidden)
        document.getElementById(this.GetID(number)).src = "Verdeckter-Würfel.png";
    else
        this.SetDiceImage(number);
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



class Player{
    
constructor(ID_number){
    this.player_ID = ID_number;
    this.counter = 0;
    this.word = "";
}

GetID(){
    return this.player_ID;
}

GetCounter(){
    return this.counter;
}

GetWord(){
    return this.word;
}

UpdateCounter(number){
    if(number === 1 && this.counter < 9){
        this.counter += 1;
        this.UpdateWord();
    }    
    else if(number === -1 && this.counter > 0){
        this.counter -= 1;
        this.UpdateWord();
    }
}

UpdateWord(){
    switch(this.counter){
        case 0: this.word = ""; break;
        case 1: this.word = "M"; break;
        case 2: this.word = "ME"; break;
        case 3: this.word = "MEN"; break;
        case 4: this.word = "MENT"; break;
        case 5: this.word = "MENTI"; break;
        case 6: this.word = "MENTIR"; break;
        case 7: this.word = "MENTIRO"; break;
        case 8: this.word = "MENTIROS"; break;
        case 9: this.word = "MENTIROSO"; break;
        default: break; 
    }
}

ResetCounter(){
    this.counter = 0;
    this.word = "";
}
};



class IDManager{

constructor(ID_number){
    this.ID = ID_number;
    this.player_list_listnode_ID = "player_" + ID_number;
    this.player_list_span_ID = "player_span_" + ID_number;
    this.player_delete_listnode_ID = "player_deletion_list_element_" + ID_number;
    this.player_delete_button_ID = "player_deletion_list_button_" + ID_number;
    this.point_list_listnode_ID = "point_addition_list_element" + ID_number;
    this.point_decrease_button_ID = "point_list_decrease_button_" + ID_number;
    this.point_increase_button_ID = "point_list_increase_button_" + ID_number;
}

GetID(){
    return this.ID;
}

GetListListnodeID(){
    return this.player_list_listnode_ID;
}

GetListSpanID(){
    return this.player_list_span_ID;
}

GetDeleteListnodeID(){
    return this.player_delete_listnode_ID;
}

GetDeleteButtonID(){
    return this.player_delete_button_ID;
}

GetPointListnodeID(){
    return this.point_list_listnode_ID;
}

GetIncreaseButtonID(){
    return this.point_increase_button_ID;
}

GetDecreaseButtonID(){
    return this.point_decrease_button_ID;
}
};



class Game{

dice_array = [];
player_array = [];
IDManager_array = [];
ID_array = [];

constructor(){
    for(let i = 0; i < 5; i++){
        this.dice_array[i] = new Dice();
    }

    for(let j = 0; j < 20; j++){
        this.ID_array[j] = false;
    }

    //Game-Logic-Booleans

    this.is_confirmed = false;
    this.is_confirmable = true;
    this.is_covered = true;

    //Settings-Booleans

    this.rules_explanation_active = false;
    this.point_system_active = false;
    this.special_rules_active = false;
    this.special_dice_odds_active = false;

    //List-Booleans
    
    this.player_addition_active = false;
    this.player_deletion_active = false;
    this.point_addition_active = false;
    this.point_addition_multiple_changes_active = false;

    //List-Documents

    this.player_list_list = document.getElementById("player_list_list");
    this.player_deletion_list = document.getElementById("player_deletion_list");
    this.point_list = document.getElementById("point_addition_list");

    //Special-Rules

    this.reshuffle_at_start_active = false;

    //Dice-Odds

    this.open_shuffled_dices_odds = 5;
    this.hidden_shuffled_dices_odds = 5;
    this.black_dice_odds = 5;
    this.red_dice_odds = 5;
    this.jack_dice_odds = 5;
    this.queen_dice_odds = 5;
    this.king_dice_odds = 5;
    this.ace_dice_odds = 5;
    
    //Extra
    
    this.rules_explanation = document.getElementById("rules_explanation_english");
    this.warning_active = false;
}

Restart(){
    this.is_confirmable = true;
    this.is_confirmed = false;
    this.ChangeConfirmButton(false);

    for(let i = 0; i < 5; i++){
        this.dice_array[i].SetRollableStatus(true);
    }

    if(this.reshuffle_at_start_active){
        this.dice_array[0].DiceRoll(0, false, true);
        this.dice_array[1].DiceRoll(1, false, true);
    }
    else if(this.reshuffle_at_start_active === false){
        this.dice_array[0].DiceRoll(0, false, false);
        this.dice_array[1].DiceRoll(1, false, false);
    }

    for(let j = 2; j < 5; j++){
        this.dice_array[j].DiceRoll(j, true, false);
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
                this.dice_array[i].DiceRoll(i, false, false);
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
                this.dice_array[i].DiceRoll(i, true, false);
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
    if(this.dice_array[number].GetIsMarkable() && this.is_confirmed === false)
        this.dice_array[number].SetIsMarked(number);
}

//Setting-Funtions

OpenSettings(){
    document.getElementById("settings_menu").style.display = "block";
}

CloseSettings(){
    document.getElementById("settings_menu").style.display = "none";
}

ChangeLanguage(new_language){
    this.rules_explanation.style.display = "none";

    switch(new_language){
        case 1: this.rules_explanation = document.getElementById("rules_explanation_english"); break;
        case 2: this.rules_explanation = document.getElementById("rules_explanation_german"); break;
        default: break;
    }

    this.rules_explanation.style.display = "block";
}

SwitchRulesExplanation(){
    if(this.rules_explanation_active){
        this.rules_explanation_active = false;
        this.rules_explanation.style.display = "none";
        this.OpenSettings();
    }
    else{
        this.rules_explanation_active = true;
        this.rules_explanation.style.display = "block";
        this.CloseSettings();
    }
}

SwitchPointSystem(){
    if(this.point_system_active){
        this.point_system_active = false;
        document.getElementById("player_list").style.display = "none";
        document.getElementById("point_system_button").style.backgroundColor = '#808080';
    }
    else{
        this.point_system_active = true;
        document.getElementById("player_list").style.display = "block";
        document.getElementById("point_system_button").style.backgroundColor = '#ffff00';
        this.CloseSettings();
    }
}

OpenSpecialRules(){
    this.special_rules_active = true;
    document.getElementById("special_rules").style.display = "block";
}

CloseSpecialRules(){
    this.special_rules_active = false;
    document.getElementById("special_rules").style.display = "none";
}

SwitchSpecialRules(){
    if(this.special_rules_active){
        this.CloseSpecialRules();
        this.OpenSettings();
    }
    else{
        this.OpenSpecialRules();
        this.CloseSettings();
    }
}

SwitchReshuffleAtStart(){
    if(this.reshuffle_at_start_active){
        this.reshuffle_at_start_active = false;
        document.getElementById("reshuffle_at_start_button").style.backgroundColor = '#808080';
    }
    else{
        this.reshuffle_at_start_active = true;
        document.getElementById("reshuffle_at_start_button").style.backgroundColor = '#ffff00';
    }
}

SwitchSpecialDiceOdds(){
    if(this.special_dice_odds_active){
        this.special_dice_odds_active = false;
        document.getElementById("special_dice_odds").style.display = "none";
        this.OpenSpecialRules();
    }
    else{
        this.special_dice_odds_active = true;
        document.getElementById("special_dice_odds").style.display = "block";
        this.CloseSpecialRules();
    }
}

UpdateDiceOdds(ID_number, number){

switch(ID_number){
    case 1: if(this.CheckUpdateDiceOdds(this.open_shuffled_dices_odds, number)){
                if(number === 1){
                    this.open_shuffled_dices_odds++;
                    this.UpdateDiceOddsOfDiceArray(1, 1);
                }
                else{
                    this.open_shuffled_dices_odds--;
                    this.UpdateDiceOddsOfDiceArray(1, -1);
                }
                document.getElementById("dice_odds_open_span").innerText = this.open_shuffled_dices_odds;
            } break;
    case 2: if(this.CheckUpdateDiceOdds(this.hidden_shuffled_dices_odds, number)){
                if(number === 1){
                    this.hidden_shuffled_dices_odds++;
                    this.UpdateDiceOddsOfDiceArray(2, 1);
                }
                else{
                    this.hidden_shuffled_dices_odds--;
                    this.UpdateDiceOddsOfDiceArray(2, -1);
                }
                document.getElementById("dice_odds_hidden_span").innerText = this.hidden_shuffled_dices_odds;
            } break;
    case 3: if(this.CheckUpdateDiceOdds(this.black_dice_odds, number)){
                if(number === 1){
                    this.black_dice_odds++;
                    this.UpdateDiceOddsOfDiceArray(3, 1);
                }
                else{
                    this.black_dice_odds--;
                    this.UpdateDiceOddsOfDiceArray(3, -1);
                }
                document.getElementById("dice_odds_black_span").innerText = this.black_dice_odds;
            } break;
    case 4: if(this.CheckUpdateDiceOdds(this.red_dice_odds, number)){
                if(number === 1){
                    this.red_dice_odds++;
                    this.UpdateDiceOddsOfDiceArray(4, 1);
                }
                else{
                    this.red_dice_odds--;
                    this.UpdateDiceOddsOfDiceArray(4, -1);
                }
                document.getElementById("dice_odds_red_span").innerText = this.red_dice_odds;
            } break;
    case 5: if(this.CheckUpdateDiceOdds(this.jack_dice_odds, number)){
                if(number === 1){
                    this.jack_dice_odds++;
                    this.UpdateDiceOddsOfDiceArray(5, 1);
                }
                else{
                    this.jack_dice_odds--;
                    this.UpdateDiceOddsOfDiceArray(5, -1);
                }
                document.getElementById("dice_odds_jack_span").innerText = this.jack_dice_odds;
            } break;
    case 6: if(this.CheckUpdateDiceOdds(this.queen_dice_odds, number)){
                if(number === 1){
                    this.queen_dice_odds++;
                    this.UpdateDiceOddsOfDiceArray(6, 1);
                }
                else{
                    this.queen_dice_odds--;
                    this.UpdateDiceOddsOfDiceArray(6, -1);
                }
                document.getElementById("dice_odds_queen_span").innerText = this.queen_dice_odds;
            } break;
    case 7: if(this.CheckUpdateDiceOdds(this.king_dice_odds, number)){
                if(number === 1){
                    this.king_dice_odds++;
                    this.UpdateDiceOddsOfDiceArray(7, 1);
                }
                else{
                    this.king_dice_odds--;
                    this.UpdateDiceOddsOfDiceArray(7, -1);
                }
                document.getElementById("dice_odds_king_span").innerText = this.king_dice_odds;
            } break;
    case 8: if(this.CheckUpdateDiceOdds(this.ace_dice_odds, number)){
                if(number === 1){
                    this.ace_dice_odds++;
                    this.UpdateDiceOddsOfDiceArray(8, 1);
                }
                else{
                    this.ace_dice_odds--;
                    this.UpdateDiceOddsOfDiceArray(8, -1);
                }
                document.getElementById("dice_odds_ace_span").innerText = this.ace_dice_odds;
            } break;
    default: break;
}
}

CheckUpdateDiceOdds(dice_odds, number){
    if(number === 1 && dice_odds < 10)
        return true;
    else if(number === -1 && dice_odds > 0)
        return true;
    return false;
}

UpdateDiceOddsOfDiceArray(ID_number, number){
    for(let i = 0; i < this.dice_array.length; i++){
        if(ID_number === 1)
            this.dice_array[i].UpdateOpenDiceOdds(number);
        else if(ID_number === 2)
            this.dice_array[i].UpdateHiddenDiceOdds(number);
        else
            this.dice_array[i].UpdateIndividualDiceOdds(ID_number - 2, number);
    }
}

ResetAllDiceOdds(){
    this.open_shuffled_dices_odds = 5;
    this.hidden_shuffled_dices_odds = 5;
    this.black_dice_odds = 5;
    this.red_dice_odds = 5;
    this.jack_dice_odds = 5;
    this.queen_dice_odds = 5;
    this.king_dice_odds = 5;
    this.ace_dice_odds = 5;

    document.getElementById("dice_odds_open_span").innerText = 5;
    document.getElementById("dice_odds_hidden_span").innerText = 5;
    document.getElementById("dice_odds_black_span").innerText = 5;
    document.getElementById("dice_odds_red_span").innerText = 5;
    document.getElementById("dice_odds_jack_span").innerText = 5;
    document.getElementById("dice_odds_queen_span").innerText = 5;
    document.getElementById("dice_odds_king_span").innerText = 5;
    document.getElementById("dice_odds_ace_span").innerText = 5;

    for(let i = 0; i < this.dice_array.length; i++){
        this.dice_array[i].ResetAllDiceOdds();
    }
}

SwitchPlayerAddition(){
    if(this.player_addition_active){
        this.player_addition_active = false;
        document.getElementById("player_addition").style.display = "none";
        document.getElementById("player_addition_text_input").value = "";
    }
    else{
        this.player_addition_active = true;
        document.getElementById("player_addition").style.display = "block";
    }
}

ConfirmPlayerName(){
    let player_name = document.getElementById("player_addition_text_input").value;
    document.getElementById("player_addition_text_input").value = "";
    this.AddPlayerToList(player_name)
}

AddPlayerToList(player_name){
    if(this.IDManager_array.length < 20){
        let ID_number = this.GetUnusedID();

        this.AddPlayerToPlayerList(ID_number, player_name);
        this.AddPlayerToDeleteList(ID_number, player_name);
        this.AddPlayerToPointList(ID_number, player_name);

        this.player_array.push(new Player(ID_number));
        this.IDManager_array.push(new IDManager(ID_number));
    }
    else{
        this.Warning_PlayerListTooLong();
    }
}

AddPlayerToPlayerList(ID_number, player_name){
    let new_listnode_element = document.createElement("li");
    let new_span_element = document.createElement("span");

    new_listnode_element.appendChild(document.createTextNode(player_name));
    new_listnode_element.appendChild(new_span_element);
    this.player_list_list.appendChild(new_listnode_element);

    new_listnode_element.id = "player_" + ID_number;
    new_listnode_element.classList.add("player_list_element");
    new_span_element.id = "player_span_" + ID_number;
    new_span_element.classList.add("player_word_span");
}

AddPlayerToDeleteList(ID_number, player_name){
    let new_deletion_listnode_element = document.createElement("li");
    let new_deletion_button_element = document.createElement("button");

    new_deletion_button_element.innerText = player_name;
    new_deletion_listnode_element.appendChild(new_deletion_button_element);
    this.player_deletion_list.appendChild(new_deletion_listnode_element);

    new_deletion_listnode_element.id = "player_deletion_list_element_" + ID_number;
    new_deletion_button_element.id = "player_deletion_list_button_" + ID_number;
    new_deletion_button_element.classList.add("player_deletion_list_button");
    new_deletion_button_element.addEventListener("click", game.MarkButton);
}

AddPlayerToPointList(ID_number, player_name){
    let new_point_listnode_element = document.createElement("li");
    let new_point_list_increase_button = document.createElement("button");
    let new_point_list_decrease_button = document.createElement("button");

    new_point_listnode_element.innerText = player_name;
    new_point_listnode_element.appendChild(new_point_list_increase_button);
    new_point_listnode_element.appendChild(new_point_list_decrease_button);
    this.point_list.appendChild(new_point_listnode_element);

    new_point_listnode_element.classList.add("point_addition_listnode");
    new_point_listnode_element.id = "point_addition_list_element" + ID_number;
    new_point_list_increase_button.id = "point_list_increase_button_" + ID_number;
    new_point_list_decrease_button.id = "point_list_decrease_button_" + ID_number;

    new_point_list_increase_button.classList.add("point_addition_list_button");
    new_point_list_increase_button.classList.add("point_increase");
    new_point_list_increase_button.addEventListener('click', game.AddPointToPlayer);
    new_point_list_increase_button.innerText = "+";

    new_point_list_decrease_button.classList.add("point_addition_list_button");
    new_point_list_decrease_button.classList.add("point_decrease");
    new_point_list_decrease_button.addEventListener('click', game.AddPointToPlayer);
    new_point_list_decrease_button.innerText = "-";
}

GetUnusedID(){
    for(let i = 0; i < 20; i++){
        if(this.ID_array[i] === false){
            this.ID_array[i] = true;
            return i;
        }
    }
}

SwitchPlayerDeletion(){
    if(this.player_deletion_active){
        this.player_deletion_active = false;
        document.getElementById("player_deletion").style.display = "none";

        let button_element;
        
        for(let i = 0; i < this.IDManager_array.length; i++){
            button_element = document.getElementById(this.IDManager_array[i].GetDeleteButtonID());
            if(button_element.classList.contains("marked_button_delete")){
                button_element.classList.remove("marked_button_delete");
            }
        }
    }
    else{
        this.player_deletion_active = true;
        document.getElementById("player_deletion").style.display = "block";
    }
}

RemovePlayersFromList(){
    let IDM;

    for(let i = 0; i < this.IDManager_array.length; i++){
        IDM = this.IDManager_array[i];
        if(document.getElementById(IDM.GetDeleteButtonID()).classList.contains("marked_button_delete")){
            document.getElementById(IDM.GetListListnodeID()).removeChild(document.getElementById(IDM.GetListSpanID()));
            this.player_list_list.removeChild(document.getElementById(IDM.GetListListnodeID()));

            document.getElementById(IDM.GetDeleteListnodeID()).removeChild(document.getElementById(IDM.GetDeleteButtonID()));
            this.player_deletion_list.removeChild(document.getElementById(IDM.GetDeleteListnodeID()));

            document.getElementById(IDM.GetPointListnodeID()).removeChild(document.getElementById(IDM.GetDecreaseButtonID()));
            document.getElementById(IDM.GetPointListnodeID()).removeChild(document.getElementById(IDM.GetIncreaseButtonID()));
            this.point_list.removeChild(document.getElementById(IDM.GetPointListnodeID()));

            this.ID_array[IDM.GetID()] = false;
            this.IDManager_array.splice(i, 1);
            this.player_array.splice(i, 1);
            i--;
        }
    }
    this.SwitchPlayerDeletion();
}

MarkButton(){

    //EventListener

    if(this.classList.contains("marked_button_delete") === false){
        this.classList.add("marked_button_delete");
    }
    else{
        this.classList.remove("marked_button_delete");
    }
}

ClearPlayerList(){
    let array_length = this.IDManager_array.length;

    if(array_length > 0){
        let IDM;

        for(let i = 0; i < array_length; i++){
            IDM = this.IDManager_array[i];

            document.getElementById(IDM.GetListListnodeID()).removeChild(document.getElementById(IDM.GetListSpanID()));
            this.player_list_list.removeChild(document.getElementById(IDM.GetListListnodeID()));

            document.getElementById(IDM.GetDeleteListnodeID()).removeChild(document.getElementById(IDM.GetDeleteButtonID()));
            this.player_deletion_list.removeChild(document.getElementById(IDM.GetDeleteListnodeID()));

            document.getElementById(IDM.GetPointListnodeID()).removeChild(document.getElementById(IDM.GetDecreaseButtonID()));
            document.getElementById(IDM.GetPointListnodeID()).removeChild(document.getElementById(IDM.GetIncreaseButtonID()));
            this.point_list.removeChild(document.getElementById(IDM.GetPointListnodeID()));
        }

        this.IDManager_array.splice(0, array_length);
        this.player_array.splice(0, array_length);
        this.SwitchPlayerDeletion();

        for(let j = 0; j < 20; j++){
            this.ID_array[j] = false;
        }
    }
}

SwitchPointAddition(){
    if(this.point_addition_active){
        this.point_addition_active = false;
        document.getElementById("point_addition").style.display = "none";
        this.point_addition_multiple_changes_active = false;
        document.getElementById("point_addition_multiple_changes_button").style.backgroundColor = '#808080';
    }
    else{
        this.point_addition_active = true;
        document.getElementById("point_addition").style.display = "block";
    }
}

AddPointToPlayer(){

    //EventListener

    let number;
    let ID_number;

    if(this.classList.contains("point_increase")){
        number = 1;
        for(let i = 0; i < game.IDManager_array.length; i++){
            if(game.IDManager_array[i].GetIncreaseButtonID() === this.id){
                ID_number = game.IDManager_array[i].GetID();
                break;
            }
        }
    }
    else if(this.classList.contains("point_decrease")){
        number = -1;
        for(let j = 0; j < game.IDManager_array.length; j++){
            if(game.IDManager_array[j].GetDecreaseButtonID() === this.id){
                ID_number = game.IDManager_array[j].GetID();
                break;
            }
        }
    }

    if(game.point_addition_multiple_changes_active === false){
        game.SwitchPointAddition();
    }

    game.PointAdditionByID(ID_number, number);
    game.UpdateSpanWord(ID_number);
}

PointAdditionByID(ID_number, number){
    let player;

    for(let i = 0; i < this.player_array.length; i++){
        if(this.player_array[i].GetID() === ID_number){
            player = this.player_array[i];
            break;
        }
    }

    player.UpdateCounter(number);
}

ClearPointList(){
    let array_length = this.player_array.length;

    this.SwitchPointAddition();
    for(let i = 0; i < array_length; i++){
        this.player_array[i].ResetCounter();
        this.UpdateSpanWord(this.player_array[i].GetID());
    }
}

UpdateSpanWord(ID_number){
    let array_length = this.IDManager_array.length;
    let player;

    for(let j = 0; j < array_length; j++){
        if(this.player_array[j].GetID() === ID_number){
            player = this.player_array[j];
        }
    }

    for(let i = 0; i < array_length; i++){
        if(this.IDManager_array[i].GetID() === ID_number){
            document.getElementById(this.IDManager_array[i].GetListSpanID()).textContent = player.GetWord();
        }
    }
}

SwitchPointAdditionMultipleChanges(){
    if(this.point_addition_multiple_changes_active){
        this.point_addition_multiple_changes_active = false;
        document.getElementById("point_addition_multiple_changes_button").style.backgroundColor = '#808080';
    }
    else{
        this.point_addition_multiple_changes_active = true;
        document.getElementById("point_addition_multiple_changes_button").style.backgroundColor = '#ffff00';
    }
}

ShowLeaderboard(){

}

Warning_PlayerListTooLong(){
    if(this.warning_active){
        this.warning_active = false;
        document.getElementById("warning_player_list").style.display = "none";
    }
    else{
        this.warning_active = true;
        document.getElementById("warning_player_list").style.display = "block";
    }
}
};

let game = new Game();
