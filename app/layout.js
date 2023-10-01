import Nav from '@/components/Nav';
import '../styles/globals.css';
import Provider from '@/components/Provider';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <link rel='icon' href='../public/assets/images/logo.svg' sizes='any' />

    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
