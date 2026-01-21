import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  // 1. Initialize state with one default object
  // We use a unique ID (like Date.now()) to track items safely
  const [fields, setFields] = useState([
    { id: Date.now(), name: '', age: '' }
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    const fieldsWithoutIds = fields.map((field)=>{
      return {name:field.name, age:field.age}
    })
    console.log(fieldsWithoutIds);
  }

  // 2. Add New Field: Just update the state array
  function addMoreBtn() {
    const newField = { id: Date.now(), name: '', age: '' };
    setFields([...fields, newField]);
  }

  // 3. Remove Field: Filter out the item with the specific ID
  function removeFields(idToRemove) {
    const updatedFields = fields.filter((field) => field.id !== idToRemove);
    setFields(updatedFields);
  }

  // Optional: Handle input changes (Controlled Components)
  function handleInputChange(id, event) {
    const newFields = fields.map(field => {
      if (field.id === id) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        {/* 4. Render the list dynamically based on State */}
        {fields.map((field) => (
          <div key={field.id} className="input-row">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={field.name}
              onChange={(e) => handleInputChange(field.id, e)}
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={field.age}
              onChange={(e) => handleInputChange(field.id, e)}
            />
            
            {/* Pass the specific ID to the remove function */}
            <button type="button" onClick={() => removeFields(field.id)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addMoreBtn}>Add More..</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;