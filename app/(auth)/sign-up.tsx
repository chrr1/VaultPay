import { useAuth, useSignUp } from '@clerk/expo';
import { Link, useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Design Tokens (sama dengan sign-in) ─────────────────────────────────────
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
    textSecondary:'#FFFFFF',
    textPlaceholder:'#FFFFFF',
    socialBg:     '#1C1C27',
    socialBorder: '#2E2E42',
    white:        '#FFFFFF',
    dividerText:  '#FFFFFF',
    error:        '#FF6B6B',
    helperText:     '#FFFFFF',
};

const s = StyleSheet.create({
    safe:           { flex: 1, backgroundColor: C.bg },
    avoid:          { flex: 1 },
    scroll:         { flex: 1 },
    scrollContent:  { flexGrow: 1, paddingHorizontal: 24, paddingTop: 120, paddingBottom: 40, },

    headingBlock:   { marginBottom: 36 },
    heading: {
        color: C.textPrimary, fontSize: 32, fontWeight: '800',
        letterSpacing: -0.8, marginBottom: 8,
    },
    subheading: {
        color: C.textSecondary, fontSize: 15, fontWeight: '400', lineHeight: 22,
    },

    fieldWrap:      { marginBottom: 18 },
    label: {
        color: C.textSecondary, fontSize: 11, fontWeight: '700',
        letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8,
    },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: C.inputBg, borderRadius: 14,
        borderWidth: 1, borderColor: C.inputBorder,
        paddingHorizontal: 14, height: 52,
    },
    inputRowFocus:  { borderColor: C.inputFocus },
    inputRowError:  { borderColor: C.error },
   
    input:          { flex: 1, color: C.textPrimary, fontSize: 15, fontWeight: '400' },
    eyeBtn:         { padding: 4 },
    eyeText:        { fontSize: 18 },
    errorText:      { color: C.error, fontSize: 12, marginTop: 5, marginLeft: 2 },
    helperText:     { color: C.helperText, fontSize: 12, marginTop: 5, marginLeft: 2 },
eyeIcon: {
    width: 20,
    height: 20,
    tintColor: C.white, },
    googleIcon: {
    width: 20,
    height: 20,
},
    // Password strength bar
    strengthRow:    { flexDirection: 'row', gap: 4, marginTop: 8 },
    strengthBar: {
        flex: 1, height: 3, borderRadius: 2, backgroundColor: C.surfaceBorder,
    },
    strengthBarFill: { height: 3, borderRadius: 2 },
    strengthLabel:  { color: C.helperText, fontSize: 11, marginTop: 4, marginLeft: 2 },

    btn: {
        backgroundColor: C.textPrimary, borderRadius: 14, height: 54,
        alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 28,
    },
    btnDisabled:    { opacity: 0.4 },
    btnText:        { color: '#13131A', fontSize: 16, fontWeight: '700', letterSpacing: 0.1 },

    dividerRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    dividerLine:    { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: C.surfaceBorder },
    dividerText:    { color: C.dividerText, fontSize: 13, fontWeight: '500' },

    socialRow:      { flexDirection: 'row', gap: 12, marginBottom: 32 },
    socialBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, backgroundColor: C.socialBg, borderRadius: 14,
        borderWidth: 1, borderColor: C.socialBorder, height: 52,
    },
    socialBtnText:  { color: C.textPrimary, fontSize: 15, fontWeight: '600' },

    footerRow:      { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 },
    footerCopy:     { color: C.textSecondary, fontSize: 14 },
    footerLink:     { color: C.white, fontSize: 14, fontWeight: '700' },

    ghostBtn: {
        height: 52, alignItems: 'center', justifyContent: 'center',
        borderRadius: 14, borderWidth: 1, borderColor: C.socialBorder, marginBottom: 12,
    },
    ghostBtnText:   { color: C.textSecondary, fontSize: 15, fontWeight: '600' },

    codeInput:      { textAlign: 'center', letterSpacing: 10, fontSize: 24, fontWeight: '700' },
    emailHint: {
        color: C.accentText, fontSize: 13, fontWeight: '600',
        marginTop: 2, marginBottom: 28,
    },
inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
},
    
});

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

// ─── Password strength helper ─────────────────────────────────────────────────
function getStrength(pwd: string): { score: number; label: string; color: string } {
    if (pwd.length === 0) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pwd.length >= 8)  score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd))   score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { score: 1, label: 'Weak',   color: '#FF6B6B' };
    if (score <= 3) return { score: 3, label: 'Fair',   color: '#F5A623' };
    return              { score: 5, label: 'Strong', color: '#4CD964' };
}

