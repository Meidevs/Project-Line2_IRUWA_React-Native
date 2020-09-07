import * as Crypto from 'expo-crypto';

const KeyGenerator = async (roomCode) => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA1,
        roomCode
    );
    console.log(digest)
    return digest;
}

export default KeyGenerator;