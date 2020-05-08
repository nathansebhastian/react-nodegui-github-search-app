import React from 'react';
import {
  hot,
  Window,
  View,
} from '@nodegui/react-nodegui';

const App = () => {

  return (
    <Window
      windowTitle='GitHub Search App'
      minSize={{width: 550, height: 450}}
      styleSheet={styleSheet}>
      <View>Hello World</View>
    </Window>
  );
};

export default hot(App);
