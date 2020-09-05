import * as FileSystem from 'expo-file-system';

const UpdateLogs = async (roomCode, message) => {
    try {
        var fileDirectory = await FileSystem.documentDirectory;
        var chatDirectory = 'CHAT/';
        var subDirectory = fileDirectory + chatDirectory + roomCode + '.txt';

        // roomCode 로 작성된 .txt 파일이 있는지 확인한다.
        // 1) 파일이 있을 경우 파일을 읽어 온다. 
        // 2) 파일이 없으면 파일을 생성하고 내용을 기입한다.
        // 3) 
        console.log(subDirectory)
        var messageString = JSON.stringify(message);
        console.log(messageString)
        await FileSystem.writeAsStringAsync(subDirectory, messageString, {
            encoding : FileSystem.EncodingType.UTF8
        });
        var Datas = await FileSystem.readAsStringAsync(subDirectory);
        console.log('Datas', Datas)
        return true;
    } catch (err) {
        console.log('Insert', err)
    }
}

export default UpdateLogs;