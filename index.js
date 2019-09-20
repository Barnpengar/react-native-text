import React from 'react';
import {Dimensions, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
const {width, height} = Dimensions.get('window');
const flattenStyle = StyleSheet.flatten;
const realWidth = height > width ? width : height;

const ScalableText = ({style, children, onlyScaleUp, ...props}) => {
  const fontSize = flattenStyle(style).fontSize || 14
  let maxSize = fontSize * 1.5
  //let scaledLineHeight = Math.round(lineHeight * realWidth / 320)
  const scaleRatio = realWidth / 320
  var scaledFontSize = Math.round(fontSize * scaleRatio)
  if (scaledFontSize < fontSize) scaledFontSize = fontSize
  if (scaledFontSize > maxSize) scaledFontSize = maxSize
  // Default line height is 120% of the font size.
  const lineHeightProp = flattenStyle(style).lineHeight
  const scaledLineHeight = !!lineHeightProp ? lineHeightProp * scaleRatio : scaledFontSize + 5
  return (
    <Text style={[style, {fontSize: scaledFontSize, lineHeight: scaledLineHeight}]} {...props}>
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
