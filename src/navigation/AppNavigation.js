import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CompanyWalletMainScreen from '../screens/Wallet/CompanyWalletMainScreen';
import CompanyWalletTransactionScreen from '../screens/Wallet/CompanyWalletTransactionScreen';
import AddFundsScreen from '../screens/Wallet/AddFundsScreen';
import WithDrawlFundsScreen from '../screens/Wallet/WithDrawlFundsScreen';
import ConfirmTransferScreen from '../screens/Wallet/ConfirmTransferScreen';
import StampedStatementScreen from '../screens/Wallet/statements/StampedStatementScreen';
import StatementInputCodeScreen from '../screens/Wallet/statements/StatementInputCodeScreen';
import InputSecurityCodeScreen from '../screens/Wallet/addfunds/InputSecurityCodeScreen';
import PersonalWalletMainScreen from '../screens/Wallet/PersonalWallet/PersonalWalletMainScreen';
import PWRequestNewCardScreen from '../screens/Wallet/PersonalWallet/PWRequestNewCardScreen';
import PersonalCardMainScreen from '../screens/Wallet/PersonalCard/PersonalCardMainScreen';
import PersonalCardSettingsScreen from '../screens/Wallet/PersonalCard/PersonalCardSettingsScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={CompanyWalletMainScreen}>

            <Stack.Screen
                name="CompanyWalletMainScreen"
                component={CompanyWalletMainScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CompanyWalletTransactionScreen"
                component={CompanyWalletTransactionScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddFundsScreen"
                component={AddFundsScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="WithDrawlFundsScreen"
                component={WithDrawlFundsScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ConfirmTransferScreen"
                component={ConfirmTransferScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="StampedStatementScreen"
                component={StampedStatementScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="StatementInputCodeScreen"
                component={StatementInputCodeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="InputSecurityCodeScreen"
                component={InputSecurityCodeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PersonalWalletMainScreen"
                component={PersonalWalletMainScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PWRequestNewCardScreen"
                component={PWRequestNewCardScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PersonalCardMainScreen"
                component={PersonalCardMainScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PersonalCardSettingsScreen"
                component={PersonalCardSettingsScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}

export default AppNavigation;

