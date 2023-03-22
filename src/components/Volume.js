import React from 'react';
import Animated, {
  useAnimatedProps,
  withTiming,
  Extrapolation,
  interpolate,
  withSpring,
  withDelay,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, { Mask, Path, Rect} from 'react-native-svg';
import AnimatedVolume from './AnimatedVolume';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const paths = [
  'M43.1414 15.1412C42.9693 14.9904 42.7651 14.8709 42.5404 14.7895C42.3157 14.7081 42.0749 14.6664 41.8318 14.6667C41.5887 14.667 41.3481 14.7093 41.1237 14.7913C40.8992 14.8733 40.6954 14.9933 40.5237 15.1444C40.3521 15.2956 40.216 15.475 40.1233 15.6723C40.0306 15.8697 39.9831 16.0811 39.9834 16.2946C39.9838 16.5081 40.032 16.7194 40.1253 16.9166C40.2187 17.1137 40.3553 17.2927 40.5274 17.4435C41.1661 18.0044 41.5179 18.7491 41.5179 19.5425C41.5179 20.3376 41.1661 21.0839 40.5256 21.6464C40.1784 21.9513 39.9834 22.3648 39.9834 22.7959C39.9834 23.2271 40.1784 23.6406 40.5256 23.9454C40.8727 24.2503 41.3435 24.4216 41.8344 24.4216C42.3254 24.4216 42.7962 24.2503 43.1433 23.9454C44.4836 22.7699 45.2204 21.2058 45.2204 19.5425C45.2204 17.8792 44.4836 16.3167 43.1414 15.1412Z',
  'M48.6959 11.828C48.5248 11.6729 48.3204 11.5493 48.0944 11.4644C47.8684 11.3795 47.6254 11.335 47.3796 11.3334C47.1338 11.3318 46.8901 11.3733 46.6627 11.4553C46.4353 11.5373 46.2288 11.6583 46.0552 11.8112C45.8817 11.9641 45.7445 12.1458 45.6517 12.3457C45.559 12.5456 45.5125 12.7598 45.515 12.9756C45.5174 13.1915 45.5688 13.4048 45.6662 13.603C45.7635 13.8013 45.9048 13.9805 46.0818 14.1303C46.8845 14.83 47.521 15.6627 47.9544 16.5801C48.3879 17.4975 48.6097 18.4814 48.607 19.4746C48.6109 20.4708 48.3896 21.4578 47.9558 22.3783C47.522 23.2988 46.8844 24.1345 46.08 24.8368C45.7329 25.1417 45.5378 25.5552 45.5378 25.9864C45.5378 26.4175 45.7329 26.831 46.08 27.1359C46.4271 27.4407 46.8979 27.612 47.3889 27.612C47.8798 27.612 48.3506 27.4407 48.6977 27.1359C49.8471 26.132 50.7582 24.9378 51.3782 23.6224C51.9982 22.307 52.3148 20.8966 52.3096 19.473C52.3133 18.0521 51.9957 16.6446 51.3754 15.3323C50.7551 14.02 49.8443 12.8289 48.6959 11.828Z',
  'M54.2273 8.49465C54.0562 8.33958 53.8518 8.21599 53.6258 8.13107C53.3998 8.04615 53.1568 8.00161 52.911 8.00004C52.6652 7.99848 52.4215 8.03992 52.1941 8.12196C51.9667 8.20399 51.7602 8.32497 51.5867 8.47784C51.4131 8.63071 51.2759 8.81241 51.1832 9.01234C51.0904 9.21226 51.0439 9.42641 51.0464 9.64228C51.0489 9.85816 51.1003 10.0714 51.1976 10.2697C51.2949 10.4679 51.4362 10.6472 51.6133 10.7969C52.9033 11.9219 53.9263 13.2605 54.6229 14.7353C55.3195 16.21 55.6758 17.7916 55.6713 19.3882C55.678 20.9894 55.3226 22.5757 54.6257 24.0553C53.9287 25.5348 52.9042 26.8781 51.6114 28.0071C51.4395 28.1581 51.3032 28.3373 51.2102 28.5345C51.1171 28.7317 51.0693 28.9431 51.0693 29.1566C51.0693 29.3701 51.1171 29.5815 51.2102 29.7787C51.3032 29.976 51.4395 30.1552 51.6114 30.3061C51.7833 30.4571 51.9873 30.5768 52.2119 30.6585C52.4365 30.7402 52.6772 30.7823 52.9203 30.7823C53.1634 30.7823 53.404 30.7402 53.6286 30.6585C53.8532 30.5768 54.0573 30.4571 54.2291 30.3061C55.867 28.8754 57.1651 27.1733 58.0483 25.2986C58.9314 23.4238 59.382 21.4138 59.3739 19.3849C59.3797 17.3609 58.9277 15.3559 58.0442 13.4865C57.1607 11.617 55.8633 9.92024 54.2273 8.49465Z',
];
const Volume = ({
  volBarW,
  volBarPressed,
  color,
  springConfig,
}) => {
  const volBarOuterW = useDerivedValue(()=> {
    return volBarPressed.value ? 220 : 140; 
  });
  const volBarInnerW = useDerivedValue(()=> {
    const width = interpolate(
      volBarW.value,
      [0, 140],
      [0, 100],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return width*volBarOuterW.value/100; 
  });
  const volumePercentage= useDerivedValue(()=> {
    const width = interpolate(
      volBarW.value,
      [0, 140],
      [0, 100],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return width; 
  });
  const animatedBar = useAnimatedProps(() => ({
    width: withSpring(volBarInnerW?.value, springConfig),
    height: volBarPressed.value
      ? withSpring(40, springConfig)
      : withSpring(8, springConfig),
    rx: volBarPressed.value
      ? withSpring(12, springConfig)
      : withSpring(4, springConfig),
    x: volBarPressed.value
      ? withSpring(0, springConfig)
      : withSpring(68, springConfig),
    y: volBarPressed.value
      ? withSpring(0, springConfig)
      : withSpring(16, springConfig),
  }));
  const animatedOuterBar = useAnimatedProps(() => {
    return {
      width: withSpring(volBarOuterW.value, springConfig),
      height: volBarPressed.value
        ? withSpring(40, springConfig)
        : withSpring(8, springConfig),
      rx: volBarPressed.value
        ? withSpring(12, springConfig)
        : withSpring(4, springConfig),
      x: volBarPressed.value
        ? withSpring(0, springConfig)
        : withSpring(68, springConfig),
      y: volBarPressed.value
        ? withSpring(0, springConfig)
        : withSpring(16, springConfig),
    };
  });
  const animatedCrossProps = useAnimatedProps(() => ({
    height: withTiming(volBarW.value <= 0 ? 34 : 0, {duration: 500}),
    width:  volBarW.value <= 0 ? 
      withTiming(4, {duration: 10}) : 
      withDelay(490, withTiming(0, {duration: 10})),
  }));
  return (
    <Svg
      width="220"
      height="40"
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask id="mask">
        <Path
          id="Speaker"
          d="M33.7683 8C32.9371 8 32.0929 8.24714 31.258 8.73653L26.3095 11.6339C24.9173 12.4501 22.2274 13.1639 20.5539 13.1639C17.4918 13.1639 15 15.3523 15 18.0416V21.2934C15 23.9826 17.4918 26.1711 20.5539 26.1711C22.2274 26.1711 24.9173 26.8849 26.3095 27.7011L31.2561 30.5968C32.0911 31.0862 32.9353 31.3333 33.7665 31.3333C35.4289 31.335 37.2154 30.2277 37.2154 27.797V11.538C37.2154 9.10724 35.4289 8 33.7683 8ZM20.5539 22.9193C20.0629 22.9193 19.592 22.748 19.2448 22.4431C18.8976 22.1382 18.7026 21.7246 18.7026 21.2934V18.0416C18.7026 17.6104 18.8976 17.1968 19.2448 16.8919C19.592 16.587 20.0629 16.4157 20.5539 16.4157C22.7958 16.4157 25.9355 15.6109 27.959 14.5524V24.7842C25.9355 23.7241 22.7958 22.9193 20.5539 22.9193ZM33.5129 27.797L33.5018 27.9921L33.3092 27.8913L29.8103 25.8427V13.4923L33.3111 11.442L33.5036 11.3412L33.5129 11.538V27.797Z"
          fill={color}
        />
        {paths.map((d, i) => (
          <AnimatedVolume
            d={d}
            key={i}
            index={i}
            volumePercentage={volumePercentage}
            color={color}
          />
        ))}
        <AnimatedRect
          id="cross"
          x="0.680295"
          y="-0.0238379"
          rx="1.41452"
          transform="matrix(0.654641 -0.755939 0.705948 0.708264 15.2592 10.4018)"
          stroke="black"
          stroke-linejoin="round"
          fill={color}
          animatedProps={animatedCrossProps}
        />
      </Mask>
      <AnimatedRect
        id="fullbar"
        animatedProps={animatedOuterBar}
        fill="#343434"
      />
      <AnimatedRect id="bar" animatedProps={animatedBar} fill={color} />
      
      <Path
        id="Speaker"
        d="M33.7683 8C32.9371 8 32.0929 8.24714 31.258 8.73653L26.3095 11.6339C24.9173 12.4501 22.2274 13.1639 20.5539 13.1639C17.4918 13.1639 15 15.3523 15 18.0416V21.2934C15 23.9826 17.4918 26.1711 20.5539 26.1711C22.2274 26.1711 24.9173 26.8849 26.3095 27.7011L31.2561 30.5968C32.0911 31.0862 32.9353 31.3333 33.7665 31.3333C35.4289 31.335 37.2154 30.2277 37.2154 27.797V11.538C37.2154 9.10724 35.4289 8 33.7683 8ZM20.5539 22.9193C20.0629 22.9193 19.592 22.748 19.2448 22.4431C18.8976 22.1382 18.7026 21.7246 18.7026 21.2934V18.0416C18.7026 17.6104 18.8976 17.1968 19.2448 16.8919C19.592 16.587 20.0629 16.4157 20.5539 16.4157C22.7958 16.4157 25.9355 15.6109 27.959 14.5524V24.7842C25.9355 23.7241 22.7958 22.9193 20.5539 22.9193ZM33.5129 27.797L33.5018 27.9921L33.3092 27.8913L29.8103 25.8427V13.4923L33.3111 11.442L33.5036 11.3412L33.5129 11.538V27.797Z"
        fill={color}
      />
      {paths.map((d, i) => (
        <AnimatedVolume
          d={d}
          key={i}
          index={i}
          volumePercentage={volumePercentage}
          color={color}
        />
      ))}
      <AnimatedRect
        id="cross"
        x="0.680295"
        y="-0.0238379"
        rx="1.41452"
        transform="matrix(0.654641 -0.755939 0.705948 0.708264 15.2592 10.4018)"
        stroke="black"
        stroke-linejoin="round"
        fill={color}
        animatedProps={animatedCrossProps}
      />
      <AnimatedRect
        id="fullbar"
        animatedProps={animatedOuterBar}
        fill="#DEDEDE"
        mask="url(#mask)"
      />
      <AnimatedRect
        id="bar"
        animatedProps={animatedBar}
        fill="#1C1C1C"
        mask="url(#mask)"
      />
    </Svg>
  );
};
export default Volume;
