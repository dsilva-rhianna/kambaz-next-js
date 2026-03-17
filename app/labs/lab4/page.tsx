"use client"
import Link from "next/link";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
    function sayHello() {
      alert("Hello");
    }
    return (
      <Provider store={store}>
        <div id="wd-lab4">
            <h2>Lab 4</h2>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <div id="wd-passing-functions">
              <PassingFunctions theFunction={sayHello} />
            </div>
            <Counter/>
            <BooleanStateVariables/>
            <StringStateVariables/>
            <DateStateVariable/>
            <ObjectStateVariable/>
            <ArrayStateVariable/>
            <ParentStateComponent/>
            <Link href="./lab4/redux">Redux Examples</Link> <hr/>
            <Link href="./lab4/react-context">React Context Examples</Link> <hr/>
            <Link href="./lab4/zustand">Zustand Examples</Link>
        </div>
      </Provider>
    );
}
