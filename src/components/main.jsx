import { h } from 'preact'
import './main.scss'

import HueRotateTitle from './hue-rotate-title'

const main = () => (
  <div className='home__container'>
    <div className='home__title'>
      <HueRotateTitle animate>Hello World!</HueRotateTitle>
    </div>
  </div>
)

export default main
