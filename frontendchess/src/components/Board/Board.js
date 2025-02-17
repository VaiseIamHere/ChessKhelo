import Ranks from './bits/Ranks.js'
import Files from './bits/Files.js'
import Pieces from './Pieces/Pieces.js';
import './Board.css';
import { useAppContext } from '../../contexts/Context.js';

const Board = () => {
    
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => i+1)

    const { appState } = useAppContext()
    const position = appState.position[appState.position.length - 1]

    const getTileClass = (i, j) => {
        let c = 'tile'
        c+= (i+j)%2 === 0 ? ' tile-light' : ' tile-dark'

        if(appState.candidateMoves?.find(m => m[0] === i && m[1] === j)){
            if(position[i][j]){
                c += ' attacking'
            }
            else{
                c += ' highlight'
            }
        }
        return c                    
    }

    return <div className='board'>

        <Ranks ranks={ranks} />

        <div className='tiles'>
            {ranks.map((rank, i) =>
                files.map((file, j) =>
                    <div key={file+'-'+rank} className={getTileClass(7-i, j)}></div>
                ) 
            )}
        </div>
        
        <Pieces />

        <Files files={files} />
    </div>

}

export default Board