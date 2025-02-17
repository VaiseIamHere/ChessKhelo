import './Pieces.css'
import Piece from './Piece.js'
import { useState, useRef } from 'react'
import { createPosition, copyPosition } from '../../../helper.js'
import { useAppContext } from '../../../contexts/Context.js'
import { clearCandidates, makeNewMove } from '../../../reducers/actions/move.js'

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

    const onDrop = e => {
        const newPosition = copyPosition(currentPosition)
        const { x, y } = calculateCoordinates(e)
        const [ p, rank, file ] = e.dataTransfer.getData('text').split(',')

        if(appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            if(p.endsWith('p') && !newPosition[x][y] && x !== rank && y !== file){
                newPosition[rank][y] = ''
            }

            newPosition[rank][file] = ''
            newPosition[x][y] = p
            dispatch(makeNewMove({newPosition}))
        }
        
        dispatch(clearCandidates())
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
