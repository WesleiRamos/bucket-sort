import cardPosition from 'utils/card-positions'
import { createContext, useState } from 'react'

type AppState = {
  cards: Card[],
  buckets: number,
  min: number,
  max: number,
  count: number,
  zIndexCounter: number,
  allowRepeated: boolean
}

type AppContext = {
  store: AppState,
  incrementZIndex: () => void,
  setCards: (cards: Card[], resetZIndex?: boolean) => void,
  setBuckets: (buckets: number) => void,
  flipCard: (index: number) => void,
  shuffleCards: () => void,
  generateCards: () => void,
  flipAllCards: (up?: boolean) => void,
  setAnimating: (animating: boolean, time?: string) => void,
  setTopAndLeft: (index: number, options: { top?: number, left?: number }) => void,
  setGenerateVariables: (key: 'min' | 'max' | 'count' | 'allowRepeated', value: number | boolean) => void
}

const DEFAULT_STATE: AppState = {
  cards: [],
  buckets: 4,
  zIndexCounter: 0,
  min: 1,
  max: 10,
  count: 5,
  allowRepeated: false
}

const uid = () => (
  String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '')
)

export const AppContext = createContext<AppContext>({
  store: DEFAULT_STATE,
  setCards: () => {},
  flipCard: () => {},
  setBuckets: () => {},
  shuffleCards: () => {},
  setTopAndLeft: () => {},
  flipAllCards: () => {},
  generateCards: () => {},
  incrementZIndex: () => {},
  setAnimating: () => {},
  setGenerateVariables: () => {}
})

const AppProvider = ({ children }) => {
  const [ data, setData ] = useState<AppState>(DEFAULT_STATE)

  /**
   * Incrementa a contagem do zIndex para manter sempre a carta clicada
   * no topo
   */
  const incrementZIndex = () => {
    setData({ ...data, zIndexCounter: data.zIndexCounter + 1 })
  }

  /**
   * Define um novo set de cartas
   * @param cards 
   */
  const setCards = (cards: Card[], resetZIndex: boolean = true) => {
    setData({ ...data, cards, zIndexCounter: resetZIndex ? 0 : data.zIndexCounter })
  }

  /**
   * Define a quantidade de baldes
   * @param buckets 
   */
  const setBuckets = (buckets: number) => {
    setData({ ...data, buckets: buckets || 0 })
  }

  /**
   * Vira uma carta
   * @param index 
   */
  const flipCard = (index: number) => {
    const cards = [ ...data.cards ]
    cards[index].flipped = !cards[index].flipped
    setData({ ...data, cards })
  }

  /**
   * Vira todas as cartas
   * @param up Lado de cima?
   */
  const flipAllCards = (up: boolean = true) => {
    setData({ 
      ...data,
      cards: data.cards.map(card => ({
        ...card,
        flipped: up
      }))
    })
  }

  /**
   * Define as posições top e left de uma carta
   * @param index 
   * @param options 
   */
  const setTopAndLeft = (index: number, options: { top?: number, left?: number }) => {
    const cards = [ ...data.cards ]
    cards[index] = {
      ...cards[index],
      ...options
    }

    setData({ ...data, cards })
  }

  /**
   * Reseta as cartas nas suas posições originais
   * @param cards 
   * @returns {Card[]}
   */
  const resetPositions = (cards) => {
    const { x, y, sum } = cardPosition(cards.length)
    return cards.map((card, index) => ({ ...card, top: y, left: (x * index) + sum }))
  }
  
  /**
   * Embaralha as cartas e reseta suas posições
   */
  const shuffleCards = () => {
    const cards = [ ...data.cards ]
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    setData({ ...data, cards: resetPositions(cards) })
  }

  /**
   * Gera um novo set de cartas
   */
  const generateCards = () => {
    const min = Math.min(data.min, data.max)
    const max = Math.max(data.min, data.max)
    
    const possibilities = min <= 0 
      ? max + 1 + Math.abs(min)
      : max
    
    if (possibilities < data.count && !data.allowRepeated) {
      alert('O intervalo de números deve ser maior ou igual a quantidade de cartões')
      return
    }
    
    const cards: number[] = []
    while (cards.length < data.count) {
      const number = Math.floor(Math.random() * (max - min + 1)) + min
      if (data.allowRepeated) {
        cards.push(number)
      } else if (!cards.includes(number)) {
        cards.push(number)
      }
    }

    setCards(resetPositions(cards.map(front => ({
      front,
      flipped: false,
      id: uid()
    }))))
  }

  /**
   * Define as variáveis de geração de cartas
   * @param key 
   * @param value 
   */
  const setGenerateVariables = (key: 'min' | 'max' | 'count' | 'allowRepeated', value: number | boolean) => {
    setData({ ...data, [key]: value })
  }

  /**
   * Atualiza o estado da animação das cartas
   */
  const setAnimating = (animating: boolean, time: string = '.2s') => {
    document
      .documentElement
      .style
      .setProperty('--transition-cards', animating ? time : '0')
  }

  return (
    <AppContext.Provider value={{
      store: data,
      setCards,
      flipCard,
      setBuckets,
      generateCards,
      shuffleCards,
      flipAllCards,
      setAnimating,
      setTopAndLeft,
      incrementZIndex,
      setGenerateVariables
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
