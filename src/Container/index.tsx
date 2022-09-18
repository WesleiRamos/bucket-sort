import Card from './Card'
import { useStore } from 'hooks/store'
import { ContainerWrapper, BucketWrapper, Bucket } from './styles'

/**
 * Renderiza a quantidade de buckets informada
 */
const BucketRender = (bucketsCount: number) => {
  return new Array(bucketsCount)
    .fill(0)
    .map((_, i) => (
      <Bucket key={i}>
        <span>{i + 1}</span>
      </Bucket>
    ))
}

const Container = () => {
  const { store } = useStore()

  /**
   * Renderiza as cartas
   */
  const renderCards = () => {
    if (!store.cards.length)
      return null

    return store.cards.map((card, index) => {
      return <Card key={card.id} {...card} index={index} />
    })
  }

  return (
    <ContainerWrapper id="card-container">
      <BucketWrapper>
        {BucketRender(store.buckets)}
      </BucketWrapper>

      {renderCards()}
    </ContainerWrapper>
  )
}

export default Container
