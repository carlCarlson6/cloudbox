import { Box, Flex, Heading, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '../ui/styles.css'

export const metadata = {
  title: "cloudbox.app",
  description: "share files made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Box p={'4'}>
              <Header />
              <Flex direction={'column'} align={'center'} pt={'6'}>
                {children}
              </Flex>
          </Box>
        </Theme>
      </body>
    </html>
  );
}

const Header = () => (<>
  <Flex direction={'row'} justify={'between'} pl={'4'}>
    <Heading>cloudbox.app</Heading>
  </Flex>
</>);