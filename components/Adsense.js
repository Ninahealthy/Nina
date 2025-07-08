/*"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Adsense() {
  const router = useRouter();

  useEffect(() => {
    // Load the script when the page mounts
    let script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Load the script when the route changes
    const handleRouteChange = () => {
      // Load the same script
      script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };
  }, []);

  return (
    <>
      <head>
        <script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778"
          crossOrigin="anonymous"
        ></script>
      </head>
    </>
  );
}*/
