import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { Image, Block } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import cs from 'classnames'
import { defaultPhotoUrl, toastTxt } from '../../constants/constants'
import { setToast } from '../../utils/toast'
import { WeatherProps } from '../../types/weather'
import styles from './Background.module.scss'

interface BackgroundProps {
  needBlur: boolean
}

@inject('weatherStore')
@observer
class Background extends Component<WeatherProps, {}> {
  constructor(props: WeatherProps) {
    super(props)
    this.state = {}
  }
  public onError = () => {
    setToast(toastTxt.imageFail)
    this.props.weatherStore.backgroudImageUrl = defaultPhotoUrl
  }

  render() {
    const {
      weatherStore: { backgroudImageUrl },
      needBlur,
    } = this.props

    return (
      <Block>
        <Image
          className={cs(styles.full_screen_background)}
          src={defaultPhotoUrl}
        />
        <Image
          className={cs(styles.full_screen_background)}
          src={backgroudImageUrl}
          onError={() => this.onError()}
        />
        <Image
          className={cs(
            styles.full_screen_background,
            needBlur ? styles.background_blur : '',
          )}
          src={backgroudImageUrl}
        />
      </Block>
    )
  }
}

export default Background as ComponentType<BackgroundProps>
