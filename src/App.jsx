import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
  // ESTADOS ANALÍTICOS Y OPERATIVOS
  const [productividad, setProductividad] = useState([])
  const [comparacion, setComparacion] = useState([])
  const [metas, setMetas] = useState([])
  const [proyectos, setProyectos] = useState([])
  const [planMejora, setPlanMejora] = useState([])
  const [ranking, setRanking] = useState([])
  const [analisisProyectos, setAnalisisProyectos] = useState([])
  const [promediosSemestrales, setPromediosSemestrales] = useState([])
  const [evaluacionGlobal, setEvaluacionGlobal] = useState([])
  const [usoAplicaciones, setUsoAplicaciones] = useState([])
  const [historicos, setHistoricos] = useState([])

  // ESTADOS DE AUTENTICACIÓN
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [usuario, setUsuario] = useState(null)

  // ESTADOS DE FORMULARIOS
  const [tituloMeta, setTituloMeta] = useState("")
  const [objetivoMeta, setObjetivoMeta] = useState("")
  const [prioridadMeta, setPrioridadMeta] = useState("Alta")
  const [nombreProyecto, setNombreProyecto] = useState("")
  const [descripcionProyecto, setDescripcionProyecto] = useState("")
  const [horasProyecto, setHorasProyecto] = useState("")
  const [nombreApp, setNombreApp] = useState("")
  const [aplicaciones, setAplicaciones] = useState([])
  const [proyectoId, setProyectoId] = useState("")
  const [fechaAvance, setFechaAvance] = useState("")
  const [horasTrabajadas, setHorasTrabajadas] = useState("")
  const [descripcionAvance, setDescripcionAvance] = useState("")
  const [fechaActividad, setFechaActividad] = useState("")
  const [tiempoActivo, setTiempoActivo] = useState("")
  const [tiempoInactivo, setTiempoInactivo] = useState("")
  const [clicksMouse, setClicksMouse] = useState("")
  const [teclas, setTeclas] = useState("")
  const [movimientoMouse, setMovimientoMouse] = useState("")
  const [aplicacionId, setAplicacionId] = useState("")

  // ESTADOS DE CONFIGURACIÓN DE ROLES Y USUARIOS
  const [appRolId, setAppRolId] = useState("")
  const [rolSeleccionadoParaApp, setRolSeleccionadoParaApp] = useState("") // <-- CORREGIDO: Nuevo estado para el formulario Rol-App
  const [esProductiva, setEsProductiva] = useState(true)
  const [roles, setRoles] = useState([])
  const [nombreRol, setNombreRol] = useState("")
  const [descripcionRol, setDescripcionRol] = useState("")
  const [usuarios, setUsuarios] = useState([])
  const [nombreUsuario, setNombreUsuario] = useState("")
  const [correoUsuario, setCorreoUsuario] = useState("")
  const [passwordUsuario, setPasswordUsuario] = useState("")
  const [rolUsuario, setRolUsuario] = useState("")

  const [usuarioHistorico, setUsuarioHistorico] = useState("")
  const [periodoHistorico, setPeriodoHistorico] = useState("")
  const [indiceHistorico, setIndiceHistorico] = useState("")


  // FUNCIONES API - DASHBOARD Y CONSULTAS
  const obtenerProductividad = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/productividad")
      setProductividad(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerComparacion = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/comparacion")
      setComparacion(response.data)
    } catch (error) {
      console.log(error)
    }
  }
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});
const obtenerMetas = async () => {
  try {
    const response = await axios.get("https://backend-1-u021.onrender.com/metas", getAuthHeaders());
    setMetas(response.data);
  } catch (error) {
    console.log("Error al obtener metas:", error);
  }
};
  const obtenerProyectos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://backend-1-u021.onrender.com/proyectos", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProyectos(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerPlanMejora = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/plan-mejora")
      setPlanMejora(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerRanking = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/ranking")
      setRanking(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerAnalisisProyectos = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/analisis-proyectos")
      setAnalisisProyectos(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const obtenerAplicaciones = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/aplicaciones")
      setAplicaciones(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerRoles = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://backend-1-u021.onrender.com/roles", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRoles(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("https://backend-1-u021.onrender.com/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsuarios(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const obtenerHistoricos = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/historico")
      setHistoricos(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const obtenerPromedioSemestral = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/promedio-semestral")
      setPromediosSemestrales(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const obtenerEvaluacionGlobal = async () => {
    try {
      const response = await axios.get("https://backend-1-u021.onrender.com/evaluacion-global")
      setEvaluacionGlobal(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const obtenerUsoAplicaciones = async () => {
    try {
      // CORREGIDO: Removido el prefijo "/api" para alinearse con tus otras rutas
      const response = await axios.get("https://backend-1-u021.onrender.com/uso-aplicaciones?global=true")
      console.log("DATOS DE APLICACIONES RECIBIDOS:", response.data)
      setUsoAplicaciones(response.data)
    } catch(error) {
      console.log("Error al consultar aplicaciones:", error)
    }
  }

  // ACCIONES Y CREACIÓN DE REGISTROS (POST)
  const login = async () => {
    try {
      const response = await axios.post("https://backend-1-u021.onrender.com/login", { correo, password })
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario))
      setUsuario(response.data.usuario)
      alert("Login exitoso")
      window.location.reload() // Recargar para activar el useEffect con los nuevos datos
    } catch (error) {
      alert(error.response?.data?.error || "Error al iniciar sesión")
    } 
  }

 const crearMeta = async () => {
  try {
    await axios.post("https://backend-1-u021.onrender.com/metas", {
      titulo: tituloMeta,
      objetivo: Number(objetivoMeta),
      prioridad: prioridadMeta
    }, getAuthHeaders()); // <--- AQUÍ ESTÁ EL SECRETO
    
    obtenerMetas(); // Refresca la lista después de crear
    setTituloMeta("");
    setObjetivoMeta("");
    alert("Meta creada");
  } catch (error) {
    alert("Error al crear meta");
  }
};
// En tu App.js, asegúrate de que esto esté así:
const actualizarProgresoMeta = async (id, valorProgreso) => {
    try {
        await axios.put(`https://backend-1-u021.onrender.com/metas/${id}/progreso`, {
            progreso: Number(valorProgreso)
        }, getAuthHeaders()); // <--- ¡Importante el header aquí también!
        
        obtenerMetas(); 
        alert("¡Progreso actualizado!");
    } catch (error) {
        alert("Error al actualizar");
    }
}

  const crearAplicacion = async () => {
    try {
      await axios.post("https://backend-1-u021.onrender.com/aplicaciones", { nombre: nombreApp })
      setNombreApp("")
      alert("Aplicación creada")
      obtenerAplicaciones()
    } catch (error) {
      console.log(error)
    }
  }

  const crearProyecto = async () => {
    try {
      await axios.post("https://backend-1-u021.onrender.com/proyectos", {
        nombre: nombreProyecto,
        descripcion: descripcionProyecto,
        fecha_inicio: "2026-06-01",
        fecha_fin: "2026-12-01",
        horas_estimadas: Number(horasProyecto),
        prioridad: "Alta",
        estado: "Activo",
        usuario_id: usuario.id
      })
      alert("Proyecto creado")
      setNombreProyecto("")
      setDescripcionProyecto("")
      setHorasProyecto("")
      obtenerProyectos()
    } catch (error) {
      console.log(error)
    }
  }

  const crearAvance = async () => {
    try {
      await axios.post("https://backend-1-u021.onrender.com/avances", {
        fecha: fechaAvance,
        horas_trabajadas: Number(horasTrabajadas),
        descripcion: descripcionAvance,
        proyecto_id: Number(proyectoId)
      })
      alert("Avance registrado")
      obtenerAnalisisProyectos()
      setProyectoId("")
      setFechaAvance("")
      setHorasTrabajadas("")
      setDescripcionAvance("")
    } catch (error) {
      console.log(error)
    }
  }

  const crearActividad = async () => {
    try {
      await axios.post("https://backend-1-u021.onrender.com/actividad", {
        fecha: fechaActividad,
        tiempo_activo: Number(tiempoActivo),
        tiempo_inactivo: Number(tiempoInactivo),
        clicks_mouse: Number(clicksMouse),
        teclas_presionadas: Number(teclas),
        movimiento_mouse: Number(movimientoMouse),
        usuario_id: usuario.id,
        aplicacion_id: Number(aplicacionId)
      })
      alert("Actividad registrada")
      setAplicacionId("")
      setFechaActividad("")
      setTiempoActivo("")
      setTiempoInactivo("")
      setClicksMouse("")
      setTeclas("")
      setMovimientoMouse("")
      
      // Actualizar Dashboard
      obtenerProductividad()
      obtenerRanking()
      obtenerComparacion()
      obtenerPlanMejora()
      obtenerUsoAplicaciones()
      obtenerEvaluacionGlobal()
    } catch(error) {
      console.log(error)
    }
  }

  const crearRolAplicacion = async () => {
    try {
      if (!rolSeleccionadoParaApp || !appRolId) {
        alert("Por favor seleccione un Rol y una Aplicación")
        return
      }
      // CORREGIDO: Enviamos el rol_id seleccionado en el formulario, no el del admin
      await axios.post("https://backend-1-u021.onrender.com/rol-aplicacion", {
        rol_id: Number(rolSeleccionadoParaApp),
        aplicacion_id: Number(appRolId),
        es_productiva: esProductiva
      })
      alert("Relación creada")
      setAppRolId("")
      setRolSeleccionadoParaApp("")
      setEsProductiva(true)
    } catch(error) {
      console.log(error)
    }
  }

  const crearRol = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post("https://backend-1-u021.onrender.com/roles", {
        nombre: nombreRol,
        descripcion: descripcionRol
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      obtenerRoles()
      setNombreRol("")
      setDescripcionRol("")
      alert("Rol creado")
    } catch (error) {
      console.log(error)
    }
  }

  const crearUsuario = async () => {
    try {
      const token = localStorage.getItem("token")
      await axios.post("https://backend-1-u021.onrender.com/usuarios", {
        nombre: nombreUsuario,
        correo: correoUsuario,
        password: passwordUsuario,
        rol_id: Number(rolUsuario)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Usuario creado")
      setNombreUsuario("")
      setCorreoUsuario("")
      setPasswordUsuario("")
      setRolUsuario("")
      obtenerUsuarios()
    } catch(error) {
      console.log(error)
      alert(error.response?.data?.error || "Error al crear usuario")
    }
  }

  // ELIMINACIÓN Y EDICIÓN
  const eliminarRol = async (id) => {
    // Preguntar antes de borrar es una buena práctica para evitar accidentes
    if (!window.confirm("¿Estás seguro de que deseas eliminar este rol?")) return

    try {
      const token = localStorage.getItem("token")
      await axios.delete(`https://backend-1-u021.onrender.com/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Rol eliminado con éxito")
      obtenerRoles() // <-- Volver a consultar el backend para limpiar la pantalla
    } catch (error) {
      console.log("Error al eliminar rol:", error)
      alert(error.response?.data?.error || "No se pudo eliminar el rol. Verifica si tiene usuarios asignados.")
    }
  }

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return

    try {
      const token = localStorage.getItem("token")
      await axios.delete(`https://backend-1-u021.onrender.com/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Usuario eliminado con éxito")
      obtenerUsuarios() // <-- Volver a consultar el backend para limpiar la pantalla
    } catch (error) {
      console.log("Error al eliminar usuario:", error)
      alert(error.response?.data?.error || "No se pudo eliminar el usuario.")
    }
  }

  const editarRol = async (rol) => {
    const nuevoNombre = prompt("Nuevo nombre", rol.nombre)
    const nuevaDescripcion = prompt("Nueva descripción", rol.descripcion)
    if (!nuevoNombre) return

    const token = localStorage.getItem("token")
    await axios.put(`https://backend-1-u021.onrender.com/roles/${rol.id}`, {
      nombre: nuevoNombre,
      descripcion: nuevaDescripcion
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    obtenerRoles()
  }

  const editarUsuario = async (usuario) => {
    const nuevoNombre = prompt("Nuevo nombre", usuario.nombre)
    const nuevoCorreo = prompt("Nuevo correo", usuario.correo)
    const nuevoRol = prompt("Nuevo rol_id", usuario.rol_id)
    if (!nuevoNombre || !nuevoCorreo) return

    const token = localStorage.getItem("token")
    await axios.put(`https://backend-1-u021.onrender.com/usuarios/${usuario.id}`, {
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      rol_id: Number(nuevoRol)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    obtenerUsuarios()
  }

  const crearHistorico = async () => {
    try {
      await axios.post("https://backend-1-u021.onrender.com/historico", {
        periodo: periodoHistorico,
        indice_productividad: Number(indiceHistorico),
        usuario_id: Number(usuarioHistorico)
      })
      alert("Histórico creado")
      setUsuarioHistorico("")
      setPeriodoHistorico("")
      setIndiceHistorico("")
      obtenerHistoricos()
    } catch(error) {
      console.log(error)
    }
  }

  // CORDÓN DE DISPARO DE CARGA INICIAL
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario")
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado))
      obtenerMetas()
      obtenerProyectos()
      obtenerAnalisisProyectos()
      obtenerAplicaciones()
      obtenerProductividad()
      obtenerComparacion()
      obtenerRanking()
      obtenerRoles()
      obtenerUsuarios()
      obtenerHistoricos()
      obtenerPromedioSemestral()
      obtenerEvaluacionGlobal()
      obtenerUsoAplicaciones()
obtenerPlanMejora()
    }
  }, [])

  // INTERFAZ DE LOGIN (SI NO HAY LOGUEO DE SESIÓN)
  if (!usuario) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button onClick={login}>Ingresar</button>
      </div>
    )
  }

  // VISTA PRINCIPAL DEL DASHBOARD TRAS EL LOGIN
  return (
    <div className="container">
      <h1>TimeWise</h1>

      <div className="card">
        <h2>{usuario.nombre}</h2>
        <p>Rol: {usuario.rol}</p>
      </div>

      <hr />
      
      {/* VISTA PROTEGIDA DE ADMINISTRACIÓN */}
      {usuario.rol === "Administrador" && (
        <div className="section">
          <h1>Administración</h1>

          <h2>Crear Rol</h2>
          <input
            placeholder="Nombre"
            value={nombreRol}
            onChange={(e) => setNombreRol(e.target.value)}
          />
          <input
            placeholder="Descripción"
            value={descripcionRol}
            onChange={(e) => setDescripcionRol(e.target.value)}
          />
          <button onClick={crearRol}>Crear Rol</button>

          <h2>Roles Registrados</h2>
{roles.map((rol) => (
  <div className="card" key={rol.id}>
    <strong>{rol.nombre}</strong> - ID: {rol.id}
    <br />
    {rol.descripcion}
    <br />
    <button onClick={() => editarRol(rol)}>Editar</button>
    {/* Asegúrate de que use una función flecha () => para que no se ejecute sola al cargar */}
    <button onClick={() => eliminarRol(rol.id)} style={{ backgroundColor: "#d9534f", color: "white" }}>
      Eliminar
    </button>
  </div>
))}
          <h2>Crear Usuario</h2>
          <input
            placeholder="Nombre"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <input
            placeholder="Correo"
            value={correoUsuario}
            onChange={(e) => setCorreoUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordUsuario}
            onChange={(e) => setPasswordUsuario(e.target.value)}
          />
          <select
            value={rolUsuario}
            onChange={(e) => setRolUsuario(e.target.value)}
          >
            <option value="">Seleccione un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
          <button onClick={crearUsuario}>Crear Usuario</button>

         <h2>Usuarios Colectivos</h2>
{usuarios.map((u) => (
  <div className="card" key={u.id}>
    <strong>{u.nombre}</strong> (ID: {u.id})
    <br />
    {u.correo}
    <br />
    Rol ID: {u.rol_id}
    <br />
    <button onClick={() => editarUsuario(u)}>Editar</button>
    {/* Asegúrate de que use una función flecha () => para pasar el u.id correctamente */}
    <button onClick={() => eliminarUsuario(u.id)} style={{ backgroundColor: "#d9534f", color: "white" }}>
      Eliminar
    </button>
  </div>
))}
        </div>
      )}

      {/* CONFIGURACIÓN GLOBAL DE ECOSISTEMA */}
      <h1>Configuración Inicial</h1>
      <h2>Registrar Aplicación</h2>
      <input
        type="text"
        placeholder="Nombre aplicación"
        value={nombreApp}
        onChange={(e) => setNombreApp(e.target.value)}
      />
      <button onClick={crearAplicacion}>Guardar Aplicación</button>

      <h2>Aplicaciones Habilitadas</h2>
      <ul>
        {aplicaciones.map((app) => (
          <li key={app.id}>{app.nombre} (ID: {app.id})</li>
        ))}
      </ul>

      {/* CORREGIDO: Matriz de relaciones de roles y aplicaciones vinculables */}
      <h2>Rol - Aplicación</h2>
      <select
        value={rolSeleccionadoParaApp}
        onChange={(e) => setRolSeleccionadoParaApp(e.target.value)}
      >
        <option value="">Seleccione un Rol objetivo</option>
        {roles.map((rol) => (
          <option key={rol.id} value={rol.id}>{rol.nombre}</option>
        ))}
      </select>

      <select
        value={appRolId}
        onChange={(e) => setAppRolId(e.target.value)}
      >
        <option value="">Seleccione una aplicación</option>
        {aplicaciones.map((app) => (
          <option key={app.id} value={app.id}>{app.nombre}</option>
        ))}
      </select>

      <select
        value={esProductiva}
        onChange={(e) => setEsProductiva(e.target.value === "true")}
      >
        <option value="true">Productiva</option>
        <option value="false">Improductiva</option>
      </select>
      <button onClick={crearRolAplicacion}>Guardar Relación</button>

      {/* FORMULARIO DE RECOPILACIÓN DE SOFTWARE DE USUARIOS */}
      <div className="section">
        <h1>Registro de Actividad</h1>
        <h2>Inyectar Métrica de Uso</h2>
        <select
          value={aplicacionId}
          onChange={(e) => setAplicacionId(e.target.value)}
        >
          <option value="">Seleccione la aplicación en uso</option>
          {aplicaciones.map((app) => (
            <option key={app.id} value={app.id}>{app.nombre}</option>
          ))}
        </select>

        <input
          type="date"
          value={fechaActividad}
          onChange={(e) => setFechaActividad(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tiempo Activo (Minutos)"
          value={tiempoActivo}
          onChange={(e) => setTiempoActivo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tiempo Inactivo"
          value={tiempoInactivo}
          onChange={(e) => setTiempoInactivo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Clicks"
          value={clicksMouse}
          onChange={(e) => setClicksMouse(e.target.value)}
        />
        <input
          type="number"
          placeholder="Teclas"
          value={teclas}
          onChange={(e) => setTeclas(e.target.value)}
        />
        <input
          type="number"
          placeholder="Movimiento Mouse"
          value={movimientoMouse}
          onChange={(e) => setMovimientoMouse(e.target.value)}
        />
        <button onClick={crearActividad}>Registrar Actividad</button>
      </div>

      {/* OPERACIONES Y CONTROL PROYECTUAL */}
      <h1>Gestión de Proyectos</h1>
      <h2>Nuevo Proyecto</h2>
      <input
        type="text"
        placeholder="Nombre proyecto"
        value={nombreProyecto}
        onChange={(e) => setNombreProyecto(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcionProyecto}
        onChange={(e) => setDescripcionProyecto(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Horas estimadas"
        value={horasProyecto}
        onChange={(e) => setHorasProyecto(e.target.value)}
      />
      <br />
      <button onClick={crearProyecto}>Guardar Proyecto</button>

      <h2>Mis Proyectos Activos</h2>
      {proyectos.map((proyecto) => (
        <div className="card" key={proyecto.id}>
          <p><strong>{proyecto.nombre}</strong> (ID: {proyecto.id})</p>
          <p>Horas estimadas: {proyecto.horas_estimadas}</p>
        </div>
      ))}

      <hr />

      <h1>Gestión de Metas</h1>
      <h2>Nueva Meta Operativa</h2>
      <input
        placeholder="Título"
        value={tituloMeta}
        onChange={(e) => setTituloMeta(e.target.value)}
      />
      <input
        type="number"
        placeholder="Objetivo"
        value={objetivoMeta}
        onChange={(e) => setObjetivoMeta(e.target.value)}
      />
      <select value={prioridadMeta} onChange={(e) => setPrioridadMeta(e.target.value)}>
        <option>Alta</option>
        <option>Media</option>
        <option>Baja</option>
      </select>
      <button onClick={crearMeta}>Guardar Meta</button>

   <h2>Mis Metas</h2>
      {metas.map((meta) => (
        <div className="card" key={meta.id}>
          <p>Título: {meta.titulo}</p>
          <p>Objetivo: {meta.objective || meta.objetivo}</p>
          <p>Prioridad: {meta.prioridad}</p>
          <p>Progreso: {meta.progreso} / {meta.objetivo}</p>
          <p>Avance: {meta.avance || 0}%</p>
          
          {/* BOTÓN OPERATIVO NUEVO */}
          <button 
            onClick={() => {
              const puntos = prompt("¿Cuántos puntos de avance le vas a sumar?", "10");
              if (puntos) actualizarProgresoMeta(meta.id, puntos);
            }}
            style={{ backgroundColor: "#5cb85c", color: "white", marginTop: "10px" }}
          >
            ➕ Registrar Avance
          </button>
        </div>
      ))}

      <hr />

      <h1>Registro de Avances</h1>
      <h2>Registrar Avance de Proyecto</h2>
      <select
        value={proyectoId}
        onChange={(e) => setProyectoId(e.target.value)}
      >
        <option value="">Seleccione un proyecto</option>
        {proyectos.map((proyecto) => (
          <option key={proyecto.id} value={proyecto.id}>{proyecto.nombre}</option>
        ))}
      </select>
      <br />
      <input
        type="date"
        value={fechaAvance}
        onChange={(e) => setFechaAvance(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Horas trabajadas"
        value={horasTrabajadas}
        onChange={(e) => setHorasTrabajadas(e.target.value)}
      />
      <br />
      <input
        placeholder="Descripción"
        value={descripcionAvance}
        onChange={(e) => setDescripcionAvance && setDescripcionAvance(e.target.value)}
      />
      <br />
      <button onClick={crearAvance}>Registrar Avance</button>

      <h1>Histórico de Productividad</h1>
      <select
        value={usuarioHistorico}
        onChange={(e) => setUsuarioHistorico(e.target.value)}
      >
        <option value="">Seleccione usuario histórico</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>{u.nombre}</option>
        ))}
      </select>
      <input
        placeholder="Periodo (Ej: 2026-05)"
        value={periodoHistorico}
        onChange={(e) => setPeriodoHistorico(e.target.value)}
      />
      <input
        type="number"
        placeholder="Índice de productividad"
        value={indiceHistorico}
        onChange={(e) => setIndiceHistorico(e.target.value)}
      />
      <button onClick={crearHistorico}>Guardar Histórico</button>

      <h2>Históricos Registrados</h2>
      {historicos.map((h, index) => (
        <div className="card" key={index}>
          Usuario: {h.usuario} | Periodo: {h.periodo} | Índice: {h.indice_productividad}%
        </div>
      ))}

      <hr />

      {/* BLOQUE DE CONTENEDORES DEL DASHBOARD ANALÍTICO DEL BACKEND */}
      <h1>Dashboard Analítico</h1>

      <h2>Ranking de Usuarios</h2>
      {ranking.map((item, index) => (
        <div className="card" key={index}>
          {index + 1}. {item.usuario} - {item.promedio}%
        </div>
      ))}

      <h2>Promedio Semestral</h2>
      {promediosSemestrales.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.usuario}</strong>
          <br />
          Promedio Histórico: {item.promedio_historico}% | Último Índice: {item.ultimo_indice}%
          <br />
          Diferencia: {item.diferencia}% | Tendencia: {item.tendencia}
        </div>
      ))}

      <h2>Productividad por Usuario</h2>
      {productividad.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.usuario}</strong> (Rol: {item.rol})
          <br />
          Productividad Activa: {item.indice_productividad}%
          <br />
          Tiempo Productivo: {item.total_productivo} min | Tiempo Total: {item.total_general} min
        </div>  
      ))}

      <h2>Comparación de Periodos</h2>
      {comparacion.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.usuario}</strong>
          <br />
          Cambio: {item.periodo_anterior} {" -> "} {item.periodo_actual}
          <br />
          Diferencia: {item.diferencia}% | Tendencia: {item.tendencia}
        </div>
      ))}

      <h2>Análisis Avanzado de Proyectos</h2>
      {analisisProyectos.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.proyecto}</strong>
          <br />
          Horas Reales: {item.horas_reales} / Horas Estimadas: {item.horas_estimadas}
          <br />
          Progreso Real: {item.porcentaje}% | Auditoría: {item.estado}
        </div>
      ))}

      <h2>Plan de Mejora Automatizado</h2>
      {planMejora.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.usuario}</strong>
          <ul>
            {item.recomendaciones?.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Evaluación Global</h2>
      {evaluacionGlobal.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.usuario}</strong>
          <br />
          Productividad: {item.productividad}% | Avance de Proyectos: {item.avance_proyectos}%
          <br />
          Conclusión del Sistema: {item.conclusion}
        </div>
      ))}

      <h2>Uso de Aplicaciones</h2>
{console.log("Datos que llegan de Flask:", usoAplicaciones)}
      {usoAplicaciones.map((item, index) => (
        <div className="card" key={index}>
          <strong>{item.usuario}</strong>
          <br />
          Minutos Productivos: {item.horas_productivas}
          <br />
          Minutos Improductivos: {item.horas_improductivas}
        </div>
      ))}

      <br />
      <button
        onClick={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("usuario")
          window.location.reload()
        }}
        style={{ backgroundColor: "#d9534f", color: "white", padding: "10px" }}
      >
        Cerrar Sesión Segura
      </button>
    </div>
  )
}

export default App