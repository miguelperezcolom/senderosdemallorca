package org.example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Ruta {

    private String id;

    private String titulo;

    private String link;

    private String descripcion;

    private String html;

    private Map<String, String> ficha = new HashMap<>();

    private List<PuntoItinerario> itinerario = new ArrayList<>();

    private String otrasopciones;

    private String observaciones;

    private String mapa;

    private String perfil;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public Map<String, String> getFicha() {
        return ficha;
    }

    public void setFicha(Map<String, String> ficha) {
        this.ficha = ficha;
    }

    public List<PuntoItinerario> getItinerario() {
        return itinerario;
    }

    public void setItinerario(List<PuntoItinerario> itinerario) {
        this.itinerario = itinerario;
    }

    public String getOtrasopciones() {
        return otrasopciones;
    }

    public void setOtrasopciones(String otrasopciones) {
        this.otrasopciones = otrasopciones;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getMapa() {
        return mapa;
    }

    public void setMapa(String mapa) {
        this.mapa = mapa;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }
}
