// CategoryContext.js
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";

const ItemContext = createContext();

export function useItems() {
    return useContext(ItemContext);
}

export function ItemProvider({ children }) {
    const [list, setList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editingItem, setEditingItem] = useState(null);
    const [editingId, seteditingId] = useState(null);
    const [reFresh, setReFresh] = useState(false);

    useEffect(() => {
        axios
            .post(
                "https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=get_all_main_cat",
                {
                    deviceType: "web",
                    username: "anvar",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.data && Array.isArray(response.data.message)) {
                    const sortList = response.data.message.sort(
                        (a, b) => new Date(b.CREATED_TIME) - new Date(a.CREATED_TIME)
                    );
                    const slicedData = sortList.slice(0, 22);
                    setList(slicedData);
                }
            })
            .catch((error) => {
                console.error("Axios error:", error);
            });
    }, [inputValue, reFresh]);

    function handleInputChange(e) {
        let text = e.target.value.trim();
        setInputValue(text);
    }

    const handleAdd = useCallback(() => {
        if (inputValue) {
            axios
                .post(
                    "https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=insert_main_catagory",
                    {
                        deviceType: "web",
                        username: "anvar",
                        cat_name: inputValue,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    if (response.data.status === "failure") {
                        alert(response.data.message);
                    } else {
                        const newItem = response.data;
                        setList((prevList) => [newItem, ...prevList]);
                        setInputValue("");
                    }
                })
                .catch((error) => {
                    console.error("Axios error:", error);
                });
        }
    }, [inputValue]);

    function handleEdit(item) {
        setEditingItem(item);
        setInputValue(item.MAIN_CAT_NAME);
        seteditingId(item.MAIN_CAT_ID);
    }

    function handleUpdate() {
        if (inputValue) {
            axios
                .post(
                    "https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=update_main_catagory",
                    {
                        deviceType: "web",
                        username: "anvar",
                        cat_name: inputValue,
                        main_cat_id: editingId,
                        deleted_flg: "U",
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    if (response.data.status === "failure") {
                        alert(response.data.message);
                    } else {
                        const updatedItem = response.data;
                        setList((prevList) =>
                            prevList.map((item) =>
                                item.MAIN_CAT_ID === updatedItem.MAIN_CAT_ID
                                    ? updatedItem
                                    : item
                            )
                        );
                        setInputValue("");
                        seteditingId(null);
                        setEditingItem("");
                    }
                })
                .catch((error) => {
                    console.error("Axios error:", error);
                });
        }
    }

    function handleDelete(itemKey) {
        axios
            .post(
                `https://lubosoftdev.com/api/nst_back_end_code/catagory.php?run=update_main_catagory`,
                {
                    deviceType: "web",
                    username: "anvar",
                    cat_name: itemKey.MAIN_CAT_NAME,
                    main_cat_id: itemKey.MAIN_CAT_ID,
                    deleted_flg: "D",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setReFresh(!reFresh);
                setList(
                    list.filter((item) => item.MAIN_CAT_ID !== itemKey.MAIN_CAT_ID)
                );
            })
            .catch((error) => {
                console.error("Axios error:", error);
            });
    }

    const value = {
        list,
        inputValue,
        editingItem,
        handleInputChange,
        handleAdd,
        handleEdit,
        handleDelete,
        handleUpdate,
    };

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}
