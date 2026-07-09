const response = await axios.post(
    "https://backend-1-u021.onrender.com/login",
    {
        correo,
        password
    }
);

localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "usuario",
    JSON.stringify(response.data.usuario)
);

navigate("/dashboard");
localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "usuario",
    JSON.stringify(response.data.usuario)
);
navigate("/dashboard");