// ─── Focusable Field ──────────────────────────────────────────────────────────
function Field({
    label, icon, rightSlot, error, helper,
    ...inputProps
}: {
    label: string;
    icon: React.ReactNode;
    rightSlot?: React.ReactNode;
    error?: string | null;
    helper?: React.ReactNode;
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
            {!!error  && <Text style={s.errorText}>{error}</Text>}
            {!error && helper}
        </View>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const SignUp = () => {
    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode]                 = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const emailValid   = emailAddress.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    const passwordValid = password.length === 0 || password.length >= 8;
    const formValid    = emailAddress.length > 0 && password.length >= 8 && emailValid;
    const isFetching   = fetchStatus === 'fetching';
    const strength     = getStrength(password);

    const handleSubmit = async () => {
        if (!formValid) return;
        const { error } = await signUp.password({ emailAddress, password });
        if (error) { console.error(JSON.stringify(error, null, 2)); return; }
        if (!error) await signUp.verifications.sendEmailCode();
    };

    const handleVerify = async () => {
        await signUp.verifications.verifyEmailCode({ code });
        if (signUp.status === 'complete') {
            await signUp.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) { console.log(session?.currentTask); return; }
                    const url = decorateUrl('/(tabs)/home');
                    if (url.startsWith('http')) {
                        if (typeof window !== 'undefined' && window.location) window.location.href = url;
                        else router.replace('/(tabs)/home' as Href);
                    } else { router.replace(url as Href); }
                },
            });
        } else { console.error('Sign-up attempt not complete:', signUp); }
    };

    if (signUp.status === 'complete' || isSignedIn) return null;

    // ── Verify email screen ────────────────────────────────────────────────
    if (
        signUp.status === 'missing_requirements' &&
        signUp.unverifiedFields.includes('email_address') &&
        signUp.missingFields.length === 0
    ) {
        return (
            <SafeAreaView style={s.safe}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.avoid}>
                    <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                        <View style={s.headingBlock}>
                            <Text style={s.heading}>Check your email</Text>
                            <Text style={s.subheading}>We sent a 6-digit verification code to</Text>
                        </View>
                        <Text style={s.emailHint}>{emailAddress}</Text>

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
                            activeOpacity={0.85}
                        >
                            <Text style={s.btnText}>{isFetching ? 'Verifying…' : 'Verify Email'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={s.ghostBtn} onPress={() => signUp.verifications.sendEmailCode()} disabled={isFetching} activeOpacity={0.7}>
                            <Text style={s.ghostBtnText}>Resend Code</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    // ── Main sign-up form ──────────────────────────────────────────────────
    return (
        <SafeAreaView style={s.safe}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.avoid}>
                <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                    {/* Heading */}
                    <View style={s.headingBlock}>
                        <Text style={s.heading}>Create account</Text>
                        <Text style={s.subheading}>Start tracking your subscriptions and never miss a payment</Text>
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
                            errors?.fields?.emailAddress?.message
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
                        placeholder="Create a strong password"
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        onBlur={() => setPasswordTouched(true)}
                        autoComplete="password-new"
                        error={
                            (passwordTouched && !passwordValid ? 'Password must be at least 8 characters' : null) ||
                            errors?.fields?.password?.message
                        }
                        helper={
                            password.length > 0 ? (
                                <View>
                                    <View style={s.strengthRow}>
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <View key={i} style={s.strengthBar}>
                                                <View style={[
                                                    s.strengthBarFill,
                                                    { backgroundColor: i <= strength.score ? strength.color : C.surfaceBorder, width: '100%' }
                                                ]} />
                                            </View>
                                        ))}
                                    </View>
                                    <Text style={[s.strengthLabel, { color: strength.color }]}>
                                        {strength.label} password
                                    </Text>
                                </View>
                            ) : (
                                <Text style={s.helperText}>Minimum 8 characters required</Text>
                            )
                        }
                    />

                    {/* Submit */}
                    <TouchableOpacity
                        style={[s.btn, (!formValid || isFetching) && s.btnDisabled]}
                        onPress={handleSubmit}
                        disabled={!formValid || isFetching}
                        activeOpacity={0.85}
                    >
                        <Text style={s.btnText}>
                            {isFetching ? 'Creating Account…' : 'Create Account'}
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={s.dividerRow}>
                        <View style={s.dividerLine} />
                        <Text style={s.dividerText}>Or sign up with</Text>
                        <View style={s.dividerLine} />
                    </View>

                    {/* Social */}
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
                        <Text style={s.footerCopy}>Already have an account?</Text>
                        <Link href="/(auth)/sign-in" asChild>
                            <Pressable>
                                <Text style={s.footerLink}>Sign In</Text>
                            </Pressable>
                        </Link>
                    </View>

                    {/* Clerk bot protection */}
                    <View nativeID="clerk-captcha" />

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;