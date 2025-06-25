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
        case 0: return "dice_one";
        case 1: return "dice_two";
        case 2: return "dice_three";
        case 3: return "dice_four";
        case 4: return "dice_five";
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



class Player{
    
constructor(ID_of_player){
    this.player_ID = ID_of_player;
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
    if(number === -1 && this.counter > 0){
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

    //List-Booleans
    
    this.player_addition_active = false;
    this.player_deletion_active = false;
    this.point_addition_active = false;
    this.point_addition_multiple_changes_active = false;

    //List-Documents

    this.player_list_list = document.getElementById("player_list_list");
    this.player_deletion_list = document.getElementById("player_deletion_list");
    this.point_list = document.getElementById("point_addition_list");
    
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

    this.dice_array[0].DiceRoll(0, false);
    this.dice_array[1].DiceRoll(1, false);

    for(let j = 2; j < 5; j++){
        this.dice_array[j].DiceRoll(j, true);
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

    for(let i = 0; i < array_length; i++){
        if(this.player_array[i].GetID() === ID_number){
            player = this.player_array[i];
        }
    }

    for(let j = 0; j < array_length; j++){
        if(this.IDManager_array[j].GetID() === ID_number){
            document.getElementById(this.IDManager_array[j].GetListSpanID()).textContent = player.GetWord();
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
