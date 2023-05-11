export default function limitedString(str,len) {
    return str.length > len ? str.substring(0,len)+"..." : str;
}