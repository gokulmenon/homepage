import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              <!-- Google Tag Manager -->
              <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WSBBKQ9');</script>
              <!-- End Google Tag Manager -->`
            }}
          >

          </script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={
              {
                __html: `
              (function(c,l,a,r,i,t,y){
                  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", '${process.env.CLARITY_ID}');
              `,
              }}
          />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest"></link>
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={
              {
                __html: `
                  <!-- Google Tag Manager (noscript) -->
                  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSBBKQ9"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                  <!-- End Google Tag Manager (noscript) -->
                  `,
              }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}