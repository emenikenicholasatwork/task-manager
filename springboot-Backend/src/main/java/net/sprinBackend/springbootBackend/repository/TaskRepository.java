package net.sprinBackend.springbootBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import net.sprinBackend.springbootBackend.models.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.completed = true")
    List<Task> getCompletedTask();

    @Query("SELECT t FROM Task t WHERE t.completed = false")
    List<Task> getUndoneTask();

    @Query("SELECT t FROM Task t WHERE t.important = true")
    List<Task> getImportantTask();

    @Modifying
    @Query("UPDATE Task t SET t.completed = true WHERE t.id = :id")
    void changeState(@Param("id") int id);
}
