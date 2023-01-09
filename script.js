// 2023 01 08

document.getElementById("content").style.display = "inline-block";

Turn = 0;
Count = 0;
Play = true;
Cases = [ [1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7] ];

function Show_Button(){
    document.getElementById("refresh").style.display = "block";
}

function Main(Element){
    if(Element.src.includes("default") && Play){
        Count += 1;
        if(Turn == 0){
            Element.src = "files/0.png";
            Turn = 1;
        }
        else{
            Element.src = "files/1.png";
            Turn = 0;
        }
        Win();
    }
}

function Win(){
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
        Show_Button();
    }
}

async function After_Win(Src){
    Sound = new Audio('files/sound.mp3');
    Sound.play();
    Show_Button();
    Play = false;
    Src.includes("0.png") ? document.getElementById("result").innerHTML = "Player 1 Win" : document.getElementById("result").innerHTML = "Player 2 Win";
    for(Num = 0; Num < 256; Num++){
        document.body.style.background = (`rgb(${Num},${Num},${Num + 50})`);
        await new Promise(r => setTimeout(r, 100));
    }
}
