import React from 'react';
import {Dimensions, Text, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const flattenStyle = StyleSheet.flatten;
const realWidth = height > width ? width : height;


const withScalableText = (Component) => {
  return ({style, children, onlyScaleUp, allowFontScaling, forwardedRef, ...props}) => {
    const fontSize = flattenStyle(style).fontSize || 14
    let maxSize = fontSize * 1.5
    const scaleRatio = realWidth / 320
    var scaledFontSize = Math.round(fontSize * scaleRatio)
    if (scaledFontSize < fontSize) scaledFontSize = fontSize
    if (scaledFontSize > maxSize) scaledFontSize = maxSize
    const lineHeightProp = flattenStyle(style).lineHeight
    const scaledLineHeight = !!lineHeightProp ? lineHeightProp * scaleRatio : scaledFontSize + 5
    return (
      <Component style={[style, {fontSize: scaledFontSize, lineHeight: scaledLineHeight}]} allowFontScaling={false} ref={forwardedRef} {...props}>
        {children}
      </Component>
    );
  }
}

const ScalableText = withScalableText(Text)

export default ScalableText;
export {withScalableText}
