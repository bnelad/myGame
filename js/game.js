'use strict'

const MINE = '💣'
var gBoard
var gSize = 4
var gMines = 2
var gGameIsON = true
var gShownCount = 0
var gMarkedCount = 0
var gSecsPassed = 0
var gIsBeginning = true
var gStartTime
var gIntervalId
var maxShown = gSize * gSize - gMines



function chooseDifficulty(level) {
    gSize = level
    initGame()
}

function startTimer() {
    gStartTime = Date.now()
    gIntervalId = setInterval(updateTime, 80)
}

function updateTime() {
    var now = Date.now()
    var diff = now - gStartTime
    var secondsPast = diff / 1000
    var elTimerSpan = document.querySelector('.timer span')
    elTimerSpan.innerText = secondsPast.toFixed(3)
}

function initGame() {
	console.log('wwwww')
	console.log(maxShown)
	
	gBoard = buildBoard();
	renderBoard(gBoard);
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(gSize, gSize)   
    
    for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
			board[i][j] = cell;
			console.log(board[i][j].isMine)
		}
	}
    
	if (gSize == 4) {
		gMines = 2
		board[1][1].isMine = true
    	board[2][2].isMine = true
	}

	if (gSize == 8) {
		gMines = 12
		maxShown = 52
		board[0][0].isMine = true
		board[1][1].isMine = true
    	board[2][2].isMine = true
		board[3][3].isMine = true
    	board[4][4].isMine = true
		board[5][5].isMine = true
    	board[6][6].isMine = true
		board[7][7].isMine = true
    	board[0][7].isMine = true
		board[7][0].isMine = true
    	board[0][6].isMine = true
		board[1][7].isMine = true	
	}

	if (gSize == 12) {
		gMines = 30
		maxShown = 52
		board[0][0].isMine = true
		board[1][1].isMine = true
    	board[2][2].isMine = true
		board[3][3].isMine = true
    	board[4][4].isMine = true
		board[5][5].isMine = true
    	board[6][6].isMine = true
		board[7][7].isMine = true
    	board[0][7].isMine = true
		board[7][0].isMine = true
		board[8][0].isMine = true
		board[8][1].isMine = true
    	board[8][2].isMine = true
		board[8][3].isMine = true
    	board[8][4].isMine = true
		board[8][5].isMine = true
    	board[8][6].isMine = true
		board[8][7].isMine = true
    	board[8][8].isMine = true
		board[8][9].isMine = true
		board[9][0].isMine = true
		board[9][1].isMine = true
    	board[9][2].isMine = true
		board[9][3].isMine = true
    	board[9][4].isMine = true
		board[9][5].isMine = true
    	board[9][6].isMine = true
		board[9][7].isMine = true
    	board[9][8].isMine = true
		board[9][9].isMine = true
	}

	console.log('board: ')
	console.log(board);
	board = setMinesNegsCount(board)
	return board;
}




// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = ''
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n'
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j]

			var cellClass = getClassName({ i: i, j: j })

			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="cellClicked(this,' + i + ',' + j + ')" \n' +
				' onwheel="cellMarked(this,' + i + ',' + j + ')" >\n'
			strHTML += '\t</td>\n'
		}
		strHTML += '</tr>\n'
	}

	console.log('strHTML is:')
	console.log(strHTML);
	var elBoard = document.querySelector('.board')
	elBoard.innerHTML = strHTML
}


function cellClicked(elCell, i, j) {
	if (gIsBeginning) {
		startTimer()
		gIsBeginning = false
	}
	console.log('cell clicked:  ')
	console.log(i)
	console.log(j)
	if (gGameIsON === false) {
		clearInterval(gIntervalId)
		return
	}

	if ((gBoard[i][j].isMarked == true) || (gBoard[i][j].isShown == true)) {
		return
	}

	if (gBoard[i][j].isMine == true) {
		elCell.innerText = MINE
		elCell.classList.add('mine')
		console.log('game over')
		gGameIsON = false
		var elOver = document.querySelector('.over')
		elOver.style.display = 'block'
	} else {
		if (gBoard[i][j].minesAroundCount > 0) {
			elCell.innerText = gBoard[i][j].minesAroundCount 
			console.log(gShownCount)
		} else {
			// shhenim
		}
		gShownCount ++
		console.log(gShownCount)

		elCell.classList.add('cover')
		if (gShownCount == maxShown) {
			gGameIsON = false
			console.log('You Won')
			var elWon = document.querySelector('.won')
			elWon.style.display = 'block'
		}
		gBoard[i][j].isShown = true
	}
}

function cellMarked(elCell, i, j) {
	console.log('shabat shalom!!!')
	if (gBoard[i][j].isMarked) {
		gBoard[i][j].isMarked = false
		elCell.innerText = ''
	} else {
		console.log('111111')
		console.log(gBoard[i][j].isShown)
		if (gBoard[i][j].isShown == false) {
			console.log('2222')
			gBoard[i][j].isMarked = true
			elCell.innerText = '🚩'
		}
	}
}


function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}




// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}


// just a test
//var matCheck = [  [1, 3, 5],
//                  [2, 2, 2],
//				    [5, 5, 5]
//               ]



// how many num 5 Neighbors 
/*
function countNeighborscc(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j]
            if (cell === 5) count++
        }
    }
    return count
}
*/


function countNeighbors(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j]
			console.log(cell)
            if (cell.isMine === true) count++
        }
    }
    return count
}

function setMinesNegsCount(board) {
    
    for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
	
			if (board[i][j].isMine == false) {
				var counterNeighbors = countNeighbors(board, i, j)
				console.log(counterNeighbors)
				console.log('i: ')
				console.log(i)
				console.log('j: ')
				console.log(j)
				console.log('neighbors: ')
				console.log(board[i][j].minesAroundCount)
				// console.log(countNeighbors)
				if (counterNeighbors > 0) {
					board[i][j].minesAroundCount = +counterNeighbors
					console.log(board[i][j].minesAroundCount)
				}
				
			}

			console.log(board[i][j].isMine)

		}
	}

    console.log(board);


	return board;
}





// ⦻
// ⨂
// ⊛
// ⦿
// ≰
// 🪧
// 🚩  
// 🧨


