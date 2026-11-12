package com.luna.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Double preco;
}