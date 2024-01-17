import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import ReduxProvider from '@/shared/store/ReduxProvider';
import SmoothScroll from '@/shared/ui/smooth-scroll';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// Шрифты
// const Roboto = localFont({
//   src: [
//     {
//       path: '../../public/fonts/Robotocondensed.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//   ],
//   display: 'swap',
//   variable: '--base-font',
// });
// ? clsx(Roboto.variable) для body

export const metadata: Metadata = {
  title: 'Next.js Project',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, et',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export default function RootLayout({ children, ...rest }: RootLayoutProps) {
  return (
    <html lang="ru">
      <head>
        <script
          data-cfasync="false"
          id="rem-resize"
          dangerouslySetInnerHTML={{
            __html: `function remResize () {
              // Стандартный размер шрифта в пикселях, который задан для тега html, для удобства это всегда 10px
              const defaultFontSize = 10;
              // Значение ширины экрана в котором масштаб будет 100%, как в макете
              const startScaleWidth = 1440;
              // Значение ширины экрана до которого масштабирование будет увеличиваться
              const endScaleTopWidth = 1920;
              // Значение ширины экрана до которого масштабирование будет уменьшаться
              const endScaleBottomWidth = 1024;

              const widthWidth = document.documentElement.clientWidth;

              const htmlEl = document.querySelector('html');

              if ((widthWidth > endScaleTopWidth) && htmlEl) {
                const diff = startScaleWidth - endScaleTopWidth
                const percent = diff / (startScaleWidth / 100) / 100;
                htmlEl.style.fontSize = defaultFontSize - defaultFontSize * percent + 'px';
              } else if ((widthWidth > startScaleWidth) && htmlEl) {
                const diff = startScaleWidth - widthWidth;
                const percent = diff / (startScaleWidth / 100) / 100;
                htmlEl.style.fontSize = defaultFontSize - defaultFontSize * percent + 'px';
              } else if ((widthWidth < startScaleWidth) && (widthWidth >= endScaleBottomWidth) && htmlEl) {
                const diff = startScaleWidth - widthWidth;
                const percent = diff / (startScaleWidth / 100) / 100;
                htmlEl.style.fontSize = defaultFontSize - defaultFontSize * percent + 'px';
              } else {
                htmlEl.style.fontSize = 10 + 'px';
              }
            };
              remResize();
              setTimeout(() => {
                remResize();
              }, 100);
              window.addEventListener('resize', remResize)
          `,
          }}></script>
      </head>
      <body>
        <ReduxProvider {...rest}>
          <SmoothScroll>
            <div id="app">{children}</div>
          </SmoothScroll>
        </ReduxProvider>
      </body>
    </html>
  );
}
