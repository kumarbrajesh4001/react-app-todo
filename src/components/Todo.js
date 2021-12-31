import React, { useState, useEffect } from "react";
import img from "../img/todo1.png";

const getItem = () => {
  const lst = JSON.parse(localStorage.getItem("list"));

  if (lst) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getItem());
  const [edit, setEdit] = useState(false);
  const [obj, setId] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  });

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <center>
            <figure>
              <img src={img} alt="todoimg" width="50px" />
              <figcaption>Todo App</figcaption>
            </figure>
            <div className="addItems">
              <input
                ref={(input) => input && input.focus()}
                type="text"
                placeholder="Text Item..."
                value={inputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
                onKeyDown={(event) => {
                  if (!edit)
                    if (event.key === "Enter") {
                      if (!inputData) {
                        alert("please some data write");
                      } else {
                        const allInputData = {
                          id: new Date().getTime().toString(),
                          name: inputData,
                        };

                        setItem([...item, allInputData]);
                        setInputData("");
                      }
                    }
                }}
                onKeyUp={(et) => {
                  if (edit)
                    if (et.key === "Enter") {
                      if (!inputData) {
                        alert("please some update");
                      } else {
                        let ty = item.find((cel) => {
                          return cel.id === obj.id;
                        });
                        ty.name = inputData;
                        setEdit(false);
                        setInputData("");
                      }
                    }
                }}
              />
              {edit ? (
                <i
                  className="far fa-edit"
                  title="Update Item"
                  onClick={() => {
                    if (!inputData) {
                      alert("please write the some text");
                    } else {
                      let ty = item.find((cel) => {
                        return cel.id === obj.id;
                      });
                      ty.name = inputData;
                      setEdit(false);
                      setInputData("");
                    }
                  }}
                ></i>
              ) : (
                <i
                  className="fas fa-plus add-btn"
                  title="Add Item"
                  onClick={() => {
                    if (!inputData) {
                      alert("please write the text...");
                    } else {
                      const allInputData = {
                        id: new Date().getTime().toString(),
                        name: inputData,
                      };

                      setItem([...item, allInputData]);
                      setInputData("");
                    }
                  }}
                ></i>
              )}
            </div>
            <div className="showItems">
              <div className="eachItem">
                {item.map((cv) => {
                  return (
                    <h3 key={cv.id}>
                      {cv.name}
                      <i
                        className="far fa-edit"
                        onClick={() => {
                          setInputData(cv.name);
                          setEdit(true);
                          setId(cv);
                        }}
                      ></i>
                      <i
                        className="far fa-trash-alt"
                        onClick={() => {
                          if (inputData) {
                            alert(
                              "please update this data or empty input area then you will deleted"
                            );
                            setInputData("");
                          } else {
                            setItem(
                              item.filter((el) => {
                                return el.id !== cv.id;
                              })
                            );
                          }
                        }}
                      ></i>
                    </h3>
                  );
                })}
              </div>
            </div>
            <div className="showItems">
              <button
                className="btn effect04"
                data-sm-link-text="Remove All"
                onClick={() => {
                  if (inputData) {
                    alert(
                      "please update the data or empty input area then after remove all"
                    );
                    setInputData("");
                  } else {
                    setItem([]);
                  }
                }}
              >
                <span>Remove All</span>
              </button>
            </div>
          </center>
        </div>
      </div>
    </>
  );
};
export default Todo;
