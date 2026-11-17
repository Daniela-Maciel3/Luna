
package com.luna.controller;

import com.luna.entity.Agendamento;
import com.luna.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService service;

    @GetMapping
    public List<Agendamento> listar(@RequestParam Long tutorId) {
        return service.listarPorTutor(tutorId);
    }

    @PostMapping
    public Agendamento salvar(
            @RequestParam Long tutorId,
            @RequestBody Agendamento agendamento) {

        return service.salvar(agendamento, tutorId);
    }
}
