import Nav from '@/components/Nav';
import '../styles/globals.css';
import Provider from '@/components/Provider';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI Prompts',
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession();
  return (
    <html lang='en'>
      <body>
        <Provider session={session}>
          <div className='name'>
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
};

export default RootLayout;
