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
            var rawArray = new Array();
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            var subDirectory = fileDirectory + chatDirectory + rndString;

            // roomCode 로 작성된 .txt 파일이 있는지 확인한다.
            // 1) 파일이 있을 경우 파일을 읽어 온다. 
            // 2) 파일이 없으면 파일을 생성하고 내용을 기입한다.
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            console.log('directories', directories)
            var EXISTENCE = directories.includes(rndString);
            console.log('EXISTENCE', EXISTENCE)
            if (EXISTENCE) {
                var Datas = await FileSystem.readAsStringAsync(subDirectory);
                console.log(Datas);
                console.log(typeof (Datas));
                rawArray = Datas.push(message);
            } else {
                rawArray.push(message)
            }
            var messageString = JSON.stringify(rawArray);
            await FileSystem.writeAsStringAsync(subDirectory, messageString, {
                encoding: FileSystem.EncodingType.UTF8
            });
        } catch (err) {
            console.log('Insert', err)
        }
    }


    DeleteDirectory = async (roomCode) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            await FileSystem.deleteAsync(rootDirectory + '3d9b13a3678f6743f35d471f74d3d48050575e04')
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            console.log(directories)
        } catch (err) {
            console.log('Delete', err);
        }
    }
}


export default new Directory();