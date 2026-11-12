package com.luna.service;

import com.luna.entity.Animal;
import com.luna.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    public List<Animal> listarTodos() {
        return repository.findAll();
    }

    public Animal salvar(Animal animal) {
        return repository.save(animal);
    }

    public Animal buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
