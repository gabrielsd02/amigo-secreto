import { 
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import { RecoilRoot } from "recoil";

import Configuracao from "./paginas/Configuracao";
import Sorteio from "./paginas/Sorteio";

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Configuracao/>}/>
          <Route path="/sorteio" element={<Sorteio/>}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
