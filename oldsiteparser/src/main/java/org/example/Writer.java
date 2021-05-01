package org.example;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

public class Writer {

    public void write(String path, Model m) throws IOException {

        File root = new File(path);
        File content = new File(root, "content");
        File rutas = new File(content, "rutas");

        for (String language : m.getModeloporIdioma().keySet()) {
            LocalizedModel lm = m.getModeloporIdioma().get(language);

            {
                File f = new File(content, "index_" + language + ".asciidoc");
                PrintWriter pw = new PrintWriter(new FileWriter(f));

                pw.println("---");
                pw.println("title: \"" + lm.getIndex().getTituloBienvenida().replaceAll("\"", "\\\"") + "\"");
                pw.println("date: " + new Date());
                pw.println("draft: true");
                pw.println("---");
                pw.println("" + lm.getIndex().getTextoBienvenida());
                pw.close();

            }

            {
                File f = new File(content, "intro_" + language + ".asciidoc");
                PrintWriter pw = new PrintWriter(new FileWriter(f));

                pw.println("---");
                pw.println("title: \"" + lm.getIntroduccion().getTitulo().replaceAll("\"", "\\\"") + "\"");
                pw.println("date: " + new Date());
                pw.println("draft: true");
                pw.println("---");
                pw.println("" + lm.getIntroduccion().getHtml());
                pw.close();

            }

            {
                File f = new File(content, "consejos_" + language + ".asciidoc");
                PrintWriter pw = new PrintWriter(new FileWriter(f));

                pw.println("---");
                pw.println("title: \"" + lm.getConsejos().getTitulo().replaceAll("\"", "\\\"") + "\"");
                pw.println("date: " + new Date());
                pw.println("draft: true");
                pw.println("---");
                pw.println("" + lm.getConsejos().getHtml());
                pw.close();

            }

            {
                File f = new File(content, "tipologia_" + language + ".asciidoc");
                PrintWriter pw = new PrintWriter(new FileWriter(f));

                pw.println("---");
                pw.println("title: \"" + lm.getTipologias().getTitulo().replaceAll("\"", "\\\"") + "\"");
                pw.println("date: " + new Date());
                pw.println("draft: true");
                pw.println("---");
                pw.println("" + lm.getTipologias().getHtml());
                pw.close();

            }

            for (Ruta r : lm.getRutas()) {
                File f = new File(rutas, "ruta_" + r.getId() + "_" + language + ".asciidoc");
                PrintWriter pw = new PrintWriter(new FileWriter(f));
                /*
                ---
title: "Ruta1"
date: 2021-05-01T12:44:26+02:00
draft: true
---
                 */
                pw.println("---");
                pw.println("title: \"" + r.getTitulo().replaceAll("\"", "\\\"") + "\"");
                pw.println("date: " + new Date());
                pw.println("draft: true");
                pw.println("---");
                pw.println("" + r.getDescripcion());
                pw.close();

            }
        }


    }

}
