import styled from 'styled-components'

export const BucketWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 20px;
  gap: 10px;
`

export const Bucket = styled.div`
  height: 100%;
  width: 20px;
  color: white;
  text-align: center;
  background-color: rgb(255, 0, 0, 0.5);
  border-radius: 0 0 5px 5px;
  user-select: none;
`

export const ContainerWrapper = styled.div`
  flex: 1;
  position: relative;
`
