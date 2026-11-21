import Script from "next/script";
import { GA_ID } from "./site";

/* GA4 via gtag; renders nothing until GA_ID is set. Anonymised IP is default in GA4.
   The second script tags the clicks that matter for PR as GA events (no personal data is sent):
     contact_email      mailto: links (incl. the speaking CTA)
     speaking_cta       any link to /speaking
     social_click       LinkedIn / Instagram / Facebook / X (param: network)
     medmate_click      outbound links to medmatepharmacy.com
     press_kit_download links with a download attribute (param: file)
     outbound_click     any other external link (param: domain)
     page_not_found     the custom 404 page
   Mark the first four as key events in GA4 Admin → Key events. */
const CLICKS = String.raw`document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a||typeof gtag!=='function')return;var h=a.getAttribute('href')||'';var t=(a.textContent||'').trim().slice(0,60);var p={link_text:t,page_path:location.pathname};if(h.indexOf('mailto:')===0){gtag('event','contact_email',p);return;}if(a.hasAttribute('download')){p.file=a.getAttribute('download');gtag('event','press_kit_download',p);return;}if(/^\/speaking(\/|$|[#?])/.test(h)){gtag('event','speaking_cta',p);return;}var u;try{u=new URL(h,location.href);}catch(x){return;}if(u.host===location.host)return;var d=u.host.replace(/^www\./,'');p.domain=d;p.link_url=u.href;var n=/linkedin\.com$/.test(d)?'linkedin':/instagram\.com$/.test(d)?'instagram':/facebook\.com$/.test(d)?'facebook':/(^|\.)(x|twitter)\.com$/.test(d)?'x':'';if(n){p.network=n;gtag('event','social_click',p);return;}if(/medmatepharmacy\.com$/.test(d)){gtag('event','medmate_click',p);return;}gtag('event','outbound_click',p);},true);if(document.querySelector('meta[name="rp-404"]')&&typeof gtag==='function'){gtag('event','page_not_found',{page_path:location.pathname});}`;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}</Script>
      <Script id="ga4-clicks" strategy="afterInteractive">{CLICKS}</Script>
    </>
  );
}
