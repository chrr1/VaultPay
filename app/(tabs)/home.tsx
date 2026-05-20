import "@/global.css"
import { Text, View, Image, FlatList } from "react-native";
import { styled } from "nativewind"
import images from "@/constants/images"
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpComingSubscriptionCard from "@/components/UpComingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";

const SafeAreaView = styled(RNSafeAreaView)
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="home-header">
        <Image source={images.avatar} className="home-avatar" />
        <Text className="home-user-name">{HOME_USER.name}</Text>
        <Image source={icons.add} className="home-add-icon" />
      </View>

      <View className="home-balance-card">
        <Text className="home-balance-label">
          Balance
        </Text>
        <View className="home-balance-row">
          <Text className="home-balance-amount">
            {formatCurrency(HOME_BALANCE.amount)}
          </Text>
          <Text className="home-balance-date">
            {dayjs(HOME_BALANCE.nextRenewalDate).format("MMM D, YYYY")}
          </Text>
        </View>
      </View>

      <View>
        <ListHeading title="Upcoming "/>
        <FlatList 
        data={UPCOMING_SUBSCRIPTIONS}
        renderItem={({item}) => (
          <UpComingSubscriptionCard data={item} />)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<Text className="home-empty-state">No upcoming subscriptions renewals yet.</Text>}
        />      
      </View>

    <View>
        <ListHeading title="All Subscription "/>
        <SubscriptionCard {...HOME_SUBSCRIPTIONS[0]}  />
      </View>

    </SafeAreaView>
  );
}