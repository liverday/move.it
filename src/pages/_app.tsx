import '../styles/global.css';

import { ThemeProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider themeName={pageProps.theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
