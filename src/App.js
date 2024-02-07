import React, { useState } from 'react';
import Table from './component/Table';
import Result from "./component/Result";
import Form from "./component/Form"
import { DataProvider } from "./context/DataContext.js";

function App() {
  const [formErrors, setFormErrors] = useState([]);
  const [formScore, setFormScore] = useState(0);

  return (
    <DataProvider>
      <div className='bg-violet-100 grid content-center h-screen place-items-center overflow-auto'>
        <Result errors={formErrors} score={formScore} />
        <Form onErrorsChange={setFormErrors} onScoreChange={setFormScore}>
          <Table />
        </Form>
      </div>
    </DataProvider>
  );
}

export default App;