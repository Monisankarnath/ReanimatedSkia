import React, {useEffect} from 'react';
import Animated, {useAnimatedProps, withTiming} from 'react-native-reanimated';
import Svg, {Path, Rect} from 'react-native-svg';
import AnimatedVolume from './AnimatedVolume';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const paths = [
  'M52.9279 29.9971C52.6353 29.7333 52.2881 29.5242 51.9061 29.3817C51.5241 29.2392 51.1148 29.1661 50.7015 29.1667C50.2883 29.1672 49.8792 29.2413 49.4977 29.3848C49.1161 29.5282 48.7696 29.7382 48.4778 30.0028C48.186 30.2673 47.9547 30.5812 47.7971 30.9266C47.6395 31.2719 47.5587 31.642 47.5593 32.0156C47.5599 32.3892 47.6418 32.759 47.8005 33.104C47.9592 33.4489 48.1915 33.7623 48.4841 34.0261C49.5699 35.0077 50.1678 36.3109 50.1678 37.6994C50.1678 39.0907 49.5699 40.3967 48.4809 41.3812C47.8908 41.9148 47.5593 42.6384 47.5593 43.3929C47.5593 44.1474 47.8908 44.871 48.4809 45.4045C49.0711 45.9381 49.8714 46.2378 50.706 46.2378C51.5406 46.2378 52.3409 45.9381 52.9311 45.4045C55.2096 43.3474 56.4622 40.6101 56.4622 37.6994C56.4622 34.7886 55.2096 32.0542 52.9279 29.9971Z',
  'M62.3704 24.199C62.0796 23.9276 61.732 23.7113 61.3478 23.5627C60.9636 23.4141 60.5506 23.3362 60.1327 23.3334C59.7148 23.3307 59.3005 23.4032 58.914 23.5468C58.5275 23.6903 58.1764 23.902 57.8813 24.1696C57.5863 24.4371 57.3531 24.7551 57.1954 25.1049C57.0377 25.4548 56.9586 25.8296 56.9629 26.2073C56.9671 26.5851 57.0545 26.9584 57.2199 27.3053C57.3854 27.6522 57.6256 27.9659 57.9266 28.228C59.291 29.4525 60.3731 30.9098 61.11 32.5152C61.8468 34.1207 62.2239 35.8424 62.2193 37.5806C62.226 39.3239 61.8497 41.0511 61.1123 42.662C60.3748 44.2729 59.2909 45.7353 57.9234 46.9645C57.3333 47.498 57.0018 48.2216 57.0018 48.9761C57.0018 49.7306 57.3333 50.4542 57.9234 50.9878C58.5135 51.5213 59.3139 51.821 60.1485 51.821C60.983 51.821 61.7834 51.5213 62.3735 50.9878C64.3275 49.231 65.8763 47.1411 66.9303 44.8391C67.9843 42.5372 68.5225 40.0691 68.5137 37.5777C68.52 35.0911 67.9801 32.6281 66.9256 30.3315C65.871 28.035 64.3227 25.9505 62.3704 24.199Z',
  'M71.7738 18.3656C71.4831 18.0943 71.1355 17.878 70.7513 17.7294C70.3671 17.5808 69.954 17.5028 69.5361 17.5001C69.1182 17.4973 68.7039 17.5699 68.3174 17.7134C67.9309 17.857 67.5798 18.0687 67.2848 18.3362C66.9897 18.6037 66.7565 18.9217 66.5988 19.2716C66.4411 19.6215 66.3621 19.9962 66.3663 20.374C66.3705 20.7518 66.4579 21.125 66.6233 21.4719C66.7888 21.8189 67.029 22.1325 67.33 22.3946C69.5231 24.3633 71.2622 26.7059 72.4464 29.2868C73.6306 31.8676 74.2364 34.6353 74.2286 37.4293C74.2401 40.2314 73.6359 43.0075 72.4511 45.5968C71.2663 48.186 69.5245 50.5367 67.3268 52.5124C67.0346 52.7766 66.8029 53.0902 66.6447 53.4354C66.4866 53.7806 66.4052 54.1505 66.4052 54.5241C66.4052 54.8977 66.4866 55.2676 66.6447 55.6128C66.8029 55.9579 67.0346 56.2716 67.3268 56.5357C67.619 56.7999 67.9659 57.0095 68.3477 57.1524C68.7295 57.2954 69.1387 57.369 69.5519 57.369C69.9651 57.369 70.3743 57.2954 70.7561 57.1524C71.1379 57.0095 71.4848 56.7999 71.777 56.5357C74.5613 54.0319 76.7682 51.0533 78.2695 47.7725C79.7709 44.4917 80.5368 40.9741 80.523 37.4237C80.5329 33.8815 79.7645 30.3729 78.2626 27.1013C76.7607 23.8298 74.5551 20.8604 71.7738 18.3656Z',
];
const Volume = ({h, w, volBarW}) => {
  const animatedRectProps = useAnimatedProps(() => ({
    height: withTiming(volBarW.value === 0 ? 58.101 : 0, {duration: 500}),
  }));
  return (
    <Svg
      width={w}
      height={h}
      viewBox="0 0 85 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M36.9936 17.5C35.5805 17.5 34.1454 17.9325 32.726 18.7889L24.3136 23.8593C21.9469 25.2877 17.3741 26.5368 14.529 26.5368C9.32356 26.5368 5.08745 30.3666 5.08745 35.0728V40.7634C5.08745 45.4696 9.32356 49.2994 14.529 49.2994C17.3741 49.2994 21.9469 50.5485 24.3136 51.9769L32.7229 57.0444C34.1423 57.9008 35.5774 58.3333 36.9905 58.3333C39.8166 58.3362 42.8537 56.3985 42.8537 52.1447V23.6914C42.8537 19.4377 39.8167 17.5 36.9936 17.5ZM14.529 43.6087C13.6943 43.6087 12.8938 43.309 12.3036 42.7754C11.7134 42.2418 11.3818 41.518 11.3818 40.7634V35.0728C11.3818 34.3181 11.7134 33.5944 12.3036 33.0608C12.8938 32.5272 13.6943 32.2274 14.529 32.2274C18.3403 32.2274 23.6779 30.819 27.1178 28.9667V46.8723C23.6779 45.0172 18.3403 43.6087 14.529 43.6087ZM36.5593 52.1447L36.5404 52.4862L36.2131 52.3098L30.2649 48.7247V27.1115L36.2163 23.5236L36.5436 23.3472L36.5593 23.6914V52.1447Z"
        fill="white"
      />
      {paths.map((d, i) => (
        <AnimatedVolume d={d} key={i} index={i} volBarW={volBarW} />
      ))}
      <AnimatedRect
        x="0.666653"
        y="0.0698104"
        width="5.5928"
        animatedProps={animatedRectProps}
        rx="2.7964"
        transform="matrix(0.743941 -0.668246 0.589365 0.807867 9.14721 19.6131)"
        fill="white"
        stroke="black"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default Volume;