import { useEffect } from "react";

export default function AdBanner({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      className="adsbygoogle block my-6 text-center"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXX"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
