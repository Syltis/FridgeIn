package com.fridgein.kris.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class HomeController {

    /**
     * Redirect default localhost-adress to the H2 console. This is pure laziness
     */
    @GetMapping(value = "/")
    public void redirectToH2(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect("https://console.cloud.google.com/sql/instances/fridgeindata/overview?project=fridgein&folder&organizationId&duration=PT1H");
    }
}
