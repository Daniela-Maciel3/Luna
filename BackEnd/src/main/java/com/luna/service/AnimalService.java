
package com.luna.service;

import com.luna.entity.Animal;
import com.luna.entity.Tutor;
import com.luna.repository.AnimalRepository;
import com.luna.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository repository;

    @Autowired
    private TutorRepository tutorRepository;

    public List<Animal> listarPorTutor(Long tutorId) {
        return repository.findByTutor_Id(tutorId);
    }

    public Animal salvar(Animal animal) {

        if (animal.getTutor() == null || animal.getTutor().getId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "O tutor do animal é obrigatório."
            );
        }

        Long tutorId = animal.getTutor().getId();

        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tutor não encontrado."
                ));

        animal.setTutor(tutor);

        return repository.save(animal);
    }

    public Animal buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
