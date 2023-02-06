import React from 'react';
import Svg, {Defs, Image, Pattern, Rect, Use} from 'react-native-svg';

const Blob = ({h, w}) => {
  return (
    <Svg
      width={w}
      height={h}
      viewBox="0 0 3203 2230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <Rect width="3203" height="2230" fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use
            xlinkHref="#image0_702_3"
            transform="translate(0 -0.00145622) scale(0.00025 0.000359081)"
          />
        </Pattern>
        <Image
          id="image0_702_3"
          width="4000"
          height="2793"
        />
      </Defs>
    </Svg>
  );
};

export default Blob;