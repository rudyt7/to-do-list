import React, { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { Container, Draggable } from "react-smooth-dnd";
import ListItem from "./ListItem";

import { LabelContext } from "../../context/LabelContext";
import { applyDrag } from "./applyDrag";

const CompletedTask = (props) => {
  const tasks = props.tasksList.filter((task) => task.completed);
  const labelContext = useContext(LabelContext);

  let task;
  const createList = (type) => {
    if (type === "") {
      task = tasks;
    } else {
      task = tasks.filter((listItem) => listItem.type === type);
    }
  };

  createList(labelContext.label);

  const ListJsx = task.map((t) => {
    return (
      <Draggable key={task.id}>
        <ListItem
          id={t.id}
          title={t.title}
          key={t.id}
          type={t.type}
          date={t.date}
          done={props.done}
          undo={props.undo}
          remove={props.remove}
          complete={t.completed}
          missed={t.missed}
          progress={t.progress}
        >
          {t.description}
        </ListItem>
      </Draggable>
    );
  });

  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        <AnimatePresence initial={true}>
          <Container
            onDrop={(e) => props.setToDoList(applyDrag(props.tasksList, e))}
          >
            {ListJsx}
          </Container>
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default CompletedTask;
