import { Draggable } from 'drag-react'
import { useStore } from 'hooks/store'
import { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip'
import { CardWrapper, CardFace } from './styles'

type CardProps = Card & {
  index?: number
}

const Card = ({ front = 0, flipped = false, left = 0, top = 0, index = 0, transition = 0 }: CardProps) => {
  const [ zIndex, setZIndex ] = useState(0)
  const { store, incrementZIndex, flipCard, setTopAndLeft } = useStore()

  // Só rerenderiza se o zindex mudar
  useEffect(() => {}, [ zIndex ])

  /**
   * Ao clicar move a carta pra cima sentido Z
   */
  const onClickCard = (e) => {
    incrementZIndex()
    setZIndex(store.zIndexCounter)
  }

  return(
    <Draggable style={{ zIndex, top: `${top}px`, left: `${left}px` }}>
      <CardWrapper data-card={index} onMouseDown={onClickCard} onDoubleClick={() => flipCard(index)}>
        <ReactCardFlip isFlipped={flipped}>
          <CardFace data-index={index + 1} className="back" />
          <CardFace>
            <div>{front}</div>
          </CardFace>
        </ReactCardFlip>
      </CardWrapper>
    </Draggable>
  )
}

export default Card
