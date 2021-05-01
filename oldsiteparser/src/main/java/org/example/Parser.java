package org.example;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;

public class Parser {
    public Model parse(String path) {
        Model model = new Model();
        parse(model, path);
        return model;
    }

    private void parse(Model model, String path) {
        parseHome(model, path);
        parseRoutes(model, path);
    }

    private void parseRoutes(Model model, String path) {
    }

    private void parseHome(Model model, String path) {
        //todo: https://elastic-bartik-b0f89c.netlify.app/informacion/index.es.html
        //todo: https://elastic-bartik-b0f89c.netlify.app/informacion/decalogo.es.html
        //todo: https://elastic-bartik-b0f89c.netlify.app/informacion/tipologia.es.html
        File dir = new File(path + "/rutas");
        for (File f : dir.listFiles(f -> f.getName().startsWith("ficha"))) {
            System.out.println("" + f.getName());
            String language = f.getName().split("\\.")[1];

            LocalizedModel m = model.getModeloporIdioma().get("es");
            if (m == null) {
                model.getModeloporIdioma().put(language, m = new LocalizedModel());
            }

            Document doc = null;
            try {
                doc = Jsoup.parse(f, "utf-8");

                String title = doc.title();
                String tituloRuta = doc.select("#vcms-path > div > div > h2").text();
                String descripcion = doc.select("#fichaRuta > p").html();
                String idRuta = f.getName().split("cr=")[1].split("&")[0];

                Elements newsHeadlines = doc.select("#fichaRuta > div > p");
                for (Element headline : newsHeadlines) {
                    String característica = headline.select("strong").text();
                    String valor = headline.text();
                    System.out.println("caract. = " + característica);
                    System.out.println("valor = " + valor);
                }

                newsHeadlines = doc.select("div.itinerario > ul > li");
                for (Element headline : newsHeadlines) {
                    String tituloPunto = headline.select("h4").text();
                    String datos = headline.select("p.datos").text();
                    String desc = headline.select("p.desc").text();
                    System.out.println("titulo punto = " + tituloPunto);
                    System.out.println("datos = " + datos);
                    System.out.println("desc = " + desc);
                }

                newsHeadlines = doc.select("div.otrasOpciones");
                for (Element headline : newsHeadlines) {
                    String tituloOpcion = headline.select("h3").text();
                    if ("otras opciones".equalsIgnoreCase(tituloOpcion)) {
                        String desc = headline.select("p").html();
                        System.out.println("titulo opción = " + tituloOpcion);
                        System.out.println("desc = " + desc);
                    } else if ("observaciones".equalsIgnoreCase(tituloOpcion)) {
                        String desc = headline.select("p").html();
                        System.out.println("titulo observación = " + tituloOpcion);
                        System.out.println("desc = " + desc);
                    } else {
                        System.out.println("NO RECONOCIDO " + tituloOpcion);
                    }
                }

                String mapa = doc.select("#capsaMapa").html();
                String perfil = doc.select("#perfilRuta > img").attr("src");

                System.out.println("language = " + language);
                System.out.println("id ruta = " + idRuta);
                System.out.println("title = " + title);
                System.out.println("titulo ruta = " + tituloRuta);
                System.out.println("descripción ruta = " + descripcion);
                System.out.println("mapa = " + mapa);
                System.out.println("perfil = " + perfil);

                Ruta r;
                m.getRutas().add(r = new Ruta());
                r.setId(idRuta);
                r.setTitulo(tituloRuta);
                r.setDescripcion(descripcion);

            } catch (IOException e) {
                e.printStackTrace();
            }

        }

        for (File f : dir.listFiles(f -> f.getName().startsWith("mapas"))) {
            System.out.println("" + f.getName());
            String language = f.getName().split("\\.")[1];
            String idRuta = f.getName().split("cr=")[1].split("&")[0];

            Document doc = null;
            try {
                doc = Jsoup.parse(f, "utf-8");

                String title = doc.title();

                String mapa = doc.select("#capsaMapa").html();
                String perfil = doc.select("#perfilRuta > img").attr("src");

                //todo: LoadGPXFileIntoGoogleMap(MyMap, 'http://www.senderosdemallorca.com/remotecall.ct.html?cr=25');
                // routecall devuelve un xml <gpx>, genrado por Garmin

                System.out.println("language = " + language);
                System.out.println("id ruta = " + idRuta);
                System.out.println("title = " + title);
                System.out.println("mapa = " + mapa);
                System.out.println("perfil = " + perfil);

                LocalizedModel m = model.getModeloporIdioma().get(language);
                if (m == null) {
                    System.out.println("NO MODEL FOR LANGUAGE " + language);
                } else {
                    m.getRutas().stream().filter(r -> r.getId().equals(idRuta)).findFirst().ifPresent(r -> {
                        r.setMapa(mapa);
                        r.setPerfil(perfil);
                    });
                }

            } catch (IOException e) {
                e.printStackTrace();
            }

            //todo: https://elastic-bartik-b0f89c.netlify.app/rutas/cr_48_puntos.es.html



        }
    }
}
