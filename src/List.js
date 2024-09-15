import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function List({ list, handleDelete, handleEdit }) {
    return (
        <div className="cardList">
            {list.map((list) => (
                <div className="listBox" key={list.MAIN_CAT_ID}>
                    <div className="btnBox">
                        <button className="editBtn" onClick={() => handleEdit(list)}>
                            <FaEdit />
                        </button>
                        <button className="deleteBtn" onClick={() => handleDelete(list)}>
                            <MdDelete />
                        </button>
                    </div>
                    <h3>{list.MAIN_CAT_NAME}</h3>
                </div>
            ))}
        </div>
    );
}

export default List;
