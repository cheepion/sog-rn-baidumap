import React from 'react';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  useColorScheme,
} from 'react-native';

import {
  BaiduMapManager,
  MapView,
  Geolocation,
  Overlay,
  MapApp,
} from 'sog-baidu-map';

BaiduMapManager.initSDK('G5mYoNNuUrrk0b91dcYQRdFo5qGfRAcQ');

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 发起定位请求
  const getCurrentPosition = async () => {
    const result = await Geolocation.getCurrentPosition(); // 获取监听的定位信息
    console.log('location', result);
    Geolocation.stopLocating(); // 清除监听的定位方法, 防止监听多次定位重复
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="说明">用于测试react-native baidu地图插件,</Section>
          <Section title="使用定位">
            {/* <ReloadInstructions /> */}
            <View style={styles.button}>
              <Button onPress={() => getCurrentPosition()} title="定位测试" />
            </View>
          </Section>
          {/* <LearnMoreLinks /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    width: 80,
    margin: 8,
  },
});

export default App;
