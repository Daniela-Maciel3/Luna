
package com.luna.controller;

import com.luna.entity.Tutor;
import com.luna.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/tutores")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping
    public List<Tutor> listar() {
        return tutorService.listarTodos();
    }

    @PostMapping
    public Tutor salvar(@RequestBody Tutor tutor) {
        return tutorService.salvar(tutor);
    }

    @PostMapping("/login")
    public Tutor login(@RequestBody Tutor tutor) {
        return tutorService.login(
                tutor.getEmail(),
                tutor.getSenha()
        );
    }
}
