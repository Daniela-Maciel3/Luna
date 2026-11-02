package com.luna.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String data;

    @ManyToOne
    private Animal animal;

    @ManyToOne
    private Servico servico;
}