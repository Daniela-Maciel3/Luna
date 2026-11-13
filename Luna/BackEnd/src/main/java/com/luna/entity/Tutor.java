
package com.luna.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Entity
@Data
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true)
    private String email;

    private String telefone;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;
}
