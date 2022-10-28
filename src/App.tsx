import { ThemeProvider } from 'styled-components';
import Button from "./components/Button";

import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button
        variant="primary"
        style={{ margin: "0px 20px 0px 0px" }}
      />
      <Button variant="danger" />
      <Button variant="secondary" />
      <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App