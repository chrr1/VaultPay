import { icons } from './icons';

export const tabs: AppTab[] = [
    {name:'home', title:'Home', icon: icons.home},
    {name:'subscriptions', title:'Subscriptions', icon: icons.wallet},
    {name:'insights', title:'Insights', icon: icons.activity},
    {name:'settings', title:'Settings', icon: icons.setting},
];

export const HOME_USER ={
    name:'Adik Christian',
}

export const HOME_BALANCE = {
    amount: 2489.48,
    nextRenewalDate:"2026-03-19T09:00:00.000Z"
};

export const UPCOMING_SUBSCRIPTIONS  : UpComingSubscription[] = [
   {
    id: "spotify-premium",
    icon: icons.spotify,
    name: "Spotify",
    plan: "Premium Individual",
    category: "Music",
    paymentMethod: "Visa ending in 7788",
    status: "active",
    startDate: "2023-11-03T09:00:00.000Z",
    price: 10.99,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-03T09:00:00.000Z"
},
{
    id: "github-pro",
    icon: icons.github,
    name: "GitHub",
    plan: "GitHub Pro",
    category: "Development",
    paymentMethod: "Mastercard ending in 2468",
    status: "active",
    startDate: "2023-06-20T09:00:00.000Z",
    price: 10.00,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-20T09:00:00.000Z"
},
{
    id: "figma-professional",
    icon: icons.figma,
    name: "Figma",
    plan: "Professional Plan",
    category: "Design",
    paymentMethod: "Visa ending in 7890",
    status: "active",
    startDate: "2023-06-20T09:00:00.000Z",
    price: 10.00,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-20T09:00:00.000Z"
},
{
    id: "dropbox-plus",
    icon: icons.dropbox,
    name: "Dropbox",
    plan: "Dropbox Plus",
    category: "Storage",
    paymentMethod: "Visa ending in 4321",
    status: "active",
    startDate: "2023-04-12T09:00:00.000Z",
    price: 11.99,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-12T09:00:00.000Z"
},


{
    id: "medium-member",
    icon: icons.medium,
    name: "Medium",
    plan: "Medium Membership",
    category: "Reading",
    paymentMethod: "Visa ending in 1357",
    status: "active",
    startDate: "2023-07-08T09:00:00.000Z",
    price: 5.00,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-08T09:00:00.000Z"
},
{
    id: "notion-plus",
    icon: icons.notion,
    name: "Notion",
    plan: "Plus Plan",
    category: "Productivity",
    paymentMethod: "Visa ending in 9876",
    status: "active",
    startDate: "2023-08-14T09:00:00.000Z",
    price: 10.00,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-14T09:00:00.000Z"
},
{
    id: "openai-chatgpt-plus",
    icon: icons.openai,
    name: "OpenAI",
    plan: "ChatGPT Plus",
    category: "AI",
    paymentMethod: "Mastercard ending in 1122",
    status: "active",
    startDate: "2023-09-01T09:00:00.000Z",
    price: 20.00,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-01T09:00:00.000Z"
},
{
    id: "plus-subscription",
    icon: icons.plus,
    name: "Plus",
    plan: "Premium Plus",
    category: "Entertainment",
    paymentMethod: "Visa ending in 5566",
    status: "active",
    startDate: "2023-10-11T09:00:00.000Z",
    price: 8.99,
    currency: "USD",
    billing: "Monthly",
    renewalDate: "2024-07-11T09:00:00.000Z"
},

];

export const HOME_SUBSCRIPTIONS: Subscription[] = [
    {
        id: "adobe-creative-cloud",
        icon: icons.adobe,
        name: "Adobe Creative Cloud",
        plan: "Teams Plan",
        category: "Design",
        paymentMethod: "Visa ending in 8530",
        status: "active",
        startDate: "2025-03-20T10:00:00.000Z",
        price: 77.49,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-20T10:00:00.000Z",
        color: "#f5c542",
    },
    {
        id: "github-pro",
        icon: icons.github,
        name: "GitHub Pro",
        plan: "Developer",
        category: "Developer Tools",
        paymentMethod: "Mastercard ending in 2408",
        status: "active",
        startDate: "2024-11-24T10:00:00.000Z",
        price: 9.99,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-24T10:00:00.000Z",
        color: "#e8def8",
    },
    {
        id: "claude-pro",
        icon: icons.claude,
        name: "Claude Pro",
        plan: "Pro Plan",
        category: "AI Tools",
        paymentMethod: "Amex ending in 1010",
        status: "paused",
        startDate: "2025-06-27T10:00:00.000Z",
        price: 20.0,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-27T10:00:00.000Z",
        color: "#b8d4e3",
    },
    {
        id: "canva-pro",
        icon: icons.canva,
        name: "Canva Pro",
        plan: "Yearly Access",
        category: "Design",
        paymentMethod: "Visa ending in 7784",
        status: "cancelled",
        startDate: "2024-04-02T10:00:00.000Z",
        price: 119.99,
        currency: "USD",
        billing: "Yearly",
        renewalDate: "2026-04-02T10:00:00.000Z",
        color: "#b8e8d0",
    },
];