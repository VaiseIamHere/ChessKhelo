import arbiter from '../../../arbiter/arbiter.js'
import { useAppContext } from '../../../contexts/Context.js'
import { generateCandidateMoves } from '../../../reducers/actions/move.js'

const Piece = ({
    rank,
    file,
    piece,
}) => {

    const { appState, dispatch } = useAppContext()
    const { turn } = appState
    
    const onDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`)
        setTimeout(() => {
            e.target.style.display = 'none'
        }, 0)
        if(turn === piece[0]){
            const candidateMoves = arbiter.getRegularMoves({ 
                position: appState.position[appState.position.length - 1],
                prevPosition: appState.position[appState.position.length - 2],
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
