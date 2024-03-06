// pages/_app.js

import '../styles/global.css'; // Import the global CSS file
import { ChatProvider } from '../pages/component/context/chatContext'
function MyApp({ Component, pageProps }) {
    return (
        <ChatProvider>
            <Component {...pageProps} />
        </ChatProvider>
    );
}

export default MyApp
