// Document component - Custom document để thêm metadata và favicon
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        {/* Meta tags cơ bản */}
        <meta charSet="utf-8" />
        <meta name="description" content="WIF Shop - Chuyên cung cấp tài khoản game uy tín, chất lượng với giá cả hợp lý" />
        <meta name="keywords" content="tài khoản game, game account, shop game, WIF Shop" />
        <meta name="author" content="WIF Shop" />
        
        {/* Favicon */}
        <link rel="icon" type="image/jpeg" href="/images/logo.jpg" />
        <link rel="shortcut icon" type="image/jpeg" href="/images/logo.jpg" />
        <link rel="apple-touch-icon" href="/images/logo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

