package com.luna.controller;

import com.luna.entity.Animal;
import com.luna.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/animais")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public List<Animal> listar() {
        return animalService.listarTodos();
    }

    @PostMapping
    public Animal salvar(@RequestBody Animal animal) {
        return animalService.salvar(animal);
    }
}