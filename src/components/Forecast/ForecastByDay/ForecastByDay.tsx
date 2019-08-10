import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cs from 'classnames';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../../types/weather';
import {
  formatWeek,
  getImageUrl,
  getRainfallIconName,
} from '../../../utils/util';
const styles = require('./ForecastByDay.module.scss');

interface IForecastByDayStates {
  isFive: boolean;
}

@inject('weatherStore')
@observer
class ForecastByDay extends Component<IWeatherProps, IForecastByDayStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isFive: true,
    };
  }

  public handleDay = (day: number) => {
    if (day === 5) {
      this.setState({
        isFive: true,
      });
    } else {
      this.setState({
        isFive: false,
      });
    }
  };

  render() {
    const {
      weatherStore: {
        weatherData: {
          forecasts: { daily },
          observation,
        },
        metaData,
      },
    } = this.props;

    const { isFive } = this.state;

    const dailyList = daily.slice(0, 10).map((day, key) => (
      <View key={key}>
        <View className={styles.day_group}>
          <View className={styles.group_basic}>
            <Text className={styles.week_name}>
              {formatWeek(day.observationTime.weekday)}
            </Text>
            <View className={styles.condition_img}>
              <Image
                className={styles.condition_image}
                src={getImageUrl(
                  'Temperature',
                  metaData.skycode[observation.conditionCode],
                )}
              />
            </View>
            <View className={styles.precipitation_group}>
              <Image
                className={styles.precipitation_icon}
                src={getImageUrl(
                  'Precipitation',
                  getRainfallIconName(day.precipitationProbability),
                )}
              />
              <Text className={styles.precipitation}>
                {day.precipitationProbability}%
              </Text>
            </View>
            <Text className={styles.high}>
              {day.temperature.high.toFixed(0)}°
            </Text>
            <Text className={styles.low}>
              {day.temperature.low.toFixed(0)}°
            </Text>
          </View>
        </View>
      </View>
    ));

    return (
      <View className={styles.forecast_day_conatainer}>
        <View className={cs(styles.list, isFive ? styles.five_item : '')}>
          {dailyList}
        </View>
        <View className={styles.day_picker}>
          <Text
            className={cs(styles.five_day, isFive ? '' : styles.unselected_picker)}
            onClick={() => this.handleDay(5)}
          >
            5 DAY
          </Text>
          <Text
            className={isFive ? styles.unselected_picker : ''}
            onClick={() => this.handleDay(10)}
          >
            10 DAY
          </Text>
        </View>
      </View>
    );
  }
}

export default ForecastByDay as ComponentType;
