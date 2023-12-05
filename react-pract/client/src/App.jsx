import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentLogs from "./Pages/StudentLogs.jsx";
import AdminLogs from "./Pages/AdminLogs.jsx";
import Layout from "./Pages/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<AdminLogs />}/>
          <Route path="student" element={<StudentLogs />}/>
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