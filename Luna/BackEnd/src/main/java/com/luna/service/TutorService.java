package com.luna.service;

import com.luna.entity.Tutor;
import com.luna.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorService {

    @Autowired
    private TutorRepository repository;

    public List<Tutor> listarTodos() {
        return repository.findAll();
    }

    public Tutor salvar(Tutor tutor) {
        return repository.save(tutor);
    }

    public Tutor buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}