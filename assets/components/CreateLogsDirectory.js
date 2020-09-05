import * as FileSystem from 'expo-file-system';

const CreateLogsDirectory = async (roomCode) => {
    try {
        var fileDirectory = await FileSystem.documentDirectory;
        var chatDirectory = 'CHAT/';
        var rootDirectory = fileDirectory + chatDirectory;
        var subDirectory = fileDirectory + chatDirectory + roomCode;
        var directories = await FileSystem.readDirectoryAsync(rootDirectory);
        var EXISTENCE = directories.includes(roomCode);
        console.log(EXISTENCE)
        if (!EXISTENCE) {
            await FileSystem.makeDirectoryAsync(subDirectory);
        }
        return true;
    } catch (err) {
        console.log('Create', err);
    }
}

export default CreateLogsDirectory;