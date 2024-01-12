package net.sprinBackend.springbootBackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.sprinBackend.springbootBackend.models.Task;
import net.sprinBackend.springbootBackend.services.serviceImplementors.TaskServiceImp;

@RequestMapping(path = "/task")
@RestController
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskServiceImp taskService;

    @GetMapping("/completed")
    public List<Task> getCompletedTask() {
        return taskService.getListOfCompletedTask();
    }

    @GetMapping("/important")
    public List<Task> getImportantTask(){return  taskService.getListOfImportantTask();}

    @PutMapping("/changeState/{taskId}")
    public void changeState(@PathVariable int taskId){taskService.changeState(taskId);}

    @GetMapping("/incomplete")
    public List<Task> getUndoneTask() {
        return taskService.getListOfUndoneTask();
    }


    @PostMapping("/add")
    public ResponseEntity<?> saveNewTask(@RequestBody Task task) {
        try {
            return taskService.newTask(task);
        } catch (Exception e) {
            return new ResponseEntity<>("contact n__k--y", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTask() {
        try{
            return taskService.getFindAllTask();
        }catch(Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable("taskId") int taskId) {
        try {
            taskService.deleteTask(taskId);
            return new ResponseEntity<>("Successfully deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed", HttpStatus.CONFLICT);
        }
    }
}
