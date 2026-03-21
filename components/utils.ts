import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Use whichever is smaller, width or height
const SCALE = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;

// Base width for scaling calculations
const BASE_WIDTH = 375;

const getScreenSizeCategory = (): "small" | "medium" | "large" => {
  if (SCALE < 350) return "small";
  if (SCALE > 500) return "large";
  return "medium";
};

const fontConfig = {
  small: {
    min: 0.7,
    max: 0.9,
  },
  medium: {
    min: 0.8,
    max: 1.0,
  },
  large: {
    min: 1.0,
    max: 1.1,
  },
};

export const getFontSize = (size: number): number => {
  const screenCategory = getScreenSizeCategory();
  const config = fontConfig[screenCategory];

  // Calculate the scale factor
  const scaleFactor = SCALE / BASE_WIDTH;

  // Clamp the scale factor between the configured min and max
  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max,
  );
  // Calculate the new size
  const newSize = size * clampedScaleFactor;
  // Round the size and adjust for the device's font scale
  return (
    Math.round(PixelRatio.roundToNearestPixel(newSize)) /
    PixelRatio.getFontScale()
  );
};
