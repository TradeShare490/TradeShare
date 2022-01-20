import UserService from "../services/User.service";

export const signUp = async (credentials, store, router) => {
  const response = await UserService.signup(credentials);
  if (response.success) {
    store.dispatch("login", credentials).then(() => {
      router.push({ name: "Dashboard" });
    });
  } else {
    return response.message;
  }
  return false;
};


export const login = async (credentials, store, router) => {

  store
    .dispatch("login", credentials)
    .then(() => {
      router.push({ name: "Dashboard" });
    }).catch(err => {
      console.log(err.response.data)
      return err.response.data;
      // console.log(err.response.data.message)
      // return err.response.data.message
  });
  return false };

export const logout = async (store, router) => {
  store.dispatch("logout").then(() => {
    router.push({ name: "Login" });
  });
};

export const brokerageSignUp = async credentials => {
  console.log("hooks/useCredential.sj");
  console.log(
    "Brokerage: ",
    credentials.select,
    "\n",
    "Email: ",
    credentials.email
  );
};


