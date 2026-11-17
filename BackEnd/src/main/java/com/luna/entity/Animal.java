package com.luna.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String especie;

    private String genero;

    private String raca;

    private int idade;

    private String porte;

    @ManyToOne
    private Tutor tutor;
}