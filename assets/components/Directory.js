import * as FileSystem from 'expo-file-system';

class Directory {
    constructor() {
    }
    CheckRootDirectory = async () => {
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

    UpdateDirectory = async (rndString, message) => {
        try {
            var rawString;
            var rawArray = new Array();
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            var subDirectory = fileDirectory + chatDirectory + rndString;
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            var EXISTENCE = directories.includes(rndString);
            console.log('EXISTENCE', EXISTENCE)
            if (EXISTENCE) {
                var prevString = await FileSystem.readAsStringAsync(subDirectory);
                rawString = prevString + '/&/' + JSON.stringify(message);
                console.log('rawString', rawString)
            } else {
                rawString = JSON.stringify(message);
            }
            await FileSystem.writeAsStringAsync(subDirectory, rawString, {
                encoding: FileSystem.EncodingType.UTF8
            });
            var newString = await FileSystem.readAsStringAsync(subDirectory);
            return newString;
        } catch (err) {
            console.log('Insert', err)
        }
    }
    ReadDirectory = async (rndString) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var subDirectory = fileDirectory + chatDirectory + rndString;
            var newString = await FileSystem.readAsStringAsync(subDirectory);
            return newString;
        } catch (err) {
            console.log(err);
        }
    }

    DeleteDirectory = async (roomCode) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            await FileSystem.deleteAsync(rootDirectory + roomCode);
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            console.log('a', directories)
        } catch (err) {
            console.log('Delete', err);
        }
    }
}


export default new Directory();