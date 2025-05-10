import './App.css'
import Layout from "./layout/Layout.tsx";
import RoleHandler from "./authentication/RoleHandler.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.tsx";
import CreateWriting from "./components/create/CreateWriting.tsx";
import CreateReading from "./components/create/CreateReading.tsx";
import CreateGrammar from "./components/create/CreateGrammar.tsx";
import CreateListening from "./components/create/CreateListening.tsx";
import CreateTests from "./components/create/CreateTests.tsx";
import UpdateGrammar from "./components/update/UpdateGrammar.tsx";
import UpdateWriting from "./components/update/UpdateWriting.tsx";
import UpdateReading from "./components/update/UpdateReading.tsx";
import UpdateListening from "./components/update/UpdateListening.tsx";
import UpdateTests from "./components/update/UpdateTests.tsx";

function App() {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/handler" element={<RoleHandler/>}/>
                <Route path="/createWriting" element={<CreateWriting/>}/>
                <Route path="/createReading" element={<CreateReading/>}/>
                <Route path="/createGrammar" element={<CreateGrammar/>}/>
                <Route path="/createListening" element={<CreateListening/>}/>
                <Route path="/createTests" element={<CreateTests/>}/>
                <Route path="/updateGrammar" element={<UpdateGrammar/>}/>
                <Route path="/updateWriting" element={<UpdateWriting/>}/>
                <Route path="/updateReading" element={<UpdateReading/>}/>
                <Route path="/updateListening" element={<UpdateListening/>}/>
                <Route path="/updateTests" element={<UpdateTests/>}/>
            </Routes>
        </Layout>
    )
}

export default App
