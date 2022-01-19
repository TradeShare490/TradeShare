import UserService from "../services/User.service";

export const signUp = async (credentials, store, router) => {
  const response = await UserService.signup(credentials);
  if (response.success) {
    store
      .dispatch("login", {
        email: credentials.email,
        password: credentials.password,
      })
      .then(() => {
        router.push({ name: "Dashboard" });
      });
  } else {
    return response.message;
  }
  return true;
};

export const login = async (credentials, store, router) => {
  store
    .dispatch("login", {
      email: credentials.email,
      password: credentials.password,
    })
    .then(() => {
      router.push({ name: "Dashboard" });
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return true;
};

export const logout = async (store, router) => {
  store.dispatch("logout").then(() => {
    router.push({ name: "Login" });
  });
}

export const brokerageSignUp = async (credentials) => {
  console.log("hooks/useCredential.sj");
  console.log("Brokerage: ", credentials.select, "\n", "Email: ", credentials.email);
}


