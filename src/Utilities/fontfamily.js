//This file for Handling Webview Data's
import {Platform} from 'react-native';
export const addblogfaq = (fontFileName, fileFormat, description) => {
  const fontfamily = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
  });

  return `<html><meta name="viewport" content="initial-scale=1, maximum-scale=0.5"> <head> 

	<style  type="text/css"> img { display: block; max-width: 100%; height: auto; }  @font-face {     font-family: ${fontFileName};     src: url(${fontfamily}) } body {   margin-left: 25px;	margin-right: 25px;	font-size: 35px;   font-family:  ${fontFileName}; } </style> </head>${description} </html>`;
};

export const addhtml_content = (fontFileName, fileFormat, description) => {
  const fontfamily = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
  });

  return `<html><meta name="viewport" content="initial-scale=1, maximum-scale=0.5"> <head> 

	<style  type="text/css"> img { display: block; max-width: 100%; height: auto; }  @font-face {     font-family: ${fontFileName};     src: url(${fontfamily}) } body {   margin: 25px;		font-size: 35px;   font-family:  ${fontFileName}; } </style> </head>${description} </html>`;
};
export const mealtextconfig = (fontFileName, fileFormat, description) => {
  const fontfamily = Platform.select({
    ios: `${fontFileName}.${fileFormat}`,
    android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
  });

  return `<html><meta name="viewport" content="initial-scale=1, maximum-scale=0.5">

  <head> 

	<style type="text/css"> img { display: block; max-width: 100%; height: auto; }   @font-face {     font-family: ${fontFileName};     src: url(${fontfamily}) } body {   margin: 25px;
		font-size: 32px;   font-family:  ${fontFileName}; } </style> </head>${description} </html>`;
};
