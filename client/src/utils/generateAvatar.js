export const generateAvatar = (username) => {
    const baseUrl = "https://robohash.org/";
    const avatarUrl = `${baseUrl}${username}.png`;
    return avatarUrl;
};