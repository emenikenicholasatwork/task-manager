package net.sprinBackend.springbootBackend.services.serviceInterface;


import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import net.sprinBackend.springbootBackend.models.Task;
import org.springframework.transaction.annotation.Transactional;

public interface TaskService {

    List<Task> getListOfCompletedTask();

    ResponseEntity<String> newTask(Task task);

    List<Task> getListOfUndoneTask();

    void deleteTask(int id, int userid);

    ResponseEntity<List<Task>> getFindAllTask();

    List<Task> getListOfImportantTask();

    @Transactional
    @jakarta.transaction.Transactional
    void changeState(int id);
}
