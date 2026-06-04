import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Custom People Icon (group of 5 figures)
const PeopleIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 64,
  color = '#FFFFFF',
}) => {
  // SVG-like rendering using View components
  const figureSize = size / 5;
  const headSize = figureSize * 0.55;
  const bodyWidth = figureSize * 0.5;
  const bodyHeight = figureSize * 0.6;

  const figures = [
    { left: 0, scale: 0.8, opacity: 0.6 },
    { left: figureSize * 0.9, scale: 0.9, opacity: 0.75 },
    { left: figureSize * 2, scale: 1, opacity: 1 },
    { left: figureSize * 3.1, scale: 0.9, opacity: 0.75 },
    { left: figureSize * 4.0, scale: 0.8, opacity: 0.6 },
  ];

  return (
    <View style={{ width: size + figureSize * 0.5, height: size * 0.7, position: 'relative' }}>
      {figures.map((fig, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: fig.left,
            bottom: 0,
            alignItems: 'center',
            opacity: fig.opacity,
            transform: [{ scale: fig.scale }],
          }}
        >
          {/* Head */}
          <View
            style={{
              width: headSize,
              height: headSize,
              borderRadius: headSize / 2,
              backgroundColor: color,
              marginBottom: 2,
            }}
          />
          {/* Body */}
          <View
            style={{
              width: bodyWidth,
              height: bodyHeight,
              borderTopLeftRadius: bodyWidth / 2,
              borderTopRightRadius: bodyWidth / 2,
              backgroundColor: color,
            }}
          />
        </View>
      ))}
    </View>
  );
};

// Radial glow blob component
const GlowBlob: React.FC = () => {
  return (
    <View style={styles.blobContainer} pointerEvents="none">
      {/* Outer warm glow */}
      <View style={[styles.blob, styles.blobOuter]} />
      {/* Middle blue glow */}
      <View style={[styles.blob, styles.blobMid]} />
      {/* Inner warm center */}
      <View style={[styles.blob, styles.blobInner]} />
    </View>
  );
};

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

const BesideWelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onLogin,
}) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Glow blob at top */}
      <GlowBlob />

      <SafeAreaView style={styles.safeArea}>
        {/* Bottom content area */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <PeopleIcon size={72} color="#FFFFFF" />
          </View>

          {/* Headline */}
          <Text style={styles.title}>Welcome to Beside</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Starting today, your AI phone assistant{'\n'}saves you 2 hours daily.
          </Text>

          {/* CTA Button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={onGetStarted}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={1}
            >
              <Text style={styles.ctaText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login link */}
          <TouchableOpacity onPress={onLogin} style={styles.loginWrapper}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginBold}>Log in</Text>
            </Text>
          </TouchableOpacity>

          {/* Legal text */}
          <Text style={styles.legalText}>
            By tapping Get Started, I agree with the{' '}
            <Text style={styles.legalLink}>Terms of{'\n'}Service</Text>
            <Text style={styles.legalText}> and </Text>
            <Text style={styles.legalLink}>Privacy Policy</Text>
            <Text style={styles.legalText}>.</Text>
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // Glow Blob
  blobContainer: {
    position: 'absolute',
    top: -height * 0.08,
    left: width / 2 - width * 0.65,
    width: width * 1.3,
    height: height * 0.55,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  blobOuter: {
    width: width * 1.1,
    height: height * 0.38,
    bottom: 0,
    backgroundColor: 'transparent',
    // Simulate warm outer glow using shadow / border
    shadowColor: '#C8A882',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 90,
    // Fallback fill for Android
    ...(Platform.OS === 'android' && {
      backgroundColor: '#C8A882',
      opacity: 0.08,
    }),
  },
  blobMid: {
    width: width * 0.85,
    height: height * 0.3,
    bottom: 10,
    shadowColor: '#1A4FD4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 70,
    ...(Platform.OS === 'android' && {
      backgroundColor: '#1A4FD4',
      opacity: 0.18,
    }),
  },
  blobInner: {
    width: width * 0.45,
    height: height * 0.18,
    bottom: 30,
    shadowColor: '#D4B896',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 50,
    ...(Platform.OS === 'android' && {
      backgroundColor: '#D4B896',
      opacity: 0.12,
    }),
  },

  // Content
  content: {
    paddingHorizontal: 28,
    paddingBottom: 28,
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },

  // Button
  ctaButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.1,
  },

  // Login
  loginWrapper: {
    paddingVertical: 4,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  loginBold: {
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Legal
  legalText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    textAlign: 'center',
    lineHeight: 17,
  },
  legalLink: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default BesideWelcomeScreen;