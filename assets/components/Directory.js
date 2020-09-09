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

    UpdateDirectory = async (data) => {
        try {
            var rawString;
            var rawArray = new Array();
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            var subDirectory = fileDirectory + chatDirectory + data.roomCode;
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            var EXISTENCE = directories.includes(data.roomCode);
            if (EXISTENCE) {
                var prevString = await FileSystem.readAsStringAsync(subDirectory);
                rawString = prevString + '/&/' + JSON.stringify(data.message);
                console.log('rawString', rawString)
            } else {
                rawString = JSON.stringify(data.message);
            }
            await FileSystem.writeAsStringAsync(subDirectory, rawString, {
                encoding: FileSystem.EncodingType.UTF8
            });

        } catch (err) {
            console.log('Insert', err)
        }
    }
    ReadDirectory = async (data) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var subDirectory = fileDirectory + chatDirectory + data;
            var newString = await FileSystem.readAsStringAsync(subDirectory);
            return newString;
        } catch (err) {
            console.log(err);
        }
    }

    DeleteDirectory = async (data) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            console.log('a', directories)
            await FileSystem.deleteAsync(rootDirectory + data);
            
        } catch (err) {
            console.log('Delete', err);
        }
    }
}


export default new Directory();