const boxes= document.querySelectorAll(".box");
const gameInfo= document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");

let currentPlayer;
//game grid phale empty hoga usmai na zero hoga na cross
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    
     //ui update
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initializing css properties
        box.classList=`box box${index+1}`;
    });
     
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
initGame();

 function swapTurn()
{
     if(currentPlayer==="X")
    {
         currentPlayer="0";
     }
     else{
       currentPlayer="X";
    }
    //ui update
   gameInfo.innerText=`Current Player-${currentPlayer}`;

 
 }

function handleClick(index)
{
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer; //ui pa change kar rahii yeh
        gameGrid[index]=currentPlayer;//yeh joh hmmna upar initialize kiaa hai usmai change kar rahii
         boxes[index].style.pointerEvents="none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nhii gaya
        checkGameOver();
    }
}
function checkGameOver()
{
   let answer="";

   winningPosition.forEach((position)=>{
    //all three boxes should be non empty and should have exactly same values
    if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!=="" ||gameGrid[position[2]]!=="")
     &&(gameGrid[position[0]]==gameGrid[position[1]]) &&(gameGrid[position[1]]==gameGrid[position[2]]))
    {
       //check if answer is X OR 0
       if(gameGrid[position[0]]=="X")
       answer="X";
       else
       answer="0";
       //disable pointer event
       boxes.forEach((box)=>{
        box.style.pointerEvents="none";
       })
       //now we know that either x or o is a winner now we have to mark it in green
       boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");

    }
        
   });
   //if our answer is not empty means we have a winner
   if(answer!="")
   {
    gameInfo.innerText=`Winner Player-${answer}`;
    newGameBtn.classList.add("active");
   }

   //lets check whether there is a tie
   let fillCount=0;
   gameGrid.forEach((box)=>{
    if(box!=="")
    fillCount++;
   });

   //board is filled game is tie
   if(fillCount===9)
   gameInfo.innerText=`Game Tie!`;
   newGameBtn.classList.add("active");
}
boxes.forEach((box,index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});


 newGameBtn.addEventListener("click",initGame);