import { routing } from '@/i18n/routing';

export default function RootPage() {
  const target = `/${routing.defaultLocale}/`;
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
        <title>Aimeng</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var nav = (navigator.language || '').toLowerCase();
                var loc = nav.indexOf('zh') === 0 ? 'zh' : (nav.indexOf('en') === 0 ? 'en' : '${routing.defaultLocale}');
                location.replace('/' + loc + '/');
              } catch (e) {
                location.replace('${target}');
              }
            })();`,
          }}
        />
      </head>
      <body style={{ background: '#05060a', color: '#e6e8ef', fontFamily: 'system-ui' }}>
        <a href={target} style={{ color: '#5eead4' }}>
          Aimeng →
        </a>
      </body>
    </html>
  );
}
