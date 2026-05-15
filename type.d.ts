import type { ImageSourcePropType } from "react-native";

declare global {
    interface TabIconPorps {
        focused : boolean,
        icon: ImageSourcePropType;
    }
}

export{}