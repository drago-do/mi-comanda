if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const r=e=>s(e,n),d={module:{uri:n},exports:t,require:r};a[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0c428ae2-e1a486e4a99247ae.js",revision:"e1a486e4a99247ae"},{url:"/_next/static/chunks/198-81279e77c2df142b.js",revision:"81279e77c2df142b"},{url:"/_next/static/chunks/1bfc9850-3597ef97fda7a483.js",revision:"3597ef97fda7a483"},{url:"/_next/static/chunks/249.5ec9e62df29169ab.js",revision:"5ec9e62df29169ab"},{url:"/_next/static/chunks/664-0d363765ddf4399d.js",revision:"0d363765ddf4399d"},{url:"/_next/static/chunks/675-ef646eb8e0f73977.js",revision:"ef646eb8e0f73977"},{url:"/_next/static/chunks/698.16ba223dac9a3b3e.js",revision:"16ba223dac9a3b3e"},{url:"/_next/static/chunks/909-76044ad55a2b1b0a.js",revision:"76044ad55a2b1b0a"},{url:"/_next/static/chunks/d7eeaac4-2c3c779c68526fed.js",revision:"2c3c779c68526fed"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-c5bbfc4c9482b3cc.js",revision:"c5bbfc4c9482b3cc"},{url:"/_next/static/chunks/pages/_app-e65ba0ae067f83c5.js",revision:"e65ba0ae067f83c5"},{url:"/_next/static/chunks/pages/_error-f170ec85fda4fc04.js",revision:"f170ec85fda4fc04"},{url:"/_next/static/chunks/pages/index-f8a9b228984f16e6.js",revision:"f8a9b228984f16e6"},{url:"/_next/static/chunks/pages/pedido/%5Bsubcategoria%5D-d06073ba48eb34f9.js",revision:"d06073ba48eb34f9"},{url:"/_next/static/chunks/pages/pedido/IniciarPedidoLayout-6f863402834db94b.js",revision:"6f863402834db94b"},{url:"/_next/static/chunks/pages/pedido/components/InfoProducto-a49d17532403e869.js",revision:"a49d17532403e869"},{url:"/_next/static/chunks/pages/pedido/components/ItemCategoria-f8a1aeca68231420.js",revision:"f8a1aeca68231420"},{url:"/_next/static/chunks/pages/pedido/components/ItemProducto-bcc91005e2cc31ed.js",revision:"bcc91005e2cc31ed"},{url:"/_next/static/chunks/pages/pedido/components/ItemProductoComanda-038ece30a61d0b0c.js",revision:"038ece30a61d0b0c"},{url:"/_next/static/chunks/pages/pedido/iniciarPedido-95c9f2d9cf0765db.js",revision:"95c9f2d9cf0765db"},{url:"/_next/static/chunks/pages/sesion/components/DisplayTeclado-6f86ba4a74355f5e.js",revision:"6f86ba4a74355f5e"},{url:"/_next/static/chunks/pages/sesion/components/Usuario-6384a16849a97384.js",revision:"6384a16849a97384"},{url:"/_next/static/chunks/pages/sesion/iniciarSesion-a158f7fc3d10f3f9.js",revision:"a158f7fc3d10f3f9"},{url:"/_next/static/chunks/pages/sesion/layout-91fcdd46c7806871.js",revision:"91fcdd46c7806871"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-3d8962db90c3ba58.js",revision:"3d8962db90c3ba58"},{url:"/_next/static/css/100bbb06351a4e7e.css",revision:"100bbb06351a4e7e"},{url:"/_next/static/css/1c3f347885babb9e.css",revision:"1c3f347885babb9e"},{url:"/_next/static/css/619573db4f9b1547.css",revision:"619573db4f9b1547"},{url:"/_next/static/css/8179fdb93866dae4.css",revision:"8179fdb93866dae4"},{url:"/_next/static/css/d267da096e8c6038.css",revision:"d267da096e8c6038"},{url:"/_next/static/kK88lsTIR5-Cq0QVzd3Kv/_buildManifest.js",revision:"137c967b7e113dec2995464fb33328d7"},{url:"/_next/static/kK88lsTIR5-Cq0QVzd3Kv/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/avatar1.6a96c395.png",revision:"8f4bdaffcc2743cb941f16c8cb68c7c9"},{url:"/_next/static/media/avatar2.191cbd28.png",revision:"bb6e8bbbd89746f36b0875f63d551b99"},{url:"/_next/static/media/avatar3.3c69ae4e.png",revision:"6e9298a14cdd936879d4a703c475f095"},{url:"/_next/static/media/avatar4.af962e81.png",revision:"db347b2fe83f551a2d0ff0d3b5a53a70"},{url:"/_next/static/media/avatar5.96b86e38.png",revision:"0ae2540eb3fb8709f5a1a48954657187"},{url:"/_next/static/media/avatar6.d3924b28.png",revision:"315036e2680d641720b313f05c3e0578"},{url:"/android-chrome-192x192.png",revision:"8dd3a282d64a670540df341ac2ab1b40"},{url:"/android-chrome-512x512.png",revision:"e36340c9963f77dd4204b50be85f4267"},{url:"/apple-touch-icon.png",revision:"bb61f18169b0adee9d3c3d6b3e161ec3"},{url:"/avatarDefault/avatar1.png",revision:"8f4bdaffcc2743cb941f16c8cb68c7c9"},{url:"/avatarDefault/avatar2.png",revision:"bb6e8bbbd89746f36b0875f63d551b99"},{url:"/avatarDefault/avatar3.png",revision:"6e9298a14cdd936879d4a703c475f095"},{url:"/avatarDefault/avatar4.png",revision:"db347b2fe83f551a2d0ff0d3b5a53a70"},{url:"/avatarDefault/avatar5.png",revision:"0ae2540eb3fb8709f5a1a48954657187"},{url:"/avatarDefault/avatar6.png",revision:"315036e2680d641720b313f05c3e0578"},{url:"/bebidasDefault/bacardice.jpg",revision:"26e594ce5f4727d258dcaab3d9de6fe2"},{url:"/bebidasDefault/buba.jpg",revision:"e44968cb665a67b798770edb11760356"},{url:"/bebidasDefault/clamarindo.jpg",revision:"5a22487fea799296349d4df15190970c"},{url:"/bebidasDefault/ferrero.jpg",revision:"ba8cd731f0c97777bb79dd9e458d0093"},{url:"/bebidasDefault/malibu.jpg",revision:"4930b6c3d1618c44a2715c56c6d0638a"},{url:"/bebidasDefault/mangonada.jpg",revision:"79a0aaba49da2d7a33265b6680283cef"},{url:"/bebidasDefault/marCortez.jpg",revision:"570111fd3c019c7c10f2f8c9a34f0624"},{url:"/bebidasDefault/mazapan.jpg",revision:"5cbd8fd5b5967f39681fcf07ed7d026f"},{url:"/bebidasDefault/mojito.jpg",revision:"5223b05cef1a5113a7ef9f60565bcc7e"},{url:"/bebidasDefault/mojitoMango.jpg",revision:"25d15555f1d4b27a6192be789a8f086b"},{url:"/bebidasDefault/mojitoRojo.jpg",revision:"cd0302c6cd81276363313378f65e2470"},{url:"/bebidasDefault/pantera.jpg",revision:"d402f06c0eb55c8426a4a131822cf341"},{url:"/bebidasDefault/pelon.jpg",revision:"44e12b517e76ceec296e0347a23b85f1"},{url:"/bebidasDefault/pica.jpg",revision:"6c5117d386ea44d7a4a8896ad8bc2a9a"},{url:"/bebidasDefault/pina.jpg",revision:"614fdf8d850f12fb53f97b9df3ba64a1"},{url:"/bebidasDefault/yaku.jpg",revision:"0783215ea28678f936aa61dc70782ac4"},{url:"/favicon-16x16.png",revision:"84118460cdafbffac8a6618f41141719"},{url:"/favicon-32x32.png",revision:"ad3781270428e9787c16eff096981869"},{url:"/favicon.ico",revision:"13003dcd6291e1175913a5022d01d5fa"},{url:"/icon-192x192.png",revision:"4ca607677ab68c808c70379d77def1fc"},{url:"/icon-256x256.png",revision:"c1f438e3aeb5358f767c6599f6da6a13"},{url:"/icon-384x384.png",revision:"42cf5317cc0f1e61312cf14b39f98c8f"},{url:"/icon-512x512.png",revision:"bd042a7d156a70e20de40a5ee8daf9f4"},{url:"/manifest.json",revision:"fae0380074dafc50bf402b8bb1fb627e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/uiDefault/productosComanda.png",revision:"efccd87dcb34c7f7c6e2a8531a7a184e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
