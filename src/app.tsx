import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import Index from './pages/index';
import { toastTxt } from './constants/constants';
import weatherStore from './store/weatherStore';

const store = {
  weatherStore,
};

class App extends Component {
  config: Config = {
    pages: ['pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Natsuha',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
      enablePullDownRefresh: true,
    },
    permission: {
      'scope.userLocation': {
        desc: toastTxt.userLocationDescription,
      },
    },
  };

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
