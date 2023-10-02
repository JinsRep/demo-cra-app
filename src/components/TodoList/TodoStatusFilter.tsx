import { ChangeEventHandler } from "react";
import { TodoItemStatusFilter } from "./types";

export type TodoStatusFilterProps = {
  value: TodoItemStatusFilter;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function TodoStatusFilter({ value, onChange }: TodoStatusFilterProps) {
  return (
    <div className="flex items-center space-x-8">
      <div className="flex items-center">
        <input
          type="radio"
          id="all"
          name="statusFilter"
          value="all"
          className="form-radio"
          checked={value === "all"}
          onChange={onChange}
        />
        <label htmlFor="all" className="ml-2 leading-none">
          All
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="inprogress"
          name="statusFilter"
          value="inprogress"
          className="form-radio"
          checked={value === "inprogress"}
          onChange={onChange}
        />
        <label htmlFor="inprogress" className="ml-2 leading-none">
          In Progress
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="completed"
          name="statusFilter"
          value="completed"
          className="form-radio"
          checked={value === "completed"}
          onChange={onChange}
        />
        <label htmlFor="completed" className="ml-2 leading-none">
          Completed
        </label>
      </div>
    </div>
  );
}

export default TodoStatusFilter;
