import { useStore } from 'hooks/store'
import cardPosition from 'utils/card-positions'
import React, { useState, useEffect } from 'react'
import {
  MenuWrapper,
  MenuOptionsWrapper,
  ToggleButton,
  MenuInput,
  MenuInputLabel,
  MenuButton
} from './styles'

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

const MenuOptions = () => {
  const { store, setBuckets, setGenerateVariables, generateCards } = useStore()
  const [ bucketOptions, setMenuOptions ] = useState({ higher: 0, current: 0 })

  /**
   * Retorna uma função que define os valores do bucket sort
   */
  const defineBucketOption = (option: 'current' | 'higher') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuOptions({
      ...bucketOptions,
      [option]: parseInt(e.target.value.trim().replace(/[^\-\d]/g, '') || '0')
    })
  }

  /**
   * Define as variaveis da geração de cartas
   */
  const defineGenerateOptions = (option: 'min' | 'max' | 'count' | 'allowRepeated') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenerateVariables(option, parseInt(e.target.value.trim().replace(/[^\-\d]/g, '') || '0'))
  }

  const pt1 = bucketOptions.current / bucketOptions.higher
  const pt2 = pt1 * store.buckets
  const pt3 = Math.min(Math.max(1, Math.ceil(pt2)), store.buckets)

  return (
    <MenuOptionsWrapper>
      <hr />

      <MenuInputLabel>
        <span>
          Permitir repetidos?
          <MenuInput
            type="checkbox"
            style={{ width: '20px' }}
            checked={store.allowRepeated}
            onChange={() => setGenerateVariables('allowRepeated', !store.allowRepeated)}
          />
        </span>
      </MenuInputLabel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <MenuInputLabel>
          <span>Cartas</span>
          <MenuInput
            type="text"
            value={store.count}
            onChange={defineGenerateOptions('count')}
            />
        </MenuInputLabel>

        <MenuInputLabel>
          <span>Baldes</span>
          <MenuInput
            type="text"
            value={store.buckets}
            onChange={e => setBuckets(parseInt(e.target.value))}
            />
        </MenuInputLabel>
      </div>

      <MenuInputLabel>
        <span>Numeros aleatórios entre</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '10px' }}>
          <MenuInput type="text" value={store.min} onChange={defineGenerateOptions('min')} />
          <span>e</span>
          <MenuInput type="text" value={store.max} onChange={defineGenerateOptions('max')} />
        </div>
      </MenuInputLabel>

      <MenuInputLabel>
        <MenuButton onClick={generateCards}>
          Gerar gerar cartas aleatórias
        </MenuButton>
      </MenuInputLabel>
      
      <hr/>

      <MenuInputLabel>
        <span>Definir valor máximo</span>
        <MenuInput
          type="text"
          value={bucketOptions.higher}
          onChange={defineBucketOption('higher')}
          />
      </MenuInputLabel>

      <MenuInputLabel>
        <span>Definir valor atual</span>
        <MenuInput
          type="text"
          value={bucketOptions.current}
          onChange={defineBucketOption('current')}
          />
      </MenuInputLabel>

      <hr />

      <MenuInputLabel>
        <h4>Formula: (atual / maximo) x baldes</h4>
        <span>{bucketOptions.current} / {bucketOptions.higher} = {pt1 || 0}</span>
        <span>{pt1 || 0} x {store.buckets} = {pt2 || 0}</span>
        <span>Adicionar ao balde = {pt3 || 0}</span>
      </MenuInputLabel>
    </MenuOptionsWrapper>
  )
}

const Menu = () => {
  const [ isOpen, setIsOpen ] = useState(true)
  const { store, flipAllCards, shuffleCards, generateCards, setAnimating } = useStore()

  /**
   * Abre e fecha o menu
   */
  const openCloseMenu = async () => {
    const oldContainer = cardPosition(store.cards.length)
    setIsOpen(!isOpen)
    setAnimating(true)
    await sleep(100)
    const newContainer = cardPosition(store.cards.length)
    const dragElements = document.querySelectorAll('.drag-react') as NodeListOf<HTMLElement>
    dragElements.forEach(dragElement => {
      const top  = parseInt(dragElement.style.top) / oldContainer.height
      const left = parseInt(dragElement.style.left) / oldContainer.width
      dragElement.style.left = `${left * newContainer.width}px`
      dragElement.style.top  = `${top * newContainer.height}px`
    })
    await sleep(200)
    setAnimating(false)
  }

  /**
   * Reseta as posições das cartas
   */
  const resetCardPositions = async () => {
    setAnimating(true)
    const container = cardPosition(store.cards.length)
    const dragElements = document.querySelectorAll('.drag-react') as NodeListOf<HTMLElement>
    dragElements.forEach(dragElement => {
      const cardWrapper = dragElement.querySelector('[data-card]') as HTMLElement
      const index = parseInt(cardWrapper.dataset.card || '0')
      dragElement.style.top  = `${container.y}px`
      dragElement.style.left = `${(container.x * index) + container.sum}px`
    })
    await sleep(200)
    setAnimating(false)
  }

  return (
    <MenuWrapper className={isOpen ? 'opened' : ''}>
      <ToggleButton onClick={openCloseMenu}>
        <i className="gg-chevron-left" />
      </ToggleButton>

      { isOpen && <MenuOptions /> }

      { !isOpen && (
        <MenuOptionsWrapper style={{ position: 'absolute', bottom: 0 }}>
          <MenuInputLabel>
            <MenuButton onClick={() => flipAllCards()}>
              VC
            </MenuButton>
          </MenuInputLabel>

          <MenuInputLabel>
            <MenuButton onClick={() => flipAllCards(false)}>
              VB
            </MenuButton>
          </MenuInputLabel>

          <MenuInputLabel>
            <MenuButton onClick={resetCardPositions}>
              R
            </MenuButton>
          </MenuInputLabel>

          <MenuInputLabel>
            <MenuButton onClick={shuffleCards}>
              E
            </MenuButton>
          </MenuInputLabel>

          <MenuInputLabel>
            <MenuButton onClick={generateCards}>
              G
            </MenuButton>
          </MenuInputLabel>
        </MenuOptionsWrapper>
      )}
    </MenuWrapper>
  )
}

export default Menu
