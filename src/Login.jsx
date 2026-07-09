const login = async () => {
    try {

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

        setUsuario(response.data.usuario);

        window.location.reload();

    } catch (error) {

        alert(
            error.response?.data?.error ||
            "Error al iniciar sesión"
        );

    }
};