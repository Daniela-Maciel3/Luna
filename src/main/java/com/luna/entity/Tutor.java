package com.luna.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String nome;

    private String cpf;

    private String genero;

    private String telefone;

    private String endereco;
}

