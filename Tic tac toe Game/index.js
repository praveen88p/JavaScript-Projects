const gameCells = document.querySelectorAll('.cell');
const player1  =  document.querySelector('.player1');
const player2  = document.querySelector('.player2');
const resetbtn = document.querySelector('.resetbtn');
const alerbox = document.querySelector('.alertbox');

let currentplayer = 'X';
let nextplayer = 'O';
let playerturn = currentplayer;

player1.textContent = `player1: ${currentplayer}`;
player1.textContent = `player2: ${nextplayer}`;



const startgame=()=>{
    gameCells.forEach(cell=>{
        cell.addEventListener('click',handleclick);
    });
}


const  handleclick=(e)=>{
    if(e.target.textContent ===''){
        e.target.textContent = playerturn;
        if(checkwin()){
          
            showalert(`${playerturn} is a winner`);
            disablecells();
        }
        else if(checkTie()){
            showalert(`It's a tie`);
            disablecells();
        }
        else{
        changePlayerturn();
    }
    }
}

const changePlayerturn=()=>{

    playerturn =playerturn===currentplayer ? nextplayer:currentplayer;
}


const checkwin=()=>{
    const winningcontion=
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]

    ];

    for(let i=0;i<winningcontion.length;i++){
        const [pos1,pos2,pos3] = winningcontion[i];

        if(gameCells[pos1].textContent!=='' &&
        gameCells[pos1].textContent===gameCells[pos2].textContent &&
        gameCells[pos2].textContent===gameCells[pos3].textContent){
            return true;
        }
    }
    return false;
}

const checkTie=()=>{
    let emptycellcount =0;
    gameCells.forEach(cell =>{
        if(cell.textContent ===''){
            emptycellcount++;
        }
    });
    return emptycellcount===0 && !checkwin();
}

const disablecells = ()=>{
    gameCells.forEach(cell=>{
        cell.removeEventListener('click',handleclick);
        cell.classList.add('disabled');
    });
}

const restartgame=()=>{
    gameCells.forEach(cell=>{
        cell.textContent='';
        cell.classList.remove('disabled') 
    });
    startgame();
}

const showalert=(msg)=>{
  alerbox.style.display="block";
  alerbox.textContent =msg;
}

resetbtn.addEventListener('click',restartgame);
startgame();