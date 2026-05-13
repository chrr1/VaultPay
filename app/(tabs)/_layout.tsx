import { Tabs } from "expo-router";

const TabLayout = () => (
    <Tabs screenOptions={{headerShown: false }}>
        <Tabs.Screen name="home" options={{title: "Home"}}/>
        <Tabs.Screen name="subscriptions" options={{title: "Subscriptions"}}/>
        <Tabs.Screen name="insights" options={{title: "Insights"}}/>
        <Tabs.Screen name="settings" options={{title: "Settings"}}/>
        <Tabs.Screen name="subscriptions/[id]" options={{href:null}}/>
    </Tabs>
)

export default TabLayout