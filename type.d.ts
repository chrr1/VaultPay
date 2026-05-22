import type { ImageSourcePropType } from "react-native";

declare global {
    interface AppTab {
        name: string,
        title: string,
        icon: ImageSourcePropType
    }

    interface TabIconPorps {
        focused : boolean,
        icon: ImageSourcePropType;
    }

    interface Subscription {
    id: string;
    icon: ImageSourcePropType;
    name: string;
    plan?: string;
    category?: string;
    paymentMethod?: string;
    status?:string;
    startDate?: string;
    price: number;
    currency?: string;
    billing?: string;
    renewalDate?: string;
    color?: string;
    }

    interface SubscriptionCardProps extends Omit<Subscription,"id"> {
        expanded:boolean;
        onPress: () => void;
        onCancel: () => void;
        onCancelPress?: () => void;
        isCancelling?: boolean;
        
    }

    interface UpComingSubscription {
        id: string;
    icon: ImageSourcePropType;
    name: string;
    plan?: string;
    category?: string;
    paymentMethod?: string;
    status?:string;
    startDate?: string;
    price: number;
    currency?: string;
    billing?: string;
    renewalDate?: string;
    color?: string;
    }

    interface UpComingSubscriptionCardProps extends Omit<UpComingSubscription,"id"> {}

    interface ListHeadingProps {
        title: string;
    }
}
export{};