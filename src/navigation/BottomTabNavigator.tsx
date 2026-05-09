import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useTheme } from '../shared/hooks/useTheme';
import IssueListScreen from '../features/issues/screens/IssueListScreen';
import DashboardScreen from '../features/issues/screens/DashboardScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const {palette} = useTheme();

    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            
            tabBarStyle: {
                backgroundColor: palette.surface,
                borderTopColor: palette.border,
            },

            tabBarActiveTintColor: palette.primary,
            tabBarInactiveTintColor: palette.textMuted,
        }}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen}></Tab.Screen>
            <Tab.Screen name="Issues" component={IssueListScreen}></Tab.Screen>

        </Tab.Navigator>
    )
}

export default BottomTabNavigator;
