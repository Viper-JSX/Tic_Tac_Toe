let cells = document.querySelectorAll("#gameBoard > div");
let winCombinations = [
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9],
						[1, 4, 7],
						[2, 5, 8],
						[3, 6, 9],
						[1, 5, 9],
						[3, 5, 7]
								]

let whoseTurn = "cross";
let winner = "";
let draw = false;
let winMatchesConcured = 0;
let winWindow = document.getElementById("winWindow");
let restartButton = winWindow.querySelector("#restartButton");
let winText = winWindow.querySelector("#winText");

let allCrossMoves = [];
let allCircleMoves = [];
let winCheckArray = [];

let timer = document.getElementById("timer");
let timerSeconds = 0;
let timerMinutes = 0;

timer.textContent = "0:00"

function addingEventListeners(){
	cells.forEach(function(cell){
		cell.onmouseenter = function(){
			whoseTurn == "cross" ? cell.textContent = "X" : cell.textContent = "O";
			cell.style.color = "gray";
		}
		cell.onmouseleave = function(){
			cell.textContent = "";
		}

		cell.onclick =  function(){
			cell.style.color = "black";
			cell.onmouseenter = null;
			cell.onmouseleave = null;

			whoseTurn == "cross" ? cell.textContent = "X" : cell.textContent = "O";
	
			if(whoseTurn == "cross"){
				allCrossMoves[allCrossMoves.length] = parseInt(cell.getAttribute("cellNumber"));
				winCheckArray = allCrossMoves;
			}
			else if(whoseTurn = "circle"){
				allCircleMoves[allCircleMoves.length] = parseInt(cell.getAttribute("cellNumber"));
				winCheckArray = allCircleMoves;
			}
	
			for(let i = 0; i < 8; i++){
				winMatchesConcured = 0;
				for(let j = 0; j < 3; j++){
					for(let g = 0; g < winCheckArray.length; g++){
						if(winCombinations[i][j] == winCheckArray[g]){
							winMatchesConcured += 1;
						}
					}
				}
				if(winMatchesConcured == 3){
					winner = whoseTurn;
				}
			}
	
			if(allCrossMoves.length + allCircleMoves.length == 9 && !winner){
				console.log("draw");
				draw = true;
			}
	
			if(winner || draw){
				winWindow.style.display = "flex";
				if(winner){
					winText.textContent = `${whoseTurn[0].toUpperCase() + whoseTurn.slice(1)} win`;
				}
				else if(draw){
					winText.textContent = "Draw";
				}

				clearInterval(timerInterval);
				return;
			}
			
			cell.onclick = null;

			whoseTurn == "cross" ? whoseTurn = "circle" : whoseTurn = "cross";
		}
	})
}

addingEventListeners();

let timerInterval = setInterval(timerCount, 1000);

function timerCount(){
	timerSeconds += 1;

	if(timerSeconds == 60){
		timerMinutes += 1;
		timerSeconds = 0;
	}

	timerSeconds < 10 ? timer.textContent = `${timerMinutes}:0${timerSeconds}` : timer.textContent = `${timerMinutes}:${timerSeconds}`;
}



restartButton.addEventListener("click", restartGame);

function restartGame(){
	winWindow.style.display = "none";

	cells.forEach(function(cell){
		cell.textContent = "";
		cell.onclick = null;
	});

	addingEventListeners();

	winMatchesConcured = 0;
	winner = "";
	whoseTurn = "cross";
	draw = false;
	allCrossMoves = [];
	allCircleMoves = [];
	winCheckArray = [];

	timerSeconds = 0;
	timerMinutes = 0;
	timer.textContent = "0:00";
	timerInterval = setInterval(timerCount, 1000);

}


