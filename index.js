import React from 'react';
import {Dimensions, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
const {width, height} = Dimensions.get('window');
const flattenStyle = StyleSheet.flatten;
const realWidth = height > width ? width : height;

const ScalableText = ({style, children, onlyScaleUp, ...props}) => {
  const fontSize = flattenStyle(style).fontSize || 14;
  var scaledFontSize = Math.round(fontSize * realWidth / 320)
  if (scaledFontSize < fontSize) scaledFontSize = fontSize
  return (
    <Text style={[style, {fontSize: scaledFontSize}]} {...props}>
      {children}
    </Text>
  );
};

ScalableText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
};

ScalableText.defaultProps = {
  onlyScaleUp: false,
  style: {}
};

export default ScalableText;
