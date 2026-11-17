
package com.luna.repository;

import com.luna.entity.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AgendamentoRepository
        extends JpaRepository<Agendamento, Long> {

    @Query("SELECT a FROM Agendamento a WHERE a.animal.tutor.id = :tutorId")
    List<Agendamento> listarPorTutor(@Param("tutorId") Long tutorId);
}
