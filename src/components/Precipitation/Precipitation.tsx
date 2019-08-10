import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import {
  upperFirstLetter,
  getImageUrl,
  getRainfallIconName
} from '../../utils/util';
const styles = require('./Precipitation.module.scss');

@inject('weatherStore')
@observer
class Precipitation extends Component<IWeatherProps, {}> {
  render() {
    const {
      weatherStore: { weatherData }
    } = this.props;

    const list = weatherData.precipitations.slice(0, 4).map((value, key) => (
      <View className={styles.precipitation_group} key={key}>
        <Text>{upperFirstLetter(value.timeSlot)}</Text>
        <Image
          className={styles.icon}
          src={getImageUrl(
            'Precipitation',
            getRainfallIconName(value.probability)
          )}
        />
        <Text>{value.probability}%</Text>
      </View>
    ));

    return (
      <ContentWrapper title="Precipitation">
        <View className={styles.precipitation_container}>{list}</View>
      </ContentWrapper>
    );
  }
}

export default Precipitation as ComponentType;
