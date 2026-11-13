
package com.luna.service;

import com.luna.entity.Agendamento;
import com.luna.entity.Animal;
import com.luna.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository repository;

    @Autowired
    private AnimalService animalService;

    public List<Agendamento> listarPorTutor(Long tutorId) {
        return repository.listarPorTutor(tutorId);
    }

    public Agendamento salvar(Agendamento agendamento, Long tutorId) {

        if (agendamento.getAnimal() == null
                || agendamento.getAnimal().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selecione um animal."
            );
        }

        Animal animal = animalService.buscarPorId(
                agendamento.getAnimal().getId()
        );

        if (animal == null
                || animal.getTutor() == null
                || !animal.getTutor().getId().equals(tutorId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Este animal não pertence ao tutor informado."
            );
        }

        if (agendamento.getServico() == null
                || agendamento.getServico().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selecione um serviço."
            );
        }

        agendamento.setAnimal(animal);

        return repository.save(agendamento);
    }

    public Agendamento buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
