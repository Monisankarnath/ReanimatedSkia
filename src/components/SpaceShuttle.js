import Svg, {Defs, Image, Pattern, Rect, Use} from 'react-native-svg';
import React from 'react';

const SpaceShuttle = ({height}) => {
  return (
    <Svg
      width="877"
      height={height}
      viewBox="0 0 877 1216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <Rect width="877" height="1216" fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use
            xlinkHref="#image0_102_31"
            transform="translate(-0.492871) scale(0.000496436 0.000358038)"
          />
        </Pattern>
        <Image
          id="image0_102_31"
          width="4000"
          height="2793"
        />
      </Defs>
    </Svg>
  );
};

export default SpaceShuttle;