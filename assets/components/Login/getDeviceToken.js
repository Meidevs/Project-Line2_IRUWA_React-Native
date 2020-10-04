
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
        try {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                return;
            } else {
                if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    });
                }

                let token = await Notifications.getExpoPushTokenAsync();
                return token;
            }
        } catch (err) {
            console.log(err)
        }
    }
}
export default registerForPushNotificationsAsync;