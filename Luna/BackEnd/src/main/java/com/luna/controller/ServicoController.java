package com.luna.controller;

import com.luna.entity.Servico;
import com.luna.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService service;

    @GetMapping
    public List<Servico> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public Servico salvar(@RequestBody Servico servico) {
        return service.salvar(servico);
    }
}