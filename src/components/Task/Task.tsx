"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TASK_STATUSES = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

// const tasksData = [
//   { id: 1, title: "Task 1", status: TASK_STATUSES.TODO },
//   { id: 2, title: "Task 2", status: TASK_STATUSES.IN_PROGRESS },
//   { id: 3, title: "Task 3", status: TASK_STATUSES.DONE },
// ];
interface DragItem {
  id: number;
  index: number;
}

const Task: React.FC<{ task: any; index: number; moveTask: any }> = ({
  task,
  index,
  moveTask,
}: any) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "task",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  React.useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  }, [drag]);
  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={dragRef}
      style={{
        opacity,
        padding: "8px",
        margin: "4px",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {task.title}
    </div>
  );
};

const Column = ({ status, tasks, moveTask }: any) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "task",
    drop: (item: any, monitor) => {
      moveTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  React.useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);
  const isActive = canDrop && isOver;

  return (
    <div
      ref={dropRef}
      style={{
        flex: "1",
        padding: "8px",
        margin: "4px",
        backgroundColor: isActive ? "lightgreen" : "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "8px" }}>{status}</h2>
      {tasks.map((task: any, index: any) => (
        <Task key={task.id} task={task} index={index} moveTask={moveTask} />
      ))}
    </div>
  );
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [" all-tasks"],
    queryFn: async () => {
      try {
        const response = await fetch("/project.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error: any) {
        throw new Error("Error fetching data:", error);
      }
    },
  });
  useEffect(() => {
    if (data && data.length > 0) {
      const task = data.find((item: any) => item.id === Number(id));
      if (task) {
        setTasks(task.tasks);
        console.log(task);
      }
    }
  }, [data, id]);
  const moveTask = (id: any, newStatus: any) => {
    const updatedTasks: any = tasks?.map((task: any) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const todoTasks = tasks?.filter(
    (task: any) => task.status === TASK_STATUSES.TODO
  );
  const inProgressTasks = tasks?.filter(
    (task: any) => task.status === TASK_STATUSES.IN_PROGRESS
  );
  const doneTasks = tasks?.filter(
    (task: any) => task.status === TASK_STATUSES.DONE
  );

  return (
    <div style={{ display: "flex" }}>
      <Column
        status={TASK_STATUSES.TODO}
        tasks={todoTasks}
        moveTask={moveTask}
      />
      <Column
        status={TASK_STATUSES.IN_PROGRESS}
        tasks={inProgressTasks}
        moveTask={moveTask}
      />
      <Column
        status={TASK_STATUSES.DONE}
        tasks={doneTasks}
        moveTask={moveTask}
      />
    </div>
  );
};

export default function TaskBody() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Task Board</h1>
      <DndProvider backend={HTML5Backend}>
        <TaskBoard />
      </DndProvider>
    </div>
  );
}
