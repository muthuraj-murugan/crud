import { useItems } from './context/ItemContext';
import List from './List';

function Crud() {
    const {
        list,
        inputValue,
        editingItem,
        handleInputChange,
        handleAdd,
        handleEdit,
        handleDelete,
        handleUpdate,
    } = useItems();




    return (
        <>
            <div className='box'>
                <h1 className='title'>CRUD</h1>
                <div className='newinput'>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='Enter here'
                    />
                    <button className={`${editingItem ? 'editBtn' : 'addBtn'} `} onClick={editingItem ? handleUpdate : handleAdd}>
                        {editingItem ? 'Update' : 'Add'} +
                    </button>
                </div>
            </div>
            <div className='cardBox'>
                <List list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
        </>
    )
}

export default Crud