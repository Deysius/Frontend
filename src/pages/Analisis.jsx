import { useEffect, useState } from "react"
import axios from "axios"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import html2canvas from "html2canvas"
import api from "../api";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, ComposedChart, Line
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF6666"]

function Analisis() {
    const [productividad, setProductividad] = useState([])
    const [ranking, setRanking] = useState([])
    const [comparacion, setComparacion] = useState([])
    const [proyectos, setProyectos] = useState([])
    const [usoApps, setUsoApps] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoints = [
                    { url: "productividad", setter: setProductividad },
                    { url: "ranking", setter: setRanking },
                    { url: "comparacion", setter: setComparacion },
                    { url: "analisis-proyectos", setter: setProyectos },
                    { url: "uso-aplicaciones", setter: setUsoApps }
                ]
               await Promise.all(
    endpoints.map(e =>
        api.get(`/${e.url}`).then(res => e.setter(res.data))
    )
)
            } catch (error) { console.error("Error cargando datos:", error) }
            finally { setLoading(false) }
        }
        fetchData()
    }, [])

    const totalUsuarios = productividad.length
    const sumaProd = productividad.reduce((a, b) => a + (b.indice_productividad || 0), 0)
    const promedioGeneral = totalUsuarios > 0 ? (sumaProd / totalUsuarios).toFixed(2) : 0
    const mejorUsuario = productividad.length > 0 ? [...productividad].sort((a,b) => b.indice_productividad - a.indice_productividad)[0] : null
    const peorUsuario = productividad.length > 0 ? [...productividad].sort((a,b) => a.indice_productividad - b.indice_productividad)[0] : null

    let clasificacion = promedioGeneral >= 90 ? "Excelente" : promedioGeneral >= 75 ? "Muy Buena" : "Necesita Mejorar";

    const capturarGrafico = async (id) => {
        const elemento = document.getElementById(id);
        const canvas = await html2canvas(elemento, { scale: 2, backgroundColor: "#ffffff" });
        return canvas.toDataURL("image/png");
    };

    const exportarPDF = async () => {
        const doc = new jsPDF("p", "mm", "a4");
        
        doc.setFontSize(20);
        doc.text("Reporte Ejecutivo - TimeWise", 14, 15);
        
        // Resumen Inteligente en PDF
        doc.setFontSize(12);
        doc.text("Resumen Inteligente:", 14, 25);
        doc.setFontSize(10);
        doc.text(`Promedio General: ${promedioGeneral}% | Clasificación: ${clasificacion}`, 14, 32);
        doc.text(`Mejor usuario: ${mejorUsuario?.usuario || "N/A"} | Peor usuario: ${peorUsuario?.usuario || "N/A"}`, 14, 38);

        // Página 1: Gráficos
        const img1 = await capturarGrafico("grafico-productividad");
        doc.addImage(img1, "PNG", 10, 45, 180, 70);
        
        const img2 = await capturarGrafico("grafico-apps");
        doc.addImage(img2, "PNG", 10, 120, 180, 70);

        // Página 2
        doc.addPage();
        const img3 = await capturarGrafico("grafico-proyectos");
        doc.addImage(img3, "PNG", 10, 15, 180, 80);
        
        const img4 = await capturarGrafico("grafico-ranking");
        doc.addImage(img4, "PNG", 10, 105, 180, 80);

        doc.save("Reporte_Completo_TimeWise.pdf");
    };

    if (loading) return <div style={{padding: "50px"}}>Cargando dashboard...</div>

    return (
        <div style={{ padding: "30px", fontFamily: "Arial" }}>
            <h1>Dashboard Analítico TimeWise</h1>

            {/* Gráficos con IDs */}
            <div id="grafico-productividad" style={{background: "white", padding: "10px"}}>
                <h2>Productividad por Usuario</h2>
                <ResponsiveContainer width="100%" height={250}><BarChart data={productividad}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="usuario"/><YAxis/><Tooltip/><Bar dataKey="indice_productividad" fill="#8884d8"/></BarChart></ResponsiveContainer>
            </div>

            <div id="grafico-apps" style={{background: "white", padding: "10px"}}>
                <h2>Uso de Aplicaciones</h2>
                <ResponsiveContainer width="100%" height={250}><BarChart data={usoApps}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="usuario"/><YAxis/><Tooltip/><Legend/><Bar dataKey="horas_productivas" stackId="a" fill="#00C49F"/><Bar dataKey="horas_improductivas" stackId="a" fill="#FF8042"/></BarChart></ResponsiveContainer>
            </div>

            <div id="grafico-proyectos" style={{background: "white", padding: "10px"}}>
                <h2>Avance de Proyectos</h2>
                <ResponsiveContainer width="100%" height={250}><ComposedChart data={proyectos}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="proyecto"/><YAxis/><Tooltip/><Legend/><Bar dataKey="horas_estimadas" fill="#ccc"/><Bar dataKey="horas_reales" fill="#8884d8"/><Line dataKey="porcentaje" stroke="#ff7300"/></ComposedChart></ResponsiveContainer>
            </div>

            <div id="grafico-ranking" style={{background: "white", padding: "10px"}}>
                <h2>Ranking</h2>
                <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={ranking} dataKey="promedio" nameKey="usuario" label>{ranking.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip/></PieChart></ResponsiveContainer>
            </div>

            {/* Resumen Inteligente UI */}
            <div style={{ background: "#f0f8ff", padding: "20px", marginTop: "20px", borderRadius: "10px", border: "1px solid #007bff" }}>
                <h3>Análisis Inteligente</h3>
                <p>El rendimiento global se clasifica como <b>{clasificacion}</b> ({promedioGeneral}%).</p>
                <p>Destaca <b>{mejorUsuario?.usuario}</b> como el más productivo, mientras que el equipo debe prestar atención al desempeño de <b>{peorUsuario?.usuario}</b>.</p>
                <button onClick={exportarPDF} style={{padding: "15px 30px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer"}}>
                    Descargar Reporte PDF Completo
                </button>
            </div>
        </div>
    )
}

export default Analisis