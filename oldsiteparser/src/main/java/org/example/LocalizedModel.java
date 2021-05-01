package org.example;

import java.util.ArrayList;
import java.util.List;

public class LocalizedModel {

    private Index index = new Index();

    private Seccion introduccion = new Seccion();

    private Seccion consejos = new Seccion();

    private Seccion tipologias = new Seccion();

    private List<Ruta> rutas = new ArrayList<>();

    public Index getIndex() {
        return index;
    }

    public void setIndex(Index index) {
        this.index = index;
    }

    public Seccion getIntroduccion() {
        return introduccion;
    }

    public void setIntroduccion(Seccion introduccion) {
        this.introduccion = introduccion;
    }

    public Seccion getConsejos() {
        return consejos;
    }

    public void setConsejos(Seccion consejos) {
        this.consejos = consejos;
    }

    public Seccion getTipologias() {
        return tipologias;
    }

    public void setTipologias(Seccion tipologias) {
        this.tipologias = tipologias;
    }

    public List<Ruta> getRutas() {
        return rutas;
    }

    public void setRutas(List<Ruta> rutas) {
        this.rutas = rutas;
    }
}
