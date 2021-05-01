package org.example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Model {

    private Map<String, LocalizedModel> modeloporIdioma = new HashMap<>();

    public Map<String, LocalizedModel> getModeloporIdioma() {
        return modeloporIdioma;
    }

    public void setModeloporIdioma(Map<String, LocalizedModel> modeloporIdioma) {
        this.modeloporIdioma = modeloporIdioma;
    }
}
