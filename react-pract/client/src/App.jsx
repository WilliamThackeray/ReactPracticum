import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentLogs from "./Pages/StudentLogs.jsx";
import AdminLogs from "./Pages/AdminLogs.jsx";
import AddStudentToCourse from "./Pages/AddStudentToCourse.jsx"
import Layout from "./Pages/Layout.jsx";
import SignIn from "./Pages/SignIn.jsx";
import { useState } from "react";

function App() {
  const [uvuId, setUvuId] = useState('')

  function setStudentId(value) {
    setUvuId(value)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<SignIn handleUvuId={setStudentId}/>}/>
          <Route path="student" element={<StudentLogs uvuId={uvuId} />} />
          <Route path="student/addToCourse" element={<AddStudentToCourse uvuId={uvuId} />}/>
          <Route path="admin" element={<AdminLogs uvuId={uvuId} />}/>
          {/* <Route path="teams" element={<TeamsPage/>} />
          <Route path="add-team" element={<AddEditTeam/>}/>
          <Route path="edit-team/:id" element={<AddEditTeam/>}/> */}
        </Route>
        {/* <Route path="*" element={<NoMatch />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;