import * as FileSystem from 'expo-file-system';
var index = 0;

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
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            var subDirectory = fileDirectory + chatDirectory + rndString;

            // roomCode 로 작성된 .txt 파일이 있는지 확인한다.
            // 1) 파일이 있을 경우 파일을 읽어 온다. 
            // 2) 파일이 없으면 파일을 생성하고 내용을 기입한다.
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            var EXISTENCE = directories.includes(rndString);
            if (EXISTENCE) {
                var prevString = await FileSystem.readAsStringAsync(subDirectory);
                rawString = JSON.stringify(message)  + '//&//' + prevString;
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


    DeleteDirectory = async (roomCode) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            await FileSystem.deleteAsync(rootDirectory + '7bc14991840ae143908525c61f97d13548f1da1f');
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            console.log(directories)
        } catch (err) {
            console.log('Delete', err);
        }
    }
}


export default new Directory();