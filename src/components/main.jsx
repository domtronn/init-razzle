import { h } from 'preact'
import './main.scss'

import HueRotateTitle from './hue-rotate-title'
import { Button } from 'ustyle-react'

const main = () => (
  <div className='home__container'>
    <div className='home__title'>
      <HueRotateTitle animate>Hello World!</HueRotateTitle>
      <Button size='large' variant='primary' blocked />
    </div>
  </div>
)

export default main
