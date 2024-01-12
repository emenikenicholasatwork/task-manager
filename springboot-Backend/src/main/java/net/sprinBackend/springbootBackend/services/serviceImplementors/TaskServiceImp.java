package net.sprinBackend.springbootBackend.services.serviceImplementors;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import net.sprinBackend.springbootBackend.models.Task;
import net.sprinBackend.springbootBackend.repository.TaskRepository;
import net.sprinBackend.springbootBackend.services.serviceInterface.TaskService;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskServiceImp implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getListOfCompletedTask() {
        return taskRepository.getCompletedTask();
    }

    public ResponseEntity<String> newTask(Task task) {
        Task newTask = Task.builder()
                .completed(task.isCompleted())
                .description(task.getDescription())
                .name(task.getName())
                .time(task.getTime())
                .important(task.isImportant())
                .build();
        taskRepository.save(newTask);
        return new ResponseEntity<>("succussfully added", HttpStatus.OK);
    }

    public List<Task> getListOfUndoneTask() {
        return taskRepository.getUndoneTask();
    }

    @Override
    public void deleteTask(int id, int userid) {

    }

    @Override
    public ResponseEntity<List<Task>> getFindAllTask() {
        return new ResponseEntity<>(taskRepository.findAll(), HttpStatus.OK) ;
    }

    @Override
    public List<Task> getListOfImportantTask() {
        return taskRepository.getImportantTask();
    }

    @Override
    public void changeState(int id) {
        taskRepository.changeState(id);
    }

    @Transactional
    @jakarta.transaction.Transactional
    public void deleteTask(int id) {
        taskRepository.deleteById((long) id);
    }
}
