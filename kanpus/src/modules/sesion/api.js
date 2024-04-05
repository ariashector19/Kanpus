export default {
  login: async (user, password) => {
    const match = await fetch(
      `http://localhost:3000/accounts/?id=${user}&pass=${password}`
    ).then((r) => r.json());

    // simular latencia de la petición
    await new Promise((callback) => setTimeout(callback, 500));

    if (match.length > 0) {
      const userData = match[0];
      localStorage.setItem(
        "sesion",
        JSON.stringify({
          logged: true,
          userAccount: user,
          token: userData.token,
        })
      );
      return {
        userAccount: user,
        token: userData.token,
      };
    }

    return null;
  },
  signup: async (user, password, email) => {
    const result = await fetch("http://localhost:3000/accounts/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user, pass: password, email }),
    })
      .then((r) => true)
      .catch((r) => false);

    return result;
  },
  logout: () =>
    new Promise((callback) => {
      localStorage.setItem("sesion", JSON.stringify({ logged: false }));
      // simular latencia de la petición
      setTimeout(callback, 500);
    }),
  getUser: () => JSON.parse(localStorage.getItem("sesion"))?.userAccount,
};
