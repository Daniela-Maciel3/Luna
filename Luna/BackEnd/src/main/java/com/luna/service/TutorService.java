
package com.luna.service;

import com.luna.entity.Tutor;
import com.luna.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TutorService {

    @Autowired
    private TutorRepository repository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public List<Tutor> listarTodos() {
        return repository.findAll();
    }

    public Tutor salvar(Tutor tutor) {

        if (tutor.getNome() == null || tutor.getNome().isBlank()
                || tutor.getEmail() == null || tutor.getEmail().isBlank()
                || tutor.getSenha() == null || tutor.getSenha().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Preencha os campos obrigatórios."
            );
        }

        String email = tutor.getEmail().trim().toLowerCase();

        if (repository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Este e-mail já está cadastrado."
            );
        }

        tutor.setEmail(email);
        tutor.setSenha(passwordEncoder.encode(tutor.getSenha()));

        return repository.save(tutor);
    }

    public Tutor buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Tutor login(String email, String senha) {

        if (email == null || senha == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "E-mail ou senha incorretos."
            );
        }

        Tutor tutor = repository.findByEmail(
                email.trim().toLowerCase()
        ).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "E-mail ou senha incorretos."
        ));

        if (!passwordEncoder.matches(senha, tutor.getSenha())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "E-mail ou senha incorretos."
            );
        }

        return tutor;
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
