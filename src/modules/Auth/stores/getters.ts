export default {
  authUser: (state) => {      
    return state.user;
  },
  authUserAvatar: (state) => {
    return `${import.meta.env.VITE_APP_API_URL}/${state.user.avatar}`
  },
  isAdmin: (state) => {
    return state.user ? state.user.isAdmin : false;
  },
  isError: (state) => {
    return state.error;
  },
  isLoading: (state) => {
    return state.loading;
  },
  loggedIn: (state) => {
    return !!state.user;
  },
  guest: () => {
    const storageItem = window.localStorage.getItem("guest");
    if (!storageItem) return false;
    if (storageItem === "isGuest") return true;
    if (storageItem === "isNotGuest") return false;
  }
}


