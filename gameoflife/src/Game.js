import React from 'react';

import './Game.css';


let cellysize = 25;

const WIDTH = 800;
const HEIGHT = 600;


class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${cellysize * x + 1}px`,
                top: `${cellysize * y + 1}px`,
                width: `${cellysize - 1}px`,
                height: `${cellysize - 1}px`,
            }} />
        );
    }
}


class Game extends React.Component {

    constructor() {
        super();

        this.columns = 32;
        this.rows = 24;

        
        this.board = this.empty();
    }

    state = {
        cells: [],
        isRunning: false,
        interval: 150,
    }

    empty() {
        let board = [];

        for (let y = 0; y < this.rows; y++) {
            board[y] = [];

            for (let x = 0; x < this.columns; x++) {

                board[y][x] = false;

            }
        }

        return board;
    }

    getElementOffset() {

        let rect = this.boardRef.getBoundingClientRect();

        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    handleClick = (event) => {

        const elemOffset = this.getElementOffset();

        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / cellysize);
        const y = Math.floor(offsetY / cellysize);

        if (x >= 0 && x <= this.columns && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    runG = () => {
        this.setState({ isRunning: true });

        this.runIt();
    }

    stopG = () => {
        this.setState({ isRunning: false });

        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }

        
    }

    runIt() {
        let newBoard = this.empty();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIt();
        }, this.state.interval);
    }


    calculateNeighbors(board, x, y) {
        let neighbors = 0;

        const widgets = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

        for (let i = 0; i < widgets.length; i++) {
            const dir = widgets[i];

            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.columns && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    

    clearIt = () => {

        this.board = this.empty();
        this.setState({ cells: this.makeCells() });
    }


    handleIntervalChange = (event) => {

        this.setState({ interval: event.target.value });
    }


    gliders = () => {
        let tom = false;
        for (let y = 0; y <this.rows; y++) {
            for (let x = 0; x < this.columns; x++ ) {
                this.board[y][x] = tom;
            }
            
        }

        this.board[2][1] = true;
        this.board[3][2] = true;
        this.board[3][3] = true;
        this.board[2][3] = true;
        this.board[1][3] = true;

        this.board[8][1] = true;
        this.board[9][2] = true;
        this.board[9][3] = true;
        this.board[8][3] = true;
        this.board[7][3] = true;

        this.setState({
            cells: this.makeCells()
        });
        
    }


    pulsars = () => {
        let tom = false;
        for (let y = 0; y <this.rows; y++) {
            for (let x = 0; x < this.columns; x++ ) {
                this.board[y][x] = tom;
            }
            
        }

        
        this.board[4][6] = true;
        this.board[4][7] = true;
        this.board[4][8] = true;

        this.board[4][12] = true;
        this.board[4][13] = true;
        this.board[4][14] = true;

        this.board[6][4] = true;
        this.board[7][4] = true;
        this.board[8][4] = true;

        this.board[6][9] = true;
        this.board[7][9] = true;
        this.board[8][9] = true;

        //=======================
        this.board[6][11] = true;
        this.board[7][11] = true;
        this.board[8][11] = true;

        this.board[6][16] = true;
        this.board[7][16] = true;
        this.board[8][16] = true;

        this.board[9][12] = true;
        this.board[9][13] = true;
        this.board[9][14] = true;

        this.board[9][6] = true;
        this.board[9][7] = true;
        this.board[9][8] = true;

        // -----------------------
        this.board[11][6] = true;
        this.board[11][7] = true;
        this.board[11][8] = true;

        this.board[11][12] = true;
        this.board[11][13] = true;
        this.board[11][14] = true;

        this.board[13][4] = true;
        this.board[14][4] = true;
        this.board[12][4] = true;

        this.board[13][9] = true;
        this.board[14][9] = true;
        this.board[12][9] = true;

        this.board[13][11] = true;
        this.board[14][11] = true;
        this.board[12][11] = true;

        this.board[13][16] = true;
        this.board[14][16] = true;
        this.board[12][16] = true;

        //----------------------
        this.board[16][6] = true;
        this.board[16][7] = true;
        this.board[16][8] = true;

        this.board[16][12] = true;
        this.board[16][13] = true;
        this.board[16][14] = true;





        

        this.setState({
            cells: this.makeCells()
        });
        
    }


    random = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {

                this.board[y][x] = (Math.random() >= 0.666);

            }
        }

        this.setState({
            cells: this.makeCells()
        });
    }





    render() {
        const { cells, isRunning } = this.state;
        return (
            <div>
                <div className="Board"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${cellysize}px ${cellysize}px`}}
                    onClick={this.handleClick}
                    ref={(stuff) => { this.boardRef = stuff; }}>

                    {cells.map(cell => (

                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}

                </div>

                <div className="controls">

                    <button className="buttony" onClick={this.runG}>Run</button>                    
                    <button className="buttony" onClick={this.stopG}>Stop</button>
                    <button className="buttony" onClick={this.clearIt}>Clear</button>

                </div>

                <div className="controls">

                    <button className="buttony" onClick={this.random}>Random</button>
                    <button className="buttony" onClick={this.gliders}>Two Gliders</button>
                    <button className="buttony" onClick={this.pulsars}>Pulsars</button>

                </div>

                <div>
                    Run Evewry <input value={this.state.interval} onChange={this.handleIntervalChange} /> ms!
                </div>


                
                <div>
                    <hr></hr>
                    <h2>Conway's Game of Life</h2>
                    <p>Other Stuff About him...</p>
                </div>


            </div>
        );
    }
}


export default Game;