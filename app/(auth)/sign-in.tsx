import { useSignIn } from '@clerk/expo';
import { Link, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
    bg:           '#000000',
    surface:      '#1C1C27',
    surfaceBorder:'#2A2A3C',
    inputBg:      '#1C1C27',
    inputBorder:  '#FFFFFF',
    inputFocus:   '#FFFFFF',
    accent:       '#5B52E8',
    accentText:   '#7B74F0',
    textPrimary:  '#EEEEF5',
    textSecondary:'#8888AA',
    textPlaceholder:'#55556A',
    socialBg:     '#1C1C27',
    socialBorder: '#2E2E42',
    white:        '#FFFFFF',
    dividerText:  '#55556A',
    error:        '#FF6B6B',
    helperText:     '#55556A',
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.bg, },
    avoid: { flex: 1 },
    scroll: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 120,
        paddingBottom: 40,
    },

    // Heading block
    headingBlock: { marginBottom: 36 },
    heading: {
        color: C.textPrimary,
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -0.8,
        marginBottom: 8,
    },
    subheading: {
        color: C.textSecondary,
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
    },

    // Field
    fieldWrap: { marginBottom: 18 },
    label: {
        color: C.textSecondary,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.inputBg,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: C.inputBorder,
        paddingHorizontal: 14,
        height: 52,
    },
    inputRowFocus: {
        borderColor: C.inputFocus,
    },
    inputRowError: {
        borderColor: C.error,
    },
    inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
},
    input: {
        flex: 1,
        color: C.textPrimary,
        fontSize: 15,
        fontWeight: '400',
    },
    eyeBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
},

googleIcon: {
    width: 20,
    height: 20,
},
    eyeIcon: {
    width: 20,
    height: 20,
    tintColor: C.white, 
},
    eyeText: { fontSize: 18 },
    errorText: {
        color: C.error,
        fontSize: 12,
        marginTop: 5,
        marginLeft: 2,
    },

    // Forgot password
    forgotRow: { alignItems: 'flex-end', marginTop: -6, marginBottom: 28 },
    forgotText: {
        color: C.white,
        fontSize: 14,
        fontWeight: '600',
    },

    // Primary button
    btn: {
        backgroundColor: C.textPrimary,
        borderRadius: 14,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
    },
    btnDisabled: { opacity: 0.4 },
    btnText: {
        color: '#13131A',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.1,
    },

    // Divider
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: C.surfaceBorder,
    },
    dividerText: {
        color: C.white,
        fontSize: 13,
        fontWeight: '500',
    },

    // Social buttons row
    socialRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    socialBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: C.socialBg,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: C.socialBorder,
        height: 52,
    },
    socialBtnText: {
        color: C.textPrimary,
        fontSize: 15,
        fontWeight: '600',
    },
    socialIcon: {
        fontSize: 18,
        lineHeight: 22,
    },

     helperText:     { color: C.helperText, fontSize: 12, marginTop: 5, marginLeft: 2 },

    // Footer
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    footerCopy: { color: C.textSecondary, fontSize: 14 },
    footerLink: { color: C.white, fontSize: 14, fontWeight: '700' },

    // Verify screen
    verifySubtitle: {
        color: C.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 36,
    },
    codeInput: {
        textAlign: 'center',
        letterSpacing: 10,
        fontSize: 24,
        fontWeight: '700',
    },
    ghostBtn: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: C.white,
        marginBottom: 12,
    },
    ghostBtnText: {
        color: C.white,
        fontSize: 15,
        fontWeight: '600',
    },
});

// ─── Icon components (text-based, no library needed) ─────────────────────────
const MailIcon = () => (
    <Image
        source={require('../../assets/icons/mail.png')}
        style={s.inputIcon}
        resizeMode="contain"
    />
);
const LockIcon  = () => (
    <Image
        source={require('../../assets/icons/padlock.png')}
        style={s.inputIcon}
        resizeMode="contain"
    />
);
const GoogleIcon = () => <Text style={s.socialIcon}>🇬</Text>;

// ─── Focusable Input wrapper ──────────────────────────────────────────────────
function Field({
    label,
    icon,
    rightSlot,
    error,
    ...inputProps
}: {
    label: string;
    icon: React.ReactNode;
    rightSlot?: React.ReactNode;
    error?: string | null;
} & React.ComponentProps<typeof TextInput>) {
    const [focused, setFocused] = useState(false);
    return (
        <View style={s.fieldWrap}>
            <Text style={s.label}>{label}</Text>
            <View style={[s.inputRow, focused && s.inputRowFocus, !!error && s.inputRowError]}>
                {icon}
                <TextInput
                    {...inputProps}
                    style={[s.input, inputProps.style]}
                    placeholderTextColor={C.textPlaceholder}
                    onFocus={e => { setFocused(true); inputProps.onFocus?.(e); }}
                    onBlur={e  => { setFocused(false); inputProps.onBlur?.(e); }}
                />
                {rightSlot}
            </View>
            {!!error && <Text style={s.errorText}>{error}</Text>}
        </View>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const SignIn = () => {
    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode]                 = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const emailValid   = emailAddress.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    const passwordValid = password.length > 0;
    const formValid    = emailAddress.length > 0 && password.length > 0 && emailValid;
    const isFetching   = fetchStatus === 'fetching';

    const navigate = (path: string) => (decorateUrl: (p: string) => string) => {
        const url = decorateUrl(path);
        if (url.startsWith('http')) {
            if (typeof window !== 'undefined' && window.location) window.location.href = url;
            else router.replace(path as Href);
        } else { router.replace(url as Href); }
    };

    const handleSubmit = async () => {
        if (!formValid) return;
        const { error } = await signIn.password({ emailAddress, password });
        if (error) { console.error(error); return; }

        if (signIn.status === 'complete') {
            await signIn.finalize({ navigate: ({ session, decorateUrl }) => {
                if (session?.currentTask) return;
                navigate('/(tabs)/home')(decorateUrl);
            }});
        } else if (signIn.status === 'needs_client_trust') {
            const factor = signIn.supportedSecondFactors.find(f => f.strategy === 'email_code');
            if (factor) await signIn.mfa.sendEmailCode();
        } else { console.error('Incomplete sign-in:', signIn); }
    };

    const handleVerify = async () => {
        await signIn.mfa.verifyEmailCode({ code });
        if (signIn.status === 'complete') {
            await signIn.finalize({ navigate: ({ session, decorateUrl }) => {
                if (session?.currentTask) return;
                navigate('/(tabs)')(decorateUrl);
            }});
        } else { console.error('Incomplete verify:', signIn); }
    };

    // ── Verify screen ──────────────────────────────────────────────────────
    if (signIn.status === 'needs_client_trust') {
        return (
            <SafeAreaView style={s.safe}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.avoid}>
                    <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                        <View style={s.headingBlock}>
                            <Text style={s.heading}>Check your email</Text>
                            <Text style={s.subheading}>We sent a 6-digit verification code to your inbox.</Text>
                        </View>

                        <Field
                            label="Verification Code"
                            icon={<Text style={[s.inputIcon, { color: C.accent }]}>🔑</Text>}
                            value={code}
                            placeholder="_ _ _ _ _ _"
                            onChangeText={setCode}
                            keyboardType="number-pad"
                            autoComplete="one-time-code"
                            maxLength={6}
                            style={s.codeInput}
                            error={errors?.fields?.code?.message}
                        />

                        <TouchableOpacity
                            style={[s.btn, (!code || isFetching) && s.btnDisabled]}
                            onPress={handleVerify}
                            disabled={!code || isFetching}
                            activeOpacity={0.8}
                        >
                            <Text style={s.btnText}>{isFetching ? 'Verifying…' : 'Verify'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={s.ghostBtn} onPress={() => signIn.mfa.sendEmailCode()} disabled={isFetching} activeOpacity={0.7}>
                            <Text style={s.ghostBtnText}>Resend Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.ghostBtn} onPress={() => signIn.reset()} disabled={isFetching} activeOpacity={0.7}>
                            <Text style={s.ghostBtnText}>← Back to Sign In</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    // ── Main sign-in screen ────────────────────────────────────────────────
    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.avoid}>
                <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                    {/* Heading */}
                    <View style={s.headingBlock}>
                        <Text style={s.heading }>Welcome back</Text>
                        <Text style={s.subheading}>Enter your credentials to access your account</Text>
                    </View>

                    {/* Email */}
                    <Field
                        label="Email Address"
                        icon={<MailIcon />}
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Enter your email"
                        onChangeText={setEmailAddress}
                        onBlur={() => setEmailTouched(true)}
                        keyboardType="email-address"
                        autoComplete="email"
                        error={
                            (emailTouched && !emailValid ? 'Enter a valid email address' : null) ||
                            errors?.fields?.identifier?.message
                        }
                    />

                    {/* Password */}
                    <Field
                        label="Password"
                        icon={<LockIcon />}
                        rightSlot={
                            <TouchableOpacity
    style={s.eyeBtn}
    onPress={() => setShowPassword(p => !p)}
    activeOpacity={0.7}
>
    <Image
        source={
            showPassword
                ? require('../../assets/icons/eye.png')
                : require('../../assets/icons/hide.png')
        }
        style={s.eyeIcon}
        resizeMode="contain"
    />
</TouchableOpacity>
                        }
                        value={password}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        onBlur={() => setPasswordTouched(true)}
                        autoComplete="password"
                        error={
                            (passwordTouched && !passwordValid ? 'Password is required' : null) ||
                            errors?.fields?.password?.message
                        }
                    />
                    ) : (
                                                    <Text style={s.helperText}>Minimum 8 characters required</Text>
                                                )

                    {/* Forgot password */}
                    <View style={s.forgotRow}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Text style={s.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    

                    {/* Sign In button */}
                    <TouchableOpacity
                        style={[s.btn, (!formValid || isFetching) && s.btnDisabled]}
                        onPress={handleSubmit}
                        disabled={!formValid || isFetching}
                        activeOpacity={0.85}
                    >
                        <Text style={s.btnText}>{isFetching ? 'Signing In…' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={s.dividerRow}>
                        <View style={s.dividerLine} />
                        <Text style={s.dividerText}>Or continue with</Text>
                        <View style={s.dividerLine} />
                    </View>

                    {/* Social buttons */}
                    <View style={s.socialRow}>
                        <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                            <Image
                                source={require('../../assets/icons/google.png')}
                                style={s.googleIcon}
                                resizeMode="contain"
                            />
                            <Text style={s.socialBtnText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.socialBtn} activeOpacity={0.75}>
                            <Image
                                source={require('../../assets/icons/apple-logo.png')}
                                style={s.eyeIcon}
                                resizeMode="contain"
                            />
                            <Text style={s.socialBtnText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={s.footerRow}>
                        <Text style={s.footerCopy}>New here?</Text>
                        <Link href="/(auth)/sign-up" asChild>
                            <Pressable>
                                <Text style={s.footerLink}>Create an account</Text>
                            </Pressable>
                        </Link>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignIn;