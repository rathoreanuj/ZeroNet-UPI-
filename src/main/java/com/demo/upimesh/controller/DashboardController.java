package com.demo.upimesh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    /**
     * Root endpoint serves the React SPA frontend.
     */
    @GetMapping("/")
    public String home() {
        return "forward:/index.html";
    }

    /**
     * Fallback to the classic Thymeleaf template.
     */
    @GetMapping("/classic")
    public String classic() {
        return "dashboard";
    }
}
