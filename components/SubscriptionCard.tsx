import React from 'react'
import { View, Text, Image } from 'react-native'
import { formatCurrency } from '@/lib/utils'

const SubscriptionCard = ({
    name,
    price,
    currency,
    icon,
    billing,
}: SubscriptionCardProps) => {

    return (
        <View className="sub-card bg-card">

            <View className="sub-head">

                <View className="sub-main">

                    <Image
                        source={icon}
                        className="sub-icon"
                    />

                    <View className="sub-copy">
                        <Text
                            numberOfLines={1}
                            className="sub-title"
                        >
                            {name}
                        </Text>
                    </View>

                </View>

                <View className="sub-price-box">

                    <Text className="sub-price">
                        {formatCurrency(price, currency)}
                    </Text>

                    <Text className="sub-billing">
                        {billing}
                    </Text>

                </View>

            </View>

        </View>
    )
}

export default SubscriptionCard