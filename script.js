// 2023,01,08

document.getElementById("content").style.display = "inline-block";

Turn = 0;
Count = 0;
Play = true;
Cases = [ [1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7] ];

function Main(Element){
    if(Element.src.includes("default") && Play){
        if(Turn == 0){ 
            Element.src = "files/0.png"; 
            Turn = 1 
        }
        else{ 
            Element.src = "files/1.png";
            Turn = 0 
        }
        Sound = new Audio('files/click.mp3');
        Sound.play();
        
        Count += 1;
        
        Check_Winner();
    }
}

function Check_Winner(){
    for(I = 0; I < Cases.length; I++){
        var Ref;
        for(J = 0; J < 3; J++){
            Id = Cases[I][J].toString();
            Src = document.getElementById(Id).src;
            if(J == 0) Ref = Src;
            else if(Ref != Src) break;
            else if(!Src.includes("default") && J == 2) After_Win(Src);
        }
    }
    
    if(Count == 9 && Play == true){ 
        document.getElementById("result").innerHTML = "Tie"; 
        Game_Over(0); // 0 = There Is No Winner
    }
}

function After_Win(Src){
    Src.includes("0.png") ? document.getElementById("result").innerHTML = "Player 'X' Win" : document.getElementById("result").innerHTML = "Player 'O' Win";
    Play = false;
    Game_Over(1); // 1 = There Is A Winner
}

async function Game_Over(Variable){
    if(Variable == 0) Name = "tie.mp3"
    else Name = "win.mp3"
    
    Sound = new Audio("files/" + Name);
    Sound.play();
    
    document.getElementById("refresh").style.display = "block";
    
    for(Num = 150; Num > 0; Num--){
        document.body.style.background = (`rgb(${Num},${Num},${Num})`);
        await new Promise(r => setTimeout(r, 100));
    }
}
