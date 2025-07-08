"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ReloadScript() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Remove any existing script with the same source
    const existingScript = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778"]`
    );
    if (existingScript) {
      existingScript.remove();
    }
    // Create a new script element and append it to the head
    const newScript = document.createElement("script");
    newScript.async = true; // Ensure async loading
    newScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778";
    newScript.crossOrigin = "anonymous";
    document.head.appendChild(newScript);
  }, [router]); // Re-run the effect when the route changes
  console.log("Script reloaded successfully");
}

/*export default function AdsLoad() {
  /*const scriptSrc =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778"; // Replace with your actual script URL
  ReloadScript(scriptSrc);*/
