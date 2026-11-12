package com.luna.service;

import com.luna.entity.Servico;
import com.luna.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository repository;

    public List<Servico> listarTodos() {
        return repository.findAll();
    }

    public Servico salvar(Servico servico) {
        return repository.save(servico);
    }

    public Servico buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
