import './Pieces.css'
import Piece from './Piece.js'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../../helper.js'
import { useAppContext } from '../../contexts/Context.js'
import { clearCandidates, makeNewMove } from '../../reducers/actions/move.js'
import arbiter from '../../arbiter/arbiter.js'
import { openPromotion } from '../../reducers/actions/popup.js'
import { getCastleDirections } from '../../arbiter/getMoves.js'
import { updateCastling } from '../../reducers/actions/game.js'

const Pieces = () => {
    const ref = useRef()
    const { appState, dispatch } = useAppContext()

    const currentPosition = appState.position[appState.position.length - 1]
    
    const calculateCoordinates = e => {
        const { width, left, top} = ref.current.getBoundingClientRect()
        const size = width / 8
        const x = 7 - Math.floor((e.clientY - top) / size)
        const y = Math.floor((e.clientX - left) / size)
        return { x, y }
    }

    const openPromotionBox = ({rank, file, x, y}) => 
        dispatch(openPromotion({
            rank: Number(rank),
            file: Number(file),
            x,
            y
        }))

    const updateCastlingState = ({ piece, rank, file }) => {
        const direction = getCastleDirections({
            castleDirection: appState.castleDirection,
            piece, rank, file
        })

        if(direction){
            dispatch(updateCastling(direction))
        }
    }

    const move = e => {
        const { x, y } = calculateCoordinates(e)
        const [ piece, rank, file ] = e.dataTransfer.getData('text').split(',')

        if(appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)){
                openPromotionBox({rank, file, x, y})
                return
            }

            if(piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({ piece, rank, file })
            }
            const newPosition = arbiter.performMove({
                position : currentPosition,
                piece, rank, file,
                x, y
            })
            dispatch(makeNewMove({newPosition}))
        }
        dispatch(clearCandidates())
    }

    const onDrop = e => {
        e.preventDefault()

        move(e)
    }

    const onDragOver = e => e.preventDefault()

    return <div 
    ref={ref}
    className='pieces'
    onDragOver={onDragOver}
    onDrop={onDrop}>
        {
            currentPosition.map((r, rank) => 
                r.map((f, file) => 
                    currentPosition[rank][file] 
                    ? < Piece 
                            key={rank+'-'+file}
                            rank={rank}
                            file={file}
                            piece={currentPosition[rank][file]}
                    />
                    : null
                )
            )
        }
    </div>
}

export default Pieces
