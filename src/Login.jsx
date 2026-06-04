const response = await axios.post(
    "http://localhost:5000/login",
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