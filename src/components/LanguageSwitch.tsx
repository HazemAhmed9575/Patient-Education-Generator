"use client";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitch({ locale }: { locale: "en" | "ar" }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: "en" | "ar") {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) {
      router.push(`/${next}`);
      return;
    }
    parts[0] = next;
    router.push("/" + parts.join("/"));
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchTo("en")}
        className={`px-3 py-1 rounded-md border ${locale === "en" ? "bg-black text-white" : ""}`}
      >
        EN
      </button>
      <button
        onClick={() => switchTo("ar")}
        className={`px-3 py-1 rounded-md border ${locale === "ar" ? "bg-black text-white" : ""}`}
      >
        AR
      </button>
    </div>
  );
}
