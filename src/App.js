import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

// loclaStorage.getItem('item name);
// loclaStorage.getItem('item name);

// const initialExpenses = [
//   { id: 1, charge: "rent", amount: 1600 },
//   { id: 2, charge: "car payment", amount: 400 },
//   { id: 3, charge: "credit card bill", amount: 1200 },
// ];
const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : []

console.log(initialExpenses);
const App = () => {
  // **************** state values *********************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expenses
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);
  //  ************* functionality ***********************
      useEffect(()=> {
        console.log('we called useEffect');
        localStorage.setItem('expenses', JSON.stringify(expenses))
      },[expenses])
  //  ************* functionality ***********************

  //handle charge
  const handleCharge = (e) => {
    console.log(`charge: ${e.target.value}`);

    setCharge(e.target.value);
  };
  //handle amount

  const handleAmount = (e) => {
    console.log(`amount: ${e.target.value}`);

    setAmount(e.target.value);
  };

  // handle alert

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  //handle submit

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id?{...item, charge,amount} : item
        })
        setExpenses(tempExpenses);
        setEdit(false)
      } else {
        const singleExpense = { id: Date.now(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: "charge cant be empty value and value has to be bigger than zero",
      });
    }
  };

  // handle delete
  const handleDelete = (id) => {
    setExpenses(expenses.filter((el) => el.id !== id));
    handleAlert({ type: "danger", text: "item deleted" });
  };
  //handle edit
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
          handleDelete={handleDelete}
          edit={edit}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += +curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;


