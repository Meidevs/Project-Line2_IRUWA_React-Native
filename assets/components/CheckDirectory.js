import * as FileSystem from 'expo-file-system';

const CheckRootDirectory = async () => {
    try {
        var fileDirectory = await FileSystem.documentDirectory;
        var chatDirectory = 'CHAT/';
        var rootDirectory = fileDirectory + chatDirectory;
        var chatDirectoryInfo = await FileSystem.getInfoAsync(rootDirectory);
        if (!chatDirectoryInfo.exists) {
            await FileSystem.makeDirectoryAsync(rootDirectory);
        }
    } catch (err) {
        console.log(err);
    }
}

export default CheckRootDirectory;