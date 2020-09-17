import * as FileSystem from 'expo-file-system';
import { FileSystemSessionType } from 'expo-file-system';
import { NavigationContext } from '@react-navigation/native';

class Directory {
    constructor() {
    }
    CheckRootDirectory = async () => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chat = 'CHAT/';
            var title = 'TITLE/'
            var chatDirectory = fileDirectory + chat;
            var titleDirectory = fileDirectory + title;
            var chatDirectoryInfo = await FileSystem.getInfoAsync(chatDirectory);
            var titleDirectoryInfo = await FileSystem.getInfoAsync(titleDirectory);
            if (!chatDirectoryInfo.exists) {
                await FileSystem.makeDirectoryAsync(chatDirectory);
            }
            if (!titleDirectoryInfo.exists) {
                await FileSystem.makeDirectoryAsync(titleDirectory);
            }
        } catch (err) {
            console.log(err);
        }
    }

    UpdateChatTitle = async (data) => {
        try {
            var rawString = {
                roomCode: data.roomCode,
                sender_seq: data.sender_seq,
                sender_name: data.sender_name,
                receiver_seq: data.receiver_seq,
                receiver_name: data.receiver_name,
                items_seq: data.items_seq,
                item_name: data.item_name,
                cmp_seq: data.cmp_seq,
                cmp_name: data.cmp_name,
                reg_date: data.reg_date,
            }
            var fileDirectory = await FileSystem.documentDirectory;
            var title = 'TITLE/';
            var titleDirectory = fileDirectory + title;
            var subDirectory = fileDirectory + title + data.roomCode;
            var directories = await FileSystem.readDirectoryAsync(titleDirectory);
            var EXISTENCE = directories.includes(data.roomCode);
            if (EXISTENCE) {
                await FileSystem.deleteAsync(subDirectory);
            }
            await FileSystem.writeAsStringAsync(subDirectory, JSON.stringify(rawString), {
                encoding: FileSystem.EncodingType.UTF8
            });
        } catch (err) {
            console.log(err)
        }
    }

    UpdateDirectory = async (data) => {
        try {
            var rawString;
            var fileDirectory = await FileSystem.documentDirectory;
            var chatDirectory = 'CHAT/';
            var rootDirectory = fileDirectory + chatDirectory;
            var subDirectory = fileDirectory + chatDirectory + data.roomCode;
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            var EXISTENCE = directories.includes(data.roomCode);
            if (EXISTENCE) {
                var prevString = await FileSystem.readAsStringAsync(subDirectory);
                rawString = prevString + '/&/' + JSON.stringify({ sender_seq: data.sender_seq, message: data.message, reg_date: data.reg_date });
            } else {
                rawString = JSON.stringify({ sender_seq: data.sender_seq, message: data.message, reg_date: data.reg_date });
            }
            await FileSystem.writeAsStringAsync(subDirectory, rawString, {
                encoding: FileSystem.EncodingType.UTF8
            });

        } catch (err) {
            console.log(err)
        }
    }
    ReadChatHistory = async (data) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chat = 'CHAT/';
            var subDirectory = fileDirectory + chat + data;
            var newString = await FileSystem.readAsStringAsync(subDirectory);
            return newString;
        } catch (err) {
            console.log(err)
        }
    }

    ReadTitleHistory = async (data) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chat = 'TITLE/';
            var subDirectory = fileDirectory + chat + data;
            var newString = await FileSystem.readAsStringAsync(subDirectory);
            return newString;
        } catch (err) {
            console.log(err);
        }
    }

    ReadDirectoryTitles = async () => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var title = 'TITLE/';
            var rootDirectory = fileDirectory + title;
            var directories = await FileSystem.readDirectoryAsync(rootDirectory);
            return directories;
        } catch (err) {
            return false
        }
    }
    DeleteTitle = async (data) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var title = 'TITLE/'
            var titleDirectory = fileDirectory + title;
            await FileSystem.deleteAsync(titleDirectory);
        } catch (err) {
            return false;
        }
    }
    DeleteChat = async (data) => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var chat = 'CHAT/';
            var chatDirectory = fileDirectory + chat;
            await FileSystem.deleteAsync(chatDirectory);
        } catch (err) {
            return false;
        }
    }

    ReadTitleDirectory = async () => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var directories = await FileSystem.readDirectoryAsync(fileDirectory + 'TITLE/');
            return directories
        } catch (err) {
            return false;
        }

    }
    ReadChatDirectory = async () => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var directories = await FileSystem.readDirectoryAsync(fileDirectory + 'CHAT/');
            return directories

        } catch (err) {
            return false;
        }
    }

    GET_PROFILE_IMAGE = async () => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var PROFILE_IMAGE = await FileSystem.readAsStringAsync(fileDirectory + 'ProfileImage');
            return PROFILE_IMAGE;
        } catch (err) {
            return false;
        }
    }

    GET_CATEGORY_ICONS = async () => {
        try {
            var fileDirectory = await FileSystem.documentDirectory;
            var CATEGORY_ICON = await FileSystem.readAsStringAsync(fileDirectory + 'CATEGORY');
            return CATEGORY_ICON;
        } catch (err) {
            return false;
        }
    }
}


export default new Directory();