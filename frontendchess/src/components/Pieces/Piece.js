import arbiter from '../../arbiter/arbiter.js'
import { useAppContext } from '../../contexts/Context.js'
import { generateCandidateMoves } from '../../reducers/actions/move.js'

const Piece = ({
    rank,
    file,
    piece,
}) => {

    const { appState, dispatch } = useAppContext()
    const { turn, castleDirection, position: currentPosition } = appState
    
    const onDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`)
        setTimeout(() => {
            e.target.style.display = 'none'
        }, 0)
        if(turn === piece[0]){
            const candidateMoves = arbiter.getValidMoves({ 
                position: currentPosition[currentPosition.length - 1],
                prevPosition: currentPosition[currentPosition.length - 2],
                castleDirection: castleDirection[turn],
                piece,
                rank,
                file})
            dispatch(generateCandidateMoves({ candidateMoves }))
        }
    }

    const onDragEnd = e => e.target.style.display = 'block'

    return (
        <div 
            className={`piece ${piece} p-${file}${rank}`}
            draggable={true}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        />
    )
}

export default Piece